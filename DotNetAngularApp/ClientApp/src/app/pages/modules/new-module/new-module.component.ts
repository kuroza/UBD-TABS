import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { SaveModule } from '../../../models/module';
import { BookingService } from '../../../services/booking.service';
import { LecturerService } from '../../../services/lecturer.service';
import { ModuleService } from '../../../services/module.service';

@Component({
  selector: 'new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.scss']
})
export class NewModuleComponent implements OnInit {
  lecturers: any;
  module: SaveModule = {
    id: 0,
    name: '',
    code: '',
    lecturers: [],
  };
  
  constructor(
    private bookingService: BookingService,
    private moduleService: ModuleService,
    private lecturerService: LecturerService,
    private toastyService: ToastyService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.lecturerService.getAllLecturers()
      .subscribe(lecturers => this.lecturers = lecturers);
  }

  submit() {
    var result$ = this.moduleService.create(this.module);

    result$.subscribe(b => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'Module was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.router.navigate(['/pages/modules/', this.module.id]);
    });
  }
}
