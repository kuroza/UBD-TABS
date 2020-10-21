import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Lecturer } from '../../../models/lecturer';
import { LecturerService } from '../../../services/lecturer.service';
import { ModuleService } from '../../../services/module.service';

@Component({
  selector: 'view-lecturer',
  templateUrl: './view-lecturer.component.html',
})
export class ViewLecturerComponent implements OnInit {
  lecturer: any;
  lecturerId: number;
  lecturerModules: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toastyService: ToastyService,
    private lecturerService: LecturerService,
    private moduleService: ModuleService
    ) {

    route.params.subscribe(p => {
      this.lecturerId = +p['id'];
      if (isNaN(this.lecturerId) || this.lecturerId <= 0) {
        router.navigate(['/pages/lecturers']);
        return; 
      }
    });
  }

  async ngOnInit() { 
    this.lecturerService.getLecturer(this.lecturerId)
      .subscribe(
        l => this.lecturer = l,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/pages/lecturers']);
            return; 
          }
        });

    this.lecturerModules = await this.moduleService.getAllModules()

    console.log(this.lecturerModules);
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.lecturerService.delete(this.lecturer.id)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success', 
            msg: 'Lecturer was sucessfully removed.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
          this.router.navigate(['/pages/lecturers']);
        });
    }
  }
}