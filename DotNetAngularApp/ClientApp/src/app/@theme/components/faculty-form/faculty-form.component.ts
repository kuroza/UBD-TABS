import { FacultyService } from './../../../services/faculty.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'faculty-form',
  templateUrl: './faculty-form.component.html',
  styleUrls: ['./faculty-form.component.css']
})
export class FacultyFormComponent implements OnInit {
  faculties: any;
  courses: any;
  program: any = {};

  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    // this.facultyService.getFaculties().subscribe(faculties =>
    //   this.faculties = faculties);
  }

  // onFacultyChange() {
  //   var selectedFaculty = this.faculties.find(f => f.id == this.program.faculty);
  //   this.courses = selectedFaculty ? selectedFaculty.courses : [];
  // }
}
