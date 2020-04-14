import { BookingService } from '../../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ngx-view-rooms',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  building: any;
  buildings: any;

  constructor(
    private bookingService: BookingService,
    public auth: AuthService) { }

  ngOnInit() {
    this.bookingService.getBuildings()
      .subscribe(buildings => this.buildings = buildings);
  }

  // viewOnClick(id) {
  //   get roomId from template
  // }
}
