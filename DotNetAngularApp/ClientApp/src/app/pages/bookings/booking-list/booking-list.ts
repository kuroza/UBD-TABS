import { BookingService } from './../../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../../services/building.service';
import { UserService } from '../../../services/user.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'ngx-booking-list',
  templateUrl: './booking-list.html',
  styles: [`
  .table tr {
    cursor: pointer;
  }
  `]
})
export class BookingListComponent implements OnInit {
  private readonly PAGE_SIZE = 8;

  queryResult: any = {}; // or 'bookings: Booking[];'
  buildings: any; // or 'buildings: KeyValuePair[];'
  query: any = {
    pageSize: this.PAGE_SIZE // initialize page size
  };
  columns = [ // display on table head on each column
    // { title: 'Id' },
    { title: 'Building', key: 'building', isSortable: true },
    { title: 'Room', key: 'room', isSortable: true },
    { title: 'Date', key: 'bookDate', isSortable: false },
    // { }
  ];

  booking: any; // store all the booking details here
  bookingId: number; // store bookingId from route
  hasAccess = false;
  detailsAlert: boolean = true;
  
  constructor(
    private bookingService: BookingService,
    private buildingService: BuildingService,
    private userService: UserService,
    private toasty: ToastyService,
    private route: ActivatedRoute, 
    private router: Router,
    ) { }

  ngOnInit() { // when the page starts
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }
    
    this.buildingService.getAllBuildings() // get the buildings from service for filter drop down
      .subscribe(buildings => this.buildings = buildings); // and store in this.buildings

    this.populateBookings(); // initially, get the unfiltered bookings to show in table
  }

  private populateBookings() {
    this.bookingService.getBookings(this.query) // get filtered bookings using queries
      .subscribe(result => this.queryResult = result); // saves filtered booking list to queryResult
  }

  onFilterChange() { // filtering
    this.query.page = 1; // reset, go back to page 1?
    this.populateBookings(); // no need to input parameter, just use 'this'
  }

  resetFilter() { // filtering
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateBookings();
  }

  sortBy(columnName) { // sorting
    if (this.query.sortBy === columnName) { // initially table is sort by Id
      this.query.isSortAscending = !this.query.isSortAscending; // toggle sort ascending and descending
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateBookings();
  }

  onPageChange(page) { // pagination
    this.query.page = page;
    this.populateBookings();
  }

  delete(id) {
    // todo: use a popup
    if (confirm("Are you sure?")) {
      this.bookingService.delete(id)
        .subscribe(() => {
          this.toasty.success({
            title: 'Success', 
            msg: 'Booking was sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 3000
          });
          this.redirectTo('/pages/bookings');
        });
    }
  }

  selectBooking(id) {
    this.bookingService.getBooking(id)
    .subscribe(
      b => {
        this.booking = b;
      },
      err => {
        if (err.status == 404) {
          this.redirectTo('/pages/bookings');
          return; 
        }
      });
  }

  // private setBooking(b) {
  //   this.booking.id = b.id;
  //   this.booking.buildingId = b.building.id;
  //   this.booking.roomId = b.room.id;
  //   this.booking.semesterId = b.semester.id;
  //   this.booking.bookDate = b.bookDate;
  //   this.booking.timeSlots = _.pluck(b.timeSlots, 'id');
  //   this.booking.modules = _.pluck(b.modules, 'id');
  // }

  edit(id) {
    // this.bookingService.getBooking(id)
    // .subscribe(
    //   m => {
    //     this.setBooking(m);
    //     this.router.navigate(['/pages/bookings/edit', this.booking.id])
    //   });

    this.redirectTo('/pages/bookings/edit/' + id);
  }

  onClose() {
    this.detailsAlert = false;
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
