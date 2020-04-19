// import { AuthService } from '../../../services/auth.service';
// import { BookingService } from '../../../services/booking.service';
// import { ToastyService } from 'ng2-toasty';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//     selector: 'ngx-room-details',
//     templateUrl: 'room-details.component.html'
// })
// export class RoomDetailsComponent implements OnInit {
//   room: any;
//   roomId: number;

//   constructor(
//     private route: ActivatedRoute, 
//     private router: Router,
//     private toasty: ToastyService,
//     private bookingService: BookingService,
//     public auth: AuthService) {

//     // * retrieve the id from route
//     route.params.subscribe(p => {
//       this.roomId = +p['id'];
//       if (isNaN(this.roomId) || this.roomId <= 0) {
//         router.navigate(['/pages/rooms']);
//         return; 
//       }
//     });
//   }

//   ngOnInit() { 
//     // todo: Add getBuilding(id) in service
//     // * get the building of id==id from server
//     this.bookingService.getRoom(this.roomId)
//       .subscribe(
//         r => this.room = r,
//         err => {
//           if (err.status == 404) {
//             this.router.navigate(['/pages/rooms']);
//             return; 
//           }
//         });
//   }

//   delete() {
//     if (confirm("Are you sure?")) {
//       this.bookingService.delete(this.room.id)
//         .subscribe(x => {
//           this.router.navigate(['/pages/rooms']);
//         });
//     }
//   }
// }