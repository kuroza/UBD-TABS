import { BookingService } from './../../../services/booking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-booking-list',
  templateUrl: './booking-list.html'
})
export class BookingListComponent implements OnInit {
  bookings: any; // Booking[]
  buildings: any; // KeyValuePair[]
  filter: any = {};
  
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getBuildings()
      .subscribe(buildings => this.buildings = buildings);

    this.populateBookings();
  }

  private populateBookings() {
    this.bookingService.getBookings(this.filter)
      .subscribe(bookings => this.bookings = bookings);
  }

  onFilterChange() {
    this.populateBookings();
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }
}
