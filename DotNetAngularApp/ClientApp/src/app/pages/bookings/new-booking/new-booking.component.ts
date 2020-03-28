import { Component, OnInit } from '@angular/core';
import { TimeSlotService } from './../../../services/timeslot.service';

@Component({
  selector: 'new-booking',
  templateUrl: './new-booking.component.html'
})
export class NewBookingComponent implements OnInit {
  timeSlots: any;

  constructor(private timeSlotService: TimeSlotService) { }

  ngOnInit() {
    this.timeSlotService.getTimeSlots()
      .subscribe(timeSlots => this.timeSlots = timeSlots); //the input timeSlots, set it to this timeSlots
  }

}
