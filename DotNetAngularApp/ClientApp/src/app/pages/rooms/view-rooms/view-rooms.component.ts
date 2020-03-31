import { BookingService } from './../../../services/booking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.scss']
})
export class ViewRoomsComponent implements OnInit {
  rooms: any;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
}
