import { Toasty } from './../../toasty';
import { LecturerService } from './../../../services/lecturer.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { SaveLecturer } from '../../../models/lecturer';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FacultyService } from '../../../services/faculty.service';

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
  private dialogRef: NbDialogRef<any>;
  dialogHeaderTitle: string;
  lecturerToBeDeleted: number;

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
    email: '',
    // facultyId: 0
  };

  faculties: any;
  facultySettings: IDropdownSettings = {};
  selectedFaculty: any = [];

  constructor(
    private userService: UserService,
    private lecturerService: LecturerService,
    private facultyService: FacultyService,
    private toastyService: Toasty,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }
    
    this.lecturerService.getAllLecturers()
      .subscribe(lecturers => this.lecturers = lecturers);

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

  private setLecturer(l) {
    this.lecturer.id = l.id;
    this.lecturer.name = l.name;
    this.lecturer.title = l.title;
    this.lecturer.email = l.email;
    // this.lecturer.facultyId = l.facultyId;
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
      this.toastyService.successToasty('Lecturer was successfully saved');
      this.redirectTo('/pages/lecturers');
    },
    err => {
      if (err.status == 409) {
        this.error = err.error;
        this.requiredAlert = false;
        this.existAlert = true;
      }
      else if (err.status == 400) {
        this.requiredAlert = true;
        this.existAlert = false;
      }
    });
  }

  onFacultySelect(item: any) {
    // this.lecturer.facultyId = item.id;
  }

  onFacultyDeSelect(item: any) {
    // this.lecturer.facultyId = 0;
  }

  onClose() {
    this.existAlert = false;
    this.requiredAlert = false;
    this.detailsAlert = false;
  }

  deleteLecturer(id, dialog: TemplateRef<any>) {
    this.lecturerToBeDeleted = id;
    this.dialogHeaderTitle = "Deleting lecturer"
    this.dialogRef = this.dialogService.open(dialog, { context: 'Are you sure you want delete lecturer?' });
  }

  onConfirmDelete() {
    this.lecturerService.delete(this.lecturerToBeDeleted)
        .subscribe(() => {
          this.closeDialog();
          this.toastyService.defaultToasty('Lecturer was successfully deleted');
          this.redirectTo('/pages/lecturers');
        });
  }

  closeDialog(): void {
    if (this.dialogRef) this.dialogRef.close();
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
