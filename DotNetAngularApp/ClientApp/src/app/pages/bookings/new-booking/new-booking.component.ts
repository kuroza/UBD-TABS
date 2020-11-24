import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarMonthViewDay, CalendarView, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';
import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import { ToastyService } from 'ng2-toasty';
import { forkJoin, from, Observable } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators';
import * as _ from 'underscore';
import { SaveBooking } from '../../../models/booking';
import { BookingService } from '../../../services/booking.service';
import { BuildingService } from '../../../services/building.service';
import { ModuleService } from '../../../services/module.service';
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
  ], // #FFCCCB
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
  modules: any;
  semesters: any;

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
    private moduleService: ModuleService,
    private semesterService: SemesterService,
    private timeSlotService: TimeSlotService,
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
      this.moduleService.getAllModules(),
      this.semesterService.getAllSemesters(),
    ];

    // * for editing Booking events
    if (this.booking.id)
      sources.push(this.bookingService.getBooking(this.booking.id));

    Observable.forkJoin(sources)
    .subscribe(data => {
      this.buildings = data[0];
      this.timeSlots = data[1];
      this.modules = data[2];
      this.semesters = data[3];

      if (this.booking.id) {
        this.setBooking(data[4]);
        this.populateRooms();
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/']);
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

      var dateFromClicked = formatDate(this.selectedMonthViewDay.date, 'yyyy-MM-dd', 'en-us', '+0800');
      this.booking.bookDates.push(dateFromClicked);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      if (
        this.selectedDays.some(
          (selectedDay) => selectedDay.date.getTime() === day.date.getTime()
        )
      ) {
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
    this.booking.id = 0;
    this.booking.offerings = [];
    this.booking.rooms = [];
    this.booking.bookDates = [];
    this.booking.timeSlots = [];
    this.booking.purpose = '';
    this.booking.buildingId = 0;
  }

  // * for editing
  private setBooking(b) {
    this.booking.id = b.id;
    this.booking.offerings = _.pluck(b.offerings, 'id');
    this.booking.bookDates = b.bookDates; // ! maybe it's different since using selectedDate[]
    this.booking.rooms = _.pluck(b.rooms, 'id');
    this.booking.timeSlots = _.pluck(b.timeSlots, 'id');
    this.booking.purpose = b.purpose;
    this.booking.buildingId = b.building.id;
  }

  onBuildingChange() {
    this.populateRooms();

    // delete this.booking.rooms; // ? with this, Rooms not showing
  }

  private populateRooms() {
    var selectedBuilding = this.buildings.find(b => b.id == this.booking.buildingId);
    this.rooms = selectedBuilding ? selectedBuilding.rooms : [];
    console.log(selectedBuilding);
  }

  validSubmitForm(): boolean {
    if (
      this.booking.offerings.length != 0 &&
      this.booking.timeSlots.length != 0 &&
      this.booking.rooms.length != 0 &&
      this.booking.bookDates.length != 0
      ) {
      return true;
    } else {
      return false;
    }
  }

  submit() {
    this.nbSpinner = true;

    if (this.validSubmitForm() == false) {
      this.requiredAlert = true;
      this.nbSpinner = false;
      return false;
    }

    if (!this.booking.id) {
      this.bookingService.create(this.booking)
        .subscribe(res => {
          this.toastyService.success({
            title: 'Success', 
            msg: 'All bookings were sucessfully saved.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
          this.redirectTo('/pages/calendar');
        },
        err => {
          if (err.status === 409) {
            console.log(err.error);
            this.error = err.error;
            this.existAlert = true;
            this.nbSpinner = false;
            if (confirm(`${err.error} Are you sure you want to add another event to this room?`)) {
              this.bookingService.confirmCreate(this.booking)
                .subscribe(() => {
                  this.toastyService.success({
                    title: 'Success', 
                    msg: 'All bookings were sucessfully saved.',
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 3000
                  });
                  this.redirectTo('/pages/calendar');
                });
            }
          } else if (err.status === 400) {
            this.existAlert = false;
            this.requiredAlert = true;
            this.nbSpinner = false;
          }
        });
    }
    else if (this.booking.id) {
      this.bookingService.update(this.booking)
        .subscribe(() => {
          this.toastyService.success({
            title: 'Success', 
            msg: 'Booking was sucessfully saved.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 3000
          });
          this.resetBookingField();
          this.redirectTo('/pages/bookings/');
        },
        err => {
          if (err.status == 409) {
            this.existAlert = true;
          } else if (err.status == 400) {
            this.requiredAlert = true;
          }
        });
    }

    this.onClose(); // ? redundant?
  }

  onClose() {
    this.existAlert = false;
    this.requiredAlert = false;
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
