import { AuthService } from '../../../services/auth.service';
import { BookingService } from '../../../services/booking.service';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ngx-room-details',
    templateUrl: 'room-details.component.html'
})
export class RoomDetailsComponent implements OnInit {
  booking: any; // store all the booking details here
  bookingId: number; // store bookingId from route

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toasty: ToastyService,
    private bookingService: BookingService,
    public auth: AuthService) { // ? public?

    // * retrieve the id from route
    route.params.subscribe(p => {
      this.bookingId = +p['id']; // get the Id from the route 
      if (isNaN(this.bookingId) || this.bookingId <= 0) { // if bookingId is not a number or less than 1, navigate back
        router.navigate(['/pages/bookings']); // ? '/pages//bookings' why were there 2 slashes?
        return; 
      }
    });
  }

  ngOnInit() { 
    // todo: Add getBuilding(id) in service
    // * get the building of id==id from server
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
    if (confirm("Are you sure?")) { // if confirm() == true
      this.bookingService.delete(this.booking.id) // delete in db
        .subscribe(x => {
          this.router.navigate(['/pages/bookings']);
        });
    }
  }
}