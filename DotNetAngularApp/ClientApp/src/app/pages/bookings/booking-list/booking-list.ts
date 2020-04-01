import { BookingService } from './../../../services/booking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-booking-list',
  templateUrl: './booking-list.html'
})
export class BookingListComponent implements OnInit {
  bookings: any; // Booking[]
  allBookings: any;
  buildings: any; // KeyValuePair[]
  filter: any = {};
  
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getBuildings()
      .subscribe(buildings => this.buildings = buildings);

    this.bookingService.getBookings()
      .subscribe(bookings => this.bookings = this.allBookings = bookings);
  }

  onFilterChange() {
    var bookings = this.allBookings;

    if (this.filter.buildingId)
      bookings = bookings.filter(b => b.building.id == this.filter.buildingId);

    if (this.filter.roomId)
      bookings = bookings.filter(b => b.room.id == this.filter.roomId);

    this.bookings = bookings;
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }
}
