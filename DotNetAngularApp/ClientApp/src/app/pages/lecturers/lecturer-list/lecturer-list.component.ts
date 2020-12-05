import { LecturerService } from './../../../services/lecturer.service';
import { Component, OnInit } from '@angular/core';
import { SaveLecturer } from '../../../models/lecturer';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'lecturer-list',
  templateUrl: './lecturer-list.component.html',
  styles: [`
  .table tr {
    cursor: pointer;
  }
  `]
})
export class LecturerListComponent implements OnInit {
  hasAccess = false;
  setActiveAddLecturer: boolean;
  setActiveDetails: boolean;
  error: string;
  existAlert: boolean = false;
  requiredAlert: boolean = false;
  detailsAlert: boolean = true;
  
  lecturerDetails: any;
  lecturers: any;
  lecturer: SaveLecturer = {
    id: 0,
    name: '',
    title: '',
    email: ''
  };

  constructor(
    private userService: UserService,
    private lecturerService: LecturerService,
    private toastyService: ToastyService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }
    
    this.lecturerService.getAllLecturers()
      .subscribe(lecturers => this.lecturers = lecturers);
  }

  private setLecturer(l) {
    this.lecturer.id = l.id;
    this.lecturer.name = l.name;
    this.lecturer.title = l.title;
    this.lecturer.email = l.email;
  }

  edit(id) {
    this.lecturerService.getLecturer(id)
    .subscribe(
      l => {
        this.setActiveDetails = false;
        this.setActiveAddLecturer = true;
        this.setLecturer(l);
      });
  }

  submit() {
    var result$ = (this.lecturer.id) ? this.lecturerService.update(this.lecturer) : this.lecturerService.create(this.lecturer); 

    result$.subscribe(() => {
      this.successToasty('Lecturer was successfully saved');
      this.redirectTo('/pages/lecturers');
    },
    err => {
      if (err.status == 409) {
        this.requiredAlert = false;
        this.error = err.error;
        this.existAlert = true;
      }
      else if (err.status == 400) {
        this.existAlert = false;
        this.requiredAlert = true;
      }
    });
  }

  onClose() {
    this.existAlert = false;
    this.requiredAlert = false;
    this.detailsAlert = false;
  }

  delete(id) {
    if (confirm("Are you sure?")) {
      this.lecturerService.delete(id)
        .subscribe(() => {
          this.warningToasty('Lecturer was successfully deleted');
          this.redirectTo('/pages/lecturers');
        });
    }
  }

  private successToasty(message: string) {
    this.toastyService.success({
      title: 'Success',
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  private warningToasty(message: string) {
    this.toastyService.warning({
      title: 'Success',
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  selectLecturer(id) {
    this.lecturerService.getLecturer(id)
    .subscribe(
      l => {
        this.setActiveAddLecturer = false;
        this.setActiveDetails = true;
        this.lecturerDetails = l;
      },
      err => {
        if (err.status == 404) {
          this.redirectTo('/pages/lecturers');
          return; 
        }
      });
  }

  onClickBack() {
    this.lecturer.id = 0;
    this.lecturer.name = '';
    this.lecturer.title = '';
    this.lecturer.email = '';
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
