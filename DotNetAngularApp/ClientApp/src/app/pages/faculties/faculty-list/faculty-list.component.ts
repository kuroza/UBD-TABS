import { ToastyService } from 'ng2-toasty';
import { BookingService } from '../../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../../../services/faculty.service';
import { UserService } from '../../../services/user.service';
import { MajorService } from '../../../services/major.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveMajor } from '../../../models/major';
import { SaveFaculty } from '../../../models/faculty';

@Component({
  selector: 'ngx-faculty-list',
  templateUrl: './faculty-list.component.html'
})
export class FacultyListComponent implements OnInit {
  facultyDetails: any;
  faculty: SaveFaculty = {
    id: 0,
    name: '',
    shortName: '',
  };
  faculties: any;
  majorDetails: any;
  majorId: number;
  major: SaveMajor = {
    id: 0,
    name: '',
    facultyId: 0,
  };

  hasAccess = false;
  setActiveAddMajor: boolean;
  setActiveAddFaculty: boolean;
  setActiveDetails: boolean;
  existMajorAlert: boolean = false;
  existFacultyAlert: boolean = false;
  requiredAlert: boolean = false;
  detailsAlert: boolean = true;

  constructor(
    private bookingService: BookingService,
    private facultyService: FacultyService,
    private userService: UserService,
    private majorService: MajorService,
    private toasty: ToastyService,
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }

    this.facultyService.getAllFaculties()
      .subscribe(faculties => this.faculties = faculties);
  }

  deleteMajor(id) {
    if (confirm("Are you sure?")) {
      this.majorService.delete(id)
        .subscribe(() => {
          this.toasty.success({
            title: 'Success', 
            msg: 'Major was sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 3000
          });
          this.redirectTo('/pages/faculties');
        });
    }
  }

  deleteFaculty(id) {
    if (confirm("Are you sure?")) {
      this.facultyService.delete(id)
        .subscribe(() => {
          this.toasty.success({
            title: 'Success', 
            msg: 'Faculty was sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 3000
          });
          this.redirectTo('/pages/faculties');
        });
    }
  }

  private setMajor(m) {
    this.major.id = m.id;
    this.major.name = m.name;
    this.major.facultyId = m.facultyId;
  }

  private setFaculty(f) {
    this.faculty.id = f.id;
    this.faculty.name = f.name;
    this.faculty.shortName = f.shortName;
  }

  editMajor(id) {
    this.majorService.getMajor(id)
    .subscribe(
      r => {
        this.setActiveDetails = false;
        this.setActiveAddFaculty = false;
        this.setActiveAddMajor = true;
        this.setMajor(r);
      });
  }

  editFaculty(id) {
    this.facultyService.getFaculty(id)
    .subscribe(
      f => {
        this.setActiveDetails = false;
        this.setActiveAddMajor = false;
        this.setActiveAddFaculty = true;
        this.setFaculty(f);
      });
  }

  selectMajor(id) {
    this.majorService.getMajor(id)
    .subscribe(
      m => {
        this.setActiveAddMajor = false;
        this.setActiveAddFaculty = false;
        this.setActiveDetails = true;
        this.majorDetails = m;
      },
      err => {
        if (err.status == 404) {
          this.redirectTo('/pages/faculties');
          return; 
        }
      });
  }

  selectFaculty(id) {
    this.facultyService.getFaculty(id)
    .subscribe(
      b => {
        this.setActiveAddMajor = false;
        this.setActiveAddFaculty = false;
        this.setActiveDetails = true;
        this.facultyDetails = b;
      },
      err => {
        if (err.status == 404) {
          this.redirectTo('/pages/faculties');
          return; 
        }
      });
  }

  submitMajor() {
    var result$ = (this.major.id) ? this.majorService.update(this.major) : this.majorService.create(this.major); 

    result$.subscribe(() => {
      this.toasty.success({
        title: 'Success', 
        msg: 'Major was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 3000
      });
      this.redirectTo('/pages/faculties');
    },
    err => {
      if (err.status == 409) {
        this.existMajorAlert = true;
      }
      else if (err.status == 400) {
        this.requiredAlert = true;
      }
    });
    
    this.onClose();
  }

  onClose() {
    this.existMajorAlert = false;
    this.existFacultyAlert = false;
    this.requiredAlert = false;
    this.detailsAlert = false;
  }

  submitFaculty() {
    var result$ = (this.faculty.id) ? this.facultyService.update(this.faculty) : this.facultyService.create(this.faculty);

    result$.subscribe(() => {
      this.toasty.success({
        title: 'Success', 
        msg: 'Faculty was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 3000
      });
      this.redirectTo('/pages/faculties');
    },
    err => {
      if (err.status == 409) {
        this.existFacultyAlert = true;
      }
      else if (err.status == 400) {
        this.requiredAlert = true;
      }
    });

    this.onClose();
  }

  onClickBack() {
    this.major.id = 0;
    this.major.name = '';
    this.major.facultyId = 0;

    this.faculty.id = 0;
    this.faculty.name = '';
    this.faculty.shortName = '';
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
}