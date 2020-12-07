import { Toasty } from './../../toasty';
import { SaveTimeSlot } from './../../../models/timeSlot';
import { Component, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { TimeSlotService } from '../../../services/timeSlot.service';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-view-time-slots',
  templateUrl: './time-slot-list.component.html',
})
export class TimeSlotListComponent implements OnInit {
  private dialogRef: NbDialogRef<any>;
  dialogHeaderTitle: string;
  timeSlotToBeDeleted: number;

  hasAccess = false;
  error: string;
  existAlert: boolean = false;
  requiredAlert: boolean = false;
  detailsAlert: boolean = true;

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
    private toasty: Toasty,
    private router: Router,
    private route: ActivatedRoute,
    private config: NgbTimepickerConfig,
    private dialogService: NbDialogService
  ) {
    // config.spinners = false;
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.hasAccess = this.userService.hasAccess();

    this.timeSlotService.getAllTimeSlots()
      .subscribe(timeSlots => this.timeSlots = timeSlots);
  }

  submitTimeSlot() {
    // this.timeSlot.startTime = `1900-01-01T${this.startTime.hour}:${this.startTime.minute}:00`;
    // this.timeSlot.endTime = `1900-01-01T${this.endTime.hour}:${this.endTime.minute}:00`;

    var result$ = (this.timeSlot.id) ? this.timeSlotService.update(this.timeSlot) : this.timeSlotService.create(this.timeSlot);

    result$.subscribe(() => {
      this.toasty.successToasty('Time slot was successfully saved');
      this.redirectTo('/pages/timeslots');
    },
    err => {
      if (err.status == 409) {
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
    this.startTime.hour = parseInt(ts.startTime.slice(11, 13));
    this.startTime.minute = parseInt(ts.startTime.slice(14, 16));
    this.endTime.hour = parseInt(ts.endTime.slice(11, 13));
    this.endTime.minute = parseInt(ts.endTime.slice(14, 16));

    this.timeSlot.id = ts.id;
    this.timeSlot.startTime = ts.startTime;
    this.timeSlot.endTime = ts.endTime;
  }

  deleteTimeSlot(id: number, dialog: TemplateRef<any>) {
    this.timeSlotToBeDeleted = id;
    this.dialogHeaderTitle = "Deleting time slot"
    this.dialogRef = this.dialogService.open(dialog, { context: 'Are you sure you want delete time slot?' });
  }

  onConfirmDelete() {
    this.timeSlotService.delete(this.timeSlotToBeDeleted)
      .subscribe(() => {
        this.closeDialog();
        this.timeSlotToBeDeleted = 0;
        this.toasty.defaultToasty('Time slot was successfully deleted');
        this.redirectTo('/pages/timeslots');
      });
  }

  closeDialog(): void {
    if (this.dialogRef) this.dialogRef.close();
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

  onCloseAlert() {
    this.detailsAlert = false;
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
