import { AuthService } from './../../../services/auth.service';
import { BookingService } from './../../../services/booking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-booking-list',
  templateUrl: './booking-list.html'
})
export class BookingListComponent implements OnInit {
  private readonly PAGE_SIZE = 8;

  queryResult: any = {}; // bookings: Booking[];
  buildings: any; // buildings: KeyValuePair[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Building', key: 'building', isSortable: true },
    { title: 'Room', key: 'room', isSortable: true },
    { title: 'Date', key: 'bookDate', isSortable: true },
    { title: 'Name', key: 'contactName', isSortable: true },
    { }
  ];
  
  constructor(private bookingService: BookingService, public auth: AuthService) { }

  ngOnInit() {
    this.bookingService.getBuildings()
      .subscribe(buildings => this.buildings = buildings);

    this.populateBookings();
  }

  private populateBookings() {
    this.bookingService.getBookings(this.query)
      .subscribe(result => this.queryResult = result);
  }

  onFilterChange() {
    this.query.page = 1;
    this.populateBookings();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateBookings();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateBookings();
  }

  onPageChange(page) {
    this.query.page = page;
    this.populateBookings();
  }
}
