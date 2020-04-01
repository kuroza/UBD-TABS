import { BookingService } from './../../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/booking';

@Component({
  selector: 'ngx-booking-list',
  templateUrl: './booking-list.html'
})
export class BookingListComponent implements OnInit {
  bookings: any; // Booking[]
  
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getBookings()
      .subscribe(bookings => this.bookings = bookings);
  }
}
