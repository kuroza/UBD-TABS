import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';
import { SaveLecturer } from '../../../models/lecturer';
import { LecturerService } from '../../../services/lecturer.service';

@Component({
  selector: 'new-lecturer',
  templateUrl: './new-lecturer.component.html',
})
export class NewLecturerComponent implements OnInit {
  lecturer: SaveLecturer = {
    id: 0,
    name: '',
    title: '',
  };
  
  constructor(
    private lecturerService: LecturerService,
    private toastyService: ToastyService,
    private router: Router,
    private route: ActivatedRoute) {

      route.params.subscribe(p => {
        this.lecturer.id = +p['id'] || 0;
      });
    }

  ngOnInit() {    
    var sources = [];

    if (this.lecturer.id)
      sources.push(this.lecturerService.getLecturer(this.lecturer.id));
    
    Observable.forkJoin(sources).subscribe(data => {
      if (this.lecturer.id) {
        this.setLecturer(data[0]);
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/']);
    });
  }

  private setLecturer(l) {
    this.lecturer.id = l.id;
    this.lecturer.name = l.name;
    this.lecturer.title = l.title;
  }

  submit() {
    var result$ = (this.lecturer.id) ? this.lecturerService.update(this.lecturer) : this.lecturerService.create(this.lecturer); 

    result$.subscribe(() => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'Lecturer was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.router.navigate(['/pages/lecturers/', this.lecturer.id]);
    });
  }
}
