import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'new-booking',
  templateUrl: './new-booking.component.html'
})
export class NewBookingComponent implements OnInit {
  timeSlots: any;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getTimeSlots()
      .subscribe(timeSlots => this.timeSlots = timeSlots); //the input timeSlots, set it to this timeSlots
  }
}
