
import { BookingService } from '../../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-booking-form',
  templateUrl: './booking-form.component.html',
})
export class BookingFormComponent implements OnInit {
  buildings: any;
  rooms: any;
  timeSlots: any;
  booking: any = { // booking object
    bookDate: '',
    timeSlots: [], // change to empty array []
    contact: {},
  };

  constructor(
    private route: ActivatedRoute, // to read route parameters
    private router: Router, // to navigate user to different page if they pass an invalid id
    private bookingService: BookingService,
    private toastyService: ToastyService) {

      route.params.subscribe(p => {
        this.booking.id = +p['id']; // put a + to convert into a number
      });
    }

  ngOnInit() {
    this.bookingService.getBooking(this.booking.id) // get the booking with the given id
      .subscribe(b => {
        this.booking = b; // this is more like for editing booking
      }
      // , err => { // i think this error is already implemented
      //   if (err.status == 404)
      //     this.router.navigate(['/']);
      // }
      );

    this.bookingService.getBuildings() // get the buildings from server
      .subscribe(buildings => this.buildings = buildings); // use that to initialize this buildings field

    this.bookingService.getTimeSlots()
      .subscribe(timeSlots => this.timeSlots = timeSlots);
  }

  onBuildingChange() { // when the option is selected
    var selectedBuilding = this.buildings.find(b => b.id == this.booking.buildingId); // get the selected building from db
    this.rooms = selectedBuilding ? selectedBuilding.rooms : []; // get the rooms as well?
    delete this.booking.roomId;
  }

  submit() {
    this.bookingService.create(this.booking) // this booking is not sent to the server unless we subscribe to the observable
      .subscribe(x => console.log(x));
  }
}
