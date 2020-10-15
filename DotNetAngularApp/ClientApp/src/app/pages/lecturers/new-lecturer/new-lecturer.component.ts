import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { SaveLecturer } from '../../../models/lecturer';
import { LecturerService } from '../../../services/lecturer.service';

@Component({
  selector: 'new-lecturer',
  templateUrl: './new-lecturer.component.html',
})
export class NewLecturerComponent implements OnInit {
  // lecturers: any;
  lecturer: SaveLecturer = {
    id: 0,
    name: '',
    title: '',
  };
  
  constructor(
    private lecturerService: LecturerService,
    private toastyService: ToastyService,
    private router: Router,
    ) { }

  ngOnInit() {
    // this.lecturerService.getAllLecturers()
    //   .subscribe(lecturers => this.lecturers = lecturers);
  }

  submit() {
    var result$ = this.lecturerService.create(this.lecturer);

    result$.subscribe(() => { // b
      this.toastyService.success({
        title: 'Success', 
        msg: 'Lecturer was sucessfully added.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.router.navigate(['/pages/lecturers/', this.lecturer.id]);
    });
  }
}
