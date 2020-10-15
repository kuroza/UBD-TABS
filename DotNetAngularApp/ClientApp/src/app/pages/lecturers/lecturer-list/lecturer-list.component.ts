import { LecturerService } from './../../../services/lecturer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lecturer-list',
  templateUrl: './lecturer-list.component.html',
})
export class LecturerListComponent implements OnInit {

  lecturers: any;

  constructor(private lecturerService: LecturerService) { }

  ngOnInit() {
    this.lecturerService.getAllLecturers()
      .subscribe(lecturers => this.lecturers = lecturers);
  }
}
