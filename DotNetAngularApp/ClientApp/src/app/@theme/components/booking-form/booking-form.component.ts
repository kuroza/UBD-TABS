
import { BookingService } from '../../../services/booking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-booking-form',
  templateUrl: './booking-form.component.html',
})
export class BookingFormComponent implements OnInit {
  buildings: any;
  rooms: any;
  timeSlots: any;
  booking: any = { // booking object

    timeSlots: [], // change to empty array []
    contact: {},
  };

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
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
    this.bookingService.create(this.booking)
      .subscribe(x => console.log(x));// this booking is not sent to the server unless we subscribe to the observable
  }
}
