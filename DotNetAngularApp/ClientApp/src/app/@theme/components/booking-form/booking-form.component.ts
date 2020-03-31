import * as _ from 'underscore';
import { BookingService } from '../../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';
import { SaveBooking, Booking } from '../../../models/booking';

@Component({
  selector: 'ngx-booking-form',
  templateUrl: './booking-form.component.html',
})
export class BookingFormComponent implements OnInit {
  buildings: any;
  rooms: any;
  timeSlots: any;
  booking: SaveBooking = { // booking object
    id: 0, // set to default value
    roomId: 0,
    buildingId: 0,
    bookDate: '',
    contact: {
      name: '',
      email: '',
      phone: '',
    },
    purpose: '',
    timeSlots: [],
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
    var sources = [ // data sources
      this.bookingService.getBuildings(), // get the buildings from server
      this.bookingService.getTimeSlots(),
    ];

    if (this.booking.id) // if not 0, push a new observable into sources array
      sources.push(this.bookingService.getBooking(this.booking.id));// get the booking with the given id)

    // for getting Bookings, this is from server, a complete representation of Bookings
    Observable.forkJoin(sources).subscribe(data => { // an array which includes all results from observable
      this.buildings = data[0];
      this.timeSlots = data[1];

      if (this.booking.id) {
        this.setBooking(data[2]);
        this.populateRooms(); // room is populated on the building of this booking
      }
    }, err => { // i think this error is already implemented
      if (err.status == 404)
        this.router.navigate(['/']);
    });
  }

  private setBooking(b) { // b: Booking, no need?
    this.booking.id = b.id;
    this.booking.buildingId = b.building.id;
    this.booking.roomId = b.room.id;
    this.booking.bookDate = b.bookDate;
    this.booking.contact = b.contact;
    this.booking.purpose = b.purpose;
    this.booking.timeSlots = _.pluck(b.timeSlots, 'id');
  }

  onTimeSlotToggle(timeSlotId, $event) {
    if ($event.target.checked) // if this check box is checked, push this Id into TimeSlots array
      this.booking.timeSlots.push(timeSlotId);
    else {
      var index = this.booking.timeSlots.indexOf(timeSlotId);
      this.booking.timeSlots.splice(index, 1);
    }
  }

  onBuildingChange() { // when the option is selected
    this.populateRooms();

    delete this.booking.roomId;
  }

  private populateRooms() { // private because it is an implementation detail, don't want to expose it out
    var selectedBuilding = this.buildings.find(b => b.id == this.booking.buildingId); // get the selected building from db
    this.rooms = selectedBuilding ? selectedBuilding.rooms : []; // get the rooms as well?
  }

  submit() {
    if (this.booking.id) {
      this.bookingService.update(this.booking)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success',
            msg: 'The booking was successfully updated.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        });
    }
    else {
      this.bookingService.create(this.booking) // this booking is not sent to the server unless we subscribe to the observable
      .subscribe(x => console.log(x));
    }
  }

  delete() {
    if (confirm("Are you sure you want to delete this booking?")) {
      this.bookingService.delete(this.booking.id)
        .subscribe(x => { // navigate the user back to the list of bookings
          this.router.navigate(['/']);
        });
    }
  }
}
