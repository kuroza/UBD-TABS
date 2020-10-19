import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';
import { SaveRoom } from '../../../models/room';
import { BuildingService } from '../../../services/building.service';
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
    private route: ActivatedRoute,
    ) { 
      route.params.subscribe(p => {
        this.room.id = +p['id'] || 0;
      });
    }

  ngOnInit() {
    this.buildingService.getAllBuildings()
      .subscribe(buildings => this.buildings = buildings);

      var sources = [];

      if (this.room.id)
        sources.push(this.roomService.getRoom(this.room.id));
      
      Observable.forkJoin(sources).subscribe(data => {
        if (this.room.id) {
          this.setRoom(data[0]);
        }
      }, err => {
        if (err.status == 404)
          this.router.navigate(['/']);
      });
  }

  setRoom(r) {
    this.room.id = r.id;
    this.room.name = r.name;
    this.room.capacity = r.capacity;
    this.room.buildingId = r.buildingId;
  }

  submit() {
    var result$ = (this.room.id) ? this.roomService.update(this.room) : this.roomService.create(this.room); 

    result$.subscribe(() => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'Room was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.router.navigate(['/pages/rooms/', this.room.id]);
    });
  }
}
