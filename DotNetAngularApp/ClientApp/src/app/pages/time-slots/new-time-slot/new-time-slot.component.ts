import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { SaveTimeSlot } from '../../../models/timeSlot';
import { TimeSlotService } from '../../../services/timeSlot.service';

@Component({
  selector: 'ngx-new-time-slot',
  templateUrl: './new-time-slot.component.html',
})
export class NewTimeSlotComponent implements OnInit {
  timeSlots: any;
  timeSlot: SaveTimeSlot = {
    id: 0,
    startTime: '',
    endTime: ''
  };

  time = {
    hour: null,
    minute: null
  };
  
  constructor(
    private timeSlotService: TimeSlotService,
    private toastyService: ToastyService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.timeSlotService.getAllTimeSlots()
      .subscribe(timeSlots => this.timeSlots = timeSlots);
  }

  submit() {
    var result$ = this.timeSlotService.create(this.timeSlot);

    result$.subscribe(() => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'Time slot was sucessfully added.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.router.navigate(['/pages/timeSlots/', this.timeSlot.id]);
    });
  }
}
