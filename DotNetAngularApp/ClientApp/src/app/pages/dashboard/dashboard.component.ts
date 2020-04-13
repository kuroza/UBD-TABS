import { AuthService } from './../../services/auth.service';
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
    public auth: AuthService, // ? private?
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private bookingService: BookingService,
    ) {}

  onEventClicked($event) {
    this.bookingService.getBooking($event)
      .subscribe(b => this.booking = b);
  }

  delete() {
    if (confirm("Are you sure?")) { // if confirm() == true
      this.bookingService.delete(this.booking.id) // delete in db
        .subscribe(x => {
          this.router.navigate(['/pages/bookings']);
        });
    }
  }
}
