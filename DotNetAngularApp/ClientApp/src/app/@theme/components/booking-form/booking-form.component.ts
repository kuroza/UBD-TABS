import * as _ from 'underscore';
import { BookingService } from '../../../services/booking.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';
import { SaveBooking, Booking } from '../../../models/booking';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';

@Injectable() // ng material datepicker
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month : parseInt(date[0], 10),
        day : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year : null;
  }
}

@Injectable() // ng material datepicker
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        month : parseInt(date[0], 10),
        day : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.month + this.DELIMITER + date.day + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'ngx-booking-form',
  templateUrl: './booking-form.component.html',
})
export class BookingFormComponent implements OnInit {
  datePicker: string;
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
        this.booking.id = +p['id'] || 0; // '+' to convert into a number
      });
    }

  ngOnInit() {
    var sources = [ // data sources
      this.bookingService.getBuildings(), // get the buildings from server for drop down
      this.bookingService.getTimeSlots(), // get timeSlots for table
    ];

    // for editing
    if (this.booking.id) // if not 0, push a new observable into sources array
      sources.push(this.bookingService.getBooking(this.booking.id)); // get the booking with the given id // data[2]

    // for getting Bookings, this is from server, a complete representation of Bookings
    Observable.forkJoin(sources).subscribe(data => { // an array which includes all results from observable
      this.buildings = data[0];
      this.timeSlots = data[1];

      if (this.booking.id) { // if 'edit', populate forms
        this.setBooking(data[2]);
        this.populateRooms(); // room is populated on the building of this booking
      }
    }, err => { // i think this error is already implemented
      if (err.status == 404)
        this.router.navigate(['/']);
    });
  }

  private setBooking(b) { // 'b: Booking', no need?
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

  private populateRooms() { // private because it is an implementation detail, don't want to expose it outside
    var selectedBuilding = this.buildings.find(b => b.id == this.booking.buildingId); // get the selected building from db
    this.rooms = selectedBuilding ? selectedBuilding.rooms : []; // get the rooms as well?
  }

  submit() {
    var result$ = (this.booking.id) ? this.bookingService.update(this.booking) : this.bookingService.create(this.booking); 
    result$.subscribe(booking => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'Booking was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      // fix after success adding authentication
      // this.router.navigate(['/pages/bookings/', booking.id]); // this.booking.id?
    });
  }
}
