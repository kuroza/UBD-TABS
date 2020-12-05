import { SaveTimeSlot } from './../../../models/timeSlot';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TimeSlotService } from '../../../services/timeSlot.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-view-time-slots',
  templateUrl: './time-slot-list.component.html',
})
export class TimeSlotListComponent implements OnInit {

  hasAccess = false;
  error: string;
  existAlert: boolean = false;
  requiredAlert: boolean = false;

  timeSlots: any;
  startTime = {hour: 0, minute: 0};
  endTime = {hour: 0, minute: 0};
  timeSlot: SaveTimeSlot = {
    id: 0,
    startTime: '',
    endTime: '',
  };

  constructor(
    private timeSlotService: TimeSlotService,
    private userService: UserService,
    private toasty: ToastyService,
    private router: Router,
    private route: ActivatedRoute,
    private config: NgbTimepickerConfig
  ) {
    // config.spinners = false;
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }

    this.timeSlotService.getAllTimeSlots()
      .subscribe(timeSlots => this.timeSlots = timeSlots);
  }

  submitTimeSlot() {
    // this.timeSlot.startTime = `1900-01-01T${this.startTime.hour}:${this.startTime.minute}:00`;
    // this.timeSlot.endTime = `1900-01-01T${this.endTime.hour}:${this.endTime.minute}:00`;

    var result$ = (this.timeSlot.id) ? this.timeSlotService.update(this.timeSlot) : this.timeSlotService.create(this.timeSlot);

    result$.subscribe(() => {
      this.successToasty('Time slot was successfully saved');
      this.redirectTo('/pages/timeslots');
    },
    err => {
      if (err.status == 409) { // TODO:
        this.conflictErrorAlert(err);
      }
      else if (err.status == 400 || 500) {
        this.invalidOrBadRequestAlert();
      }
    });
  }

  edit(id) {
    this.timeSlotService.getTimeSlot(id)
    .subscribe(
      ts => {
        this.setTimeSlot(ts);
      });
  }

  private setTimeSlot(ts) {
    // maybe binding to client not supported
    var fullHour: string = ts.startTime.replace('1900-01-01T', '');
    var hour: number = +fullHour.slice(0, 2);
    var minute: number = +fullHour.slice(3, 5);
    this.startTime.hour = hour;
    this.startTime.minute = minute;

    this.timeSlot.id = ts.id;
    this.timeSlot.startTime = ts.startTime;
    this.timeSlot.endTime = ts.endTime;
  }

  delete(id) {
    if (confirm("Are you sure?")) {
      this.timeSlotService.delete(id)
        .subscribe(x => {
          this.warningToasty('Time slot was successfully deleted.');
          this.redirectTo('/pages/timeslots');
        });
    }
  }

  private successToasty(message: string) {
    this.toasty.success({
      title: 'Success',
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  private warningToasty(message: string) {
    this.toasty.warning({
      title: 'Success',
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  private conflictErrorAlert(err: any) {
    this.error = err.error;
    this.existAlert = true;
    this.requiredAlert = false;
  }

  private invalidOrBadRequestAlert() {
    this.existAlert = false;
    this.requiredAlert = true;
  }

  onClose() {
    this.existAlert = false;
    this.requiredAlert = false;
  }

  onClickBackTimeSlot() {
    this.timeSlot.id = 0;
    this.timeSlot.startTime = '';
    this.startTime.hour = 0;
    this.startTime.minute = 0;
    this.timeSlot.endTime = '';
    this.endTime.hour = 0;
    this.endTime.minute = 0;
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
