import { BookingService } from './../../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../../services/building.service';
import { UserService } from '../../../services/user.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'ngx-booking-list',
  templateUrl: './booking-list.html',
  styles: [`
  .table tr {
    cursor: pointer;
  }
  `]
})
export class BookingListComponent implements OnInit {
  hasAccess = false;
  
  constructor(
    private bookingService: BookingService,
    private buildingService: BuildingService,
    private userService: UserService,
    private toasty: ToastyService,
    private route: ActivatedRoute, 
    private router: Router,
    ) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.hasAccess = this.userService.hasAccess();
  }
}
