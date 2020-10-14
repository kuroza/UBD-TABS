import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'view-room',
  templateUrl: './view-room.html',
})
export class ViewRoomComponent implements OnInit {
  room: any;
  roomId: number;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toastyService: ToastyService,
    private roomService: RoomService) {

    route.params.subscribe(p => {
      this.roomId = +p['id'];
      if (isNaN(this.roomId) || this.roomId <= 0) {
        router.navigate(['/pages/rooms']);
        return; 
      }
    });
  }

  ngOnInit() { 
    this.roomService.getRoom(this.roomId)
      .subscribe(
        r => this.room = r,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/pages/rooms']);
            return; 
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.roomService.delete(this.room.id)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success', 
            msg: 'Room was sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
          this.router.navigate(['/pages/rooms']);
        });
    }
  }
}