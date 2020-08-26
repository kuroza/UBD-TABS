// import { AuthService } from './../../../services/auth.service';
import { BookingService } from './../../../services/booking.service';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ngx-booking-details',
    templateUrl: 'booking-details.component.html'
})
export class BookingDetailsComponent implements OnInit {
  booking: any; // store all the booking details here
  bookingId: number; // store bookingId from route

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toastyService: ToastyService,
    private bookingService: BookingService) {

    route.params.subscribe(p => {
      this.bookingId = +p['id']; // get the Id from the route 
      if (isNaN(this.bookingId) || this.bookingId <= 0) { // if bookingId is not a number or less than 1, navigate back
        router.navigate(['/pages/bookings']);
        return; 
      }
    });
  }

  ngOnInit() { 
    this.bookingService.getBooking(this.bookingId)
      .subscribe(
        b => this.booking = b, // store the booking details from db to this.booking
        err => {
          if (err.status == 404) { // else data not found? then navigate back
            this.router.navigate(['/pages/bookings']);
            return; 
          }
        });
  }

  delete() {
    // todo: use a popup
    if (confirm("Are you sure?")) { // if confirm() == true
      this.bookingService.delete(this.booking.id) // delete in db
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success', 
            msg: 'Booking was sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
          this.router.navigate(['/pages/bookings']);
        });
    }
  }
}