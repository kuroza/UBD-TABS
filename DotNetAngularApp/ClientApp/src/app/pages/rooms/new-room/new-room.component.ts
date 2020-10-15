import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { SaveRoom } from '../../../models/room';
import { BookingService } from '../../../services/booking.service';
import { BuildingService } from '../../../services/building.service';
import { ModuleService } from '../../../services/module.service';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'ngx-new-room',
  templateUrl: './new-room.component.html',
})
export class NewRoomComponent implements OnInit {
  buildings: any;
  room: SaveRoom = {
    id: 0,
    name: '',
    capacity: null,
    buildingId: 0,
  };
  
  constructor(
    private buildingService: BuildingService,
    private roomService: RoomService,
    private toastyService: ToastyService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.buildingService.getAllBuildings()
      .subscribe(buildings => this.buildings = buildings);
  }

  submit() {
    var result$ = this.roomService.create(this.room);

    result$.subscribe(() => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'Room was sucessfully created.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.router.navigate(['/pages/rooms/', this.room.id]);
    });
  }
}
