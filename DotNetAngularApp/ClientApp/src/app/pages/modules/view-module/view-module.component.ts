import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ModuleService } from '../../../services/module.service';

@Component({
  selector: 'view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss']
})
export class ViewModuleComponent implements OnInit {
  module: any;
  moduleId: number;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toastyService: ToastyService,
    private moduleService: ModuleService) {

    route.params.subscribe(p => {
      this.moduleId = +p['id']; // get the Id from the route 
      if (isNaN(this.moduleId) || this.moduleId <= 0) { // if bookingId is not a number or less than 1, navigate back
        router.navigate(['/pages/modules']);
        return; 
      }
    });
  }

  ngOnInit() { 
    this.moduleService.getModule(this.moduleId)
      .subscribe(
        m => this.module = m,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/pages/modules']);
            return; 
          }
        });
  }

//   delete() {
//     // todo: use a popup
//     if (confirm("Are you sure?")) { // if confirm() == true
//       this.bookingService.delete(this.booking.id) // delete in db
//         .subscribe(x => {
//           this.toastyService.success({
//             title: 'Success', 
//             msg: 'Booking was sucessfully deleted.',
//             theme: 'bootstrap',
//             showClose: true,
//             timeout: 5000
//           });
//           this.router.navigate(['/pages/bookings']);
//         });
//     }
//   }
}
