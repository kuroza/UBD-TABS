import { BookingService } from './../../../services/booking.service';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ngx-booking-details',
    templateUrl: 'booking-details.component.html'
})
export class BookingDetailsComponent implements OnInit {
  booking: any;
  bookingId: number; 

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private bookingService: BookingService) { 

    route.params.subscribe(p => {
      this.bookingId = +p['id'];
      if (isNaN(this.bookingId) || this.bookingId <= 0) {
        router.navigate(['/pages//bookings']);
        return; 
      }
    });
  }

  ngOnInit() { 
    this.bookingService.getBooking(this.bookingId)
      .subscribe(
        b => this.booking = b,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/pages/bookings']);
            return; 
          }
        });
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