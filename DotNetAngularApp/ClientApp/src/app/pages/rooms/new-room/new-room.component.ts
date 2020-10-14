import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { SaveRoom } from '../../../models/room';
import { BookingService } from '../../../services/booking.service';
import { ModuleService } from '../../../services/module.service';

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
    private bookingService: BookingService,
    private moduleService: ModuleService,
    private toastyService: ToastyService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.bookingService.getBuildings()
      .subscribe(buildings => this.buildings = buildings);
  }

  submit() {
    var result$ = this.moduleService.create(this.room);

    result$.subscribe(() => { // b
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
