import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { TimeSlotService } from '../../../services/timeSlot.service';

@Component({
  selector: 'view-time-slot',
  templateUrl: './view-time-slot.html',
})
export class ViewTimeSlotComponent implements OnInit {
  timeSlot: any;
  timeSlotId: number;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toastyService: ToastyService,
    private timeSlotService: TimeSlotService) {

    route.params.subscribe(p => {
      this.timeSlotId = +p['id'];
      if (isNaN(this.timeSlotId) || this.timeSlotId <= 0) {
        router.navigate(['/pages/timeSlots']);
        return; 
      }
    });
  }

  ngOnInit() { 
    this.timeSlotService.getTimeSlot(this.timeSlotId)
      .subscribe(
        t => this.timeSlot = t,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/pages/timeSlots']);
            return; 
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.timeSlotService.delete(this.timeSlot.id)
        .subscribe(() => {
          this.toastyService.success({
            title: 'Success', 
            msg: 'Time slot was sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
          this.router.navigate(['/pages/timeSlots']);
        });
    }
  }
}