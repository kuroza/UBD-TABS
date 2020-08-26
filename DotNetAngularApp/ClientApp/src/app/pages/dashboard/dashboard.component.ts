// import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from './../../services/booking.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  booking: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private bookingService: BookingService,
    ) {}

  receiveBookingId($event) {
    this.bookingService.getBooking($event)
      .subscribe(b => this.booking = b);
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.bookingService.delete(this.booking.id)
        .subscribe(x => {
          this.router.navigate(['/pages/bookings']);
        });
    }
  }
}
