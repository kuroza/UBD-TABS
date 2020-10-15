import * as _ from 'underscore';
import { BookingService } from '../../../services/booking.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';
import { SaveBooking } from '../../../models/booking';
import { FormControl } from '@angular/forms';
import { BuildingService } from '../../../services/building.service';

@Component({
  selector: 'ngx-room-form',
  templateUrl: './room-form.component.html',
})
export class RoomFormComponent implements OnInit {
  buildings: any;
  rooms: any;

  constructor(
    private route: ActivatedRoute, // to read route parameters
    private router: Router, // to navigate user to different page if they pass an invalid id
    private bookingService: BookingService,
    private buildingService: BuildingService,
    private toastyService: ToastyService) {

    }

  ngOnInit() {
    this.buildings = this.buildingService.getAllBuildings();
  }

  submit() {
  }
}
