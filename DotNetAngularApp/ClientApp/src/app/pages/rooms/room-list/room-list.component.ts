import { BookingService } from '../../../services/booking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-view-rooms',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  building: any;
  buildings: any;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getBuildings()
      .subscribe(buildings => this.buildings = buildings);
  }

  // viewOnClick(id) {
  //   get roomId from template
  // }
}
