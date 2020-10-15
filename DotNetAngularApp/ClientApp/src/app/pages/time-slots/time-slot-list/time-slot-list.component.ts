import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TimeSlotService } from '../../../services/timeSlot.service';

@Component({
  selector: 'ngx-view-time-slots',
  templateUrl: './time-slot-list.component.html',
})
export class TimeSlotListComponent implements OnInit {

  timeSlots: any;

  constructor(
    private timeSlotService: TimeSlotService,
  ) { }

  ngOnInit() {
    this.timeSlotService.getAllTimeSlots()
      .subscribe(timeSlots => this.timeSlots = timeSlots);
  }
}
