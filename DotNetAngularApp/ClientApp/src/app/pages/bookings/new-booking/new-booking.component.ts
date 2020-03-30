import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'ngx-new-booking',
  templateUrl: './new-booking.component.html'
})
export class NewBookingComponent implements OnInit {
  timeSlots: any;
  booking: any = {
    timeSlots: []
  };

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getTimeSlots()
      .subscribe(timeSlots => this.timeSlots = timeSlots); //the input timeSlots, set it to this timeSlots
  }

  onTimeSlotToggle(timeSlotId, $event) {
    if ($event.target.checked) // if this check box is checked, push this Id into TimeSlots array
      this.booking.timeSlots.push(timeSlotId);
    else {
      var index = this.booking.timeSlots.indexOf(timeSlotId);
      this.booking.timeSlots.splice(index, 1);
    }
  }
}
