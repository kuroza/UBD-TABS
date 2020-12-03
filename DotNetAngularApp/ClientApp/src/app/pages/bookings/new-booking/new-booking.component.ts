import { formatDate } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent, CalendarMonthViewDay, CalendarView, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';
import { WeekViewHourColumn } from 'calendar-utils';
import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs';
import * as _ from 'underscore';
import { SaveBooking } from '../../../models/booking';
import { BookingService } from '../../../services/booking.service';
import { BuildingService } from '../../../services/building.service';
import { OfferingService } from '../../../services/offering.service';
import { SemesterService } from '../../../services/semester.service';
import { TimeSlotService } from '../../../services/timeSlot.service';

@Component({
  selector: 'ngx-new-booking',
  templateUrl: './new-booking.component.html',
  styles: [
    `
      .cal-day-selected,
      .cal-day-selected:hover {
        background-color: lightblue !important;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NewBookingComponent implements OnInit {

  readonly DELIMITER = '-';
  nbSpinner;
  error: string;
  existAlert: boolean = false;
  requiredAlert: boolean = false;

  nbDate: any;
  day: number;
  month: number;
  year: number;
  datePicker: string;
  
  buildings: any;
  rooms: any;
  timeSlots: any;
  semesters: any;
  semesterSelect: number = 0;
  allOfferings: any;
  offerings: any = [];

  booking: SaveBooking = {
    id: 0,
    offerings: [],
    rooms: [],
    bookDates: [],
    timeSlots: [],
    purpose: '',
    buildingId: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private buildingService: BuildingService,
    private semesterService: SemesterService,
    private timeSlotService: TimeSlotService,
    private offeringService: OfferingService,
    private toastyService: ToastyService
  ) {
    route.params.subscribe(p => {
      this.booking.id = +p['id'] || 0;
    });
  }

  ngOnInit() {
    var sources = [
      this.buildingService.getAllBuildings(),
      this.timeSlotService.getAllTimeSlots(),
      this.semesterService.getAllSemesters(),
      this.offeringService.getAllOfferings(),
    ];

    if (this.booking.id)
      sources.push(this.bookingService.getBooking(this.booking.id));

    Observable.forkJoin(sources)
    .subscribe(data => {
      this.buildings = data[0];
      this.timeSlots = data[1];
      this.semesters = data[2];
      this.allOfferings = data[3];

      if (this.booking.id) {
        this.setBooking(data[4]);
        this.populateRooms();
      }
    }, err => {
      if (err.status == 404) this.router.navigate(['/']);
    });
  }

  // * angular-calendar ---------------------------------------------------------------------

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  selectedMonthViewDay: CalendarMonthViewDay;

  selectedDayViewDate: Date;

  hourColumns: WeekViewHourColumn[];

  events: CalendarEvent[] = [];

  selectedDays: any = [];

  excludeDays: number[] = [0, 5];

  dayClicked(day: CalendarMonthViewDay): void {
    this.selectedMonthViewDay = day;
    const selectedDateTime = this.selectedMonthViewDay.date.getTime();
    const dateIndex = this.selectedDays.findIndex(
      (selectedDay) => selectedDay.date.getTime() === selectedDateTime
    );
    if (dateIndex > -1) {
      delete this.selectedMonthViewDay.cssClass; // removes the date timetable marking
      this.selectedDays.splice(dateIndex, 1); // removes from array
      this.booking.bookDates.splice(dateIndex, 1);
    } else {
      this.selectedDays.push(this.selectedMonthViewDay);
      day.cssClass = 'cal-day-selected';
      this.selectedMonthViewDay = day;
      this.formatSelectedDateAndPushToBookDates();
    }
  }

  private formatSelectedDateAndPushToBookDates() {
    var dateFromClicked = formatDate(this.selectedMonthViewDay.date, 'yyyy-MM-dd', 'en-us', '+0800');
    this.booking.bookDates.push(dateFromClicked);
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (this.selectedDays.some((selectedDay) => 
      selectedDay.date.getTime() === day.date.getTime())) {
        day.cssClass = 'cal-day-selected';
      }
    });
  }

  hourSegmentClicked(date: Date) {
    this.selectedDayViewDate = date;
    this.addSelectedDayViewClass();
  }

  beforeWeekOrDayViewRender(event: CalendarWeekViewBeforeRenderEvent) {
    this.hourColumns = event.hourColumns;
    this.addSelectedDayViewClass();
  }

  private addSelectedDayViewClass() {
    this.hourColumns.forEach((column) => {
      column.hours.forEach((hourSegment) => {
        hourSegment.segments.forEach((segment) => {
          delete segment.cssClass;
          if (
            this.selectedDayViewDate &&
            segment.date.getTime() === this.selectedDayViewDate.getTime()
          ) {
            segment.cssClass = 'cal-day-selected';
          }
        });
      });
    });
  }

  // * Booking form ---------------------------------------------------------------------

  resetBookingField() {
    delete this.selectedMonthViewDay.cssClass;
    this.semesterSelect = 0;
    this.booking.id = 0;
    this.booking.offerings = [];
    this.booking.rooms = [];
    this.booking.bookDates = [];
    this.booking.timeSlots = [];
    this.booking.purpose = '';
    this.booking.buildingId = 0;
  }

  private setBooking(b) {
    this.booking.id = b.id;
    this.booking.offerings = _.pluck(b.offerings, 'id');
    this.booking.bookDates = _.pluck(b.bookDates, 'date'); // b.bookDates.map(bd => bd.date); // maybe need to format date[]
    this.booking.rooms = _.pluck(b.rooms, 'id');
    this.booking.timeSlots = _.pluck(b.timeSlots, 'id');
    this.booking.purpose = b.purpose;
    // this.booking.buildingId = b.rooms.buildingId;
  }

  onSemesterChange() {
    if (this.semesterSelect) 
      this.offerings = this.allOfferings.filter(o => o.semesterId == this.semesterSelect);
    else
      this.offerings = [];
  }

  onBuildingChange() {
    this.populateRooms();
    // delete this.booking.rooms; // ? with this, Rooms not showing
  }

  private populateRooms() {
    var selectedBuilding = this.buildings.find(b => b.id == this.booking.buildingId);
    this.rooms = selectedBuilding ? selectedBuilding.rooms : [];
  }

  private lengthIsNotZero() {
    return this.booking.offerings.length != 0 &&
      this.booking.timeSlots.length != 0 &&
      this.booking.rooms.length != 0 &&
      this.booking.bookDates.length != 0;
  }

  validSubmitForm(): boolean {
    if (this.lengthIsNotZero()) return true;
    else return false;
  }

  successToasty(message: string) {
    this.toastyService.success({
      title: 'Success', 
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 5000
    });
  }

  submitBooking() {
    this.nbSpinner = true;
    if (!this.validSubmitForm()) {
      this.invalidOrBadRequestAlert();
      return false;
    }

    if (!this.booking.id) {
      this.bookingService.create(this.booking)
        .subscribe(res => {
          this.successToasty('All bookings were sucessfully saved');
          this.redirectTo('/pages/calendar');
        },
        err => {
          if (err.status == 409) {
            this.conflictErrorAlert(err);
            this.confirmAddAnotherRoomDialog(err);
          } else if (err.status == 400)
            this.invalidOrBadRequestAlert()
        });
    }
    else if (this.booking.id) {
      this.bookingService.update(this.booking)
        .subscribe(() => {
          this.successToasty('Booking was sucessfully saved');
          this.resetBookingField();
          this.redirectTo('/pages/bookings/');
        },
        err => {
          if (err.status == 409)
            this.conflictErrorAlert(err);
          else if (err.status == 400)
            this.invalidOrBadRequestAlert();
        });
    }

    this.onCloseAlert();
  }

  private confirmAddAnotherRoomDialog(err: any) {
    if (confirm(`${err.error} Are you sure you want to add another event to this room?`)) {
      this.bookingService.confirmCreate(this.booking)
        .subscribe(() => {
          this.successToasty('All bookings were sucessfully saved');
          this.redirectTo('/pages/calendar');
        });
    }
  }

  private conflictErrorAlert(err: any) {
    this.error = err.error;
    this.existAlert = true;
    this.requiredAlert = false;
    this.nbSpinner = false;
  }

  private invalidOrBadRequestAlert() {
    this.existAlert = false;
    this.requiredAlert = true;
    this.nbSpinner = false;
  }

  onCloseAlert() {
    this.existAlert = false;
    this.requiredAlert = false;
  }

  redirectTo(uri:string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
 }
}
