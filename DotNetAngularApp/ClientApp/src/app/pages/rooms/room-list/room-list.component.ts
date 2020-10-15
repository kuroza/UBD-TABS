import { BookingService } from '../../../services/booking.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BuildingService } from '../../../services/building.service';
// import { AuthService } from '../../../services/auth.service';

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
    private buildingService: BuildingService
    ) { }

  ngOnInit() {
    this.buildingService.getAllBuildings()
      .subscribe(buildings => this.buildings = buildings);
  }

  @Output() selectedRoomId = new EventEmitter<number>();
  
  sendRoomId(event): void {
    this.selectedRoomId.emit(event.id);
  }
}
