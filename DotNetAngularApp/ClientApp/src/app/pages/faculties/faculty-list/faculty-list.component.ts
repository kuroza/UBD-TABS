import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../../../services/faculty.service';
import { UserService } from '../../../services/user.service';
import { MajorService } from '../../../services/major.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveMajor } from '../../../models/major';
import { SaveFaculty } from '../../../models/faculty';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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
  facultySettings: IDropdownSettings = {};
  selectedFaculty: any = [];
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
  error: string;
  existMajorAlert: boolean = false;
  existFacultyAlert: boolean = false;
  requiredAlert: boolean = false;
  detailsAlert: boolean = true;

  constructor(
    private facultyService: FacultyService,
    private userService: UserService,
    private majorService: MajorService,
    private toasty: ToastyService,
    private route: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.hasAccess = this.userService.hasAccess();

    this.facultyService.getAllFaculties()
      .subscribe(faculties => this.faculties = faculties);

    this.facultySettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }

  deleteMajor(id) {
    if (confirm("Are you sure?")) {
      this.majorService.delete(id)
        .subscribe(() => {
          this.warningToasty('Major was successfully deleted');
          this.redirectTo('/pages/faculties');
        });
    }
  }

  deleteFaculty(id) {
    if (confirm("Are you sure?")) {
      this.facultyService.delete(id)
        .subscribe(() => {
          this.warningToasty('Faculty was successfully deleted');
          this.redirectTo('/pages/faculties');
        });
    }
  }

  private warningToasty(message: string) {
    this.toasty.warning({
      title: 'Success',
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  private setMajor(m) {
    this.major.id = m.id;
    this.major.name = m.name;
    this.major.facultyId = m.facultyId;
    this.selectedFaculty = [];
    this.selectedFaculty.push(this.faculties.find(faculty => faculty.id == m.facultyId));
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
      this.successToasty('Major was successfully saved');
      this.redirectTo('/pages/faculties');
    },
    err => {
      if (err.status == 409) {
        this.requiredAlert = false;
        this.error = err.error;
        this.existMajorAlert = true;
      }
      else if (err.status == 400) {
        this.existMajorAlert = false;
        this.requiredAlert = true;
      }
    });
    
    this.onClose();
  }

  onFacultySelect(item: any) {
    this.major.facultyId = item.id;
  }

  onFacultyDeSelect(item: any) {
    this.major.facultyId = 0;
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
      this.successToasty('Faculty was successfully saved');
      this.redirectTo('/pages/faculties');
    },
    err => {
      if (err.status == 409) {
        this.requiredAlert = false;
        console.log(err.error);
        this.error = err.error;
        this.existFacultyAlert = true;
      }
      else if (err.status == 400) {
        this.existFacultyAlert = false;
        this.requiredAlert = true;
      }
    });

    this.onClose();
  }

  private successToasty(message: string) {
    this.toasty.success({
      title: 'Success',
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  onClickBack() {
    this.major.id = 0;
    this.major.name = '';
    this.major.facultyId = 0;
    this.selectedFaculty = [];

    this.faculty.id = 0;
    this.faculty.name = '';
    this.faculty.shortName = '';
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
}