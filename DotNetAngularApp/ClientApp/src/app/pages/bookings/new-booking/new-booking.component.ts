import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarMonthViewDay, CalendarView, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';
import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs';
import * as _ from 'underscore';
import { SaveBooking } from '../../../models/booking';
import { BookingService } from '../../../services/booking.service';
import { BuildingService } from '../../../services/building.service';
import { ModuleService } from '../../../services/module.service';
import { SemesterService } from '../../../services/semester.service';
import { TimeSlotService } from '../../../services/timeSlot.service';

// @Injectable()
// export class CustomAdapter extends NgbDateAdapter<string> {

//   readonly DELIMITER = '-';

//   fromModel(value: string | null): NgbDateStruct | null {
//     if (value) {
//       let date = value.split(this.DELIMITER);
//       return {
//         day : parseInt(date[0], 10),
//         month : parseInt(date[1], 10),
//         year : parseInt(date[2], 10)
//       };
//     }
//     return null;
//   }

//   toModel(date: NgbDateStruct | null): string | null {
//     return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
//   }
// }

// @Injectable()
// export class CustomDateParserFormatter extends NgbDateParserFormatter {

//   readonly DELIMITER = '-'; // change in input form

//   parse(value: string): NgbDateStruct | null {
//     if (value) {
//       let date = value.split(this.DELIMITER);
//       return {
//         day : parseInt(date[0], 10),
//         month : parseInt(date[1], 10),
//         year : parseInt(date[2], 10)
//       };
//     }
//     return null;
//   }

//   format(date: NgbDateStruct | null): string {
//     return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
//   }
// }

@Component({
  selector: 'ngx-new-booking',
  templateUrl: './new-booking.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    roomId: 0,
    buildingId: 0,
    bookDate: '',
    // bookDate: [],
    timeSlots: [], // selectedTimeSlots
    modules: [],
    semesterId: 0,
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
  }

  ngOnInit() {
    var sources = [
      this.buildingService.getAllBuildings(),
      this.timeSlotService.getAllTimeSlots(),
      this.moduleService.getAllModules(),
      this.semesterService.getAllSemesters(),
    ];

    // for editing Booking events
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
      delete this.selectedMonthViewDay.cssClass; // remove the date timetable marking
      this.selectedDays.splice(dateIndex, 1); // remove from array
      // this.booking.bookDate.splice(dateIndex, 1);
    } else {
      this.selectedDays.push(this.selectedMonthViewDay);
      day.cssClass = 'cal-day-selected';
      this.selectedMonthViewDay = day;

      // var dateFromClicked = formatDate(this.selectedMonthViewDay.date, 'yyyy-MM-dd', 'en-us', '+0800');
      // this.booking.bookDate.push(dateFromClicked);
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

  // ! Booking form ---------------------------------------------------------------------

  onClickReset() {
    this.resetBookingField();
  }

  resetBookingField() {
    this.booking.id = 0;
    this.booking.roomId = 0;
    this.booking.buildingId = 0;
    // this.booking.bookDate = [];
    this.booking.bookDate = '';
    this.booking.timeSlots = [];
    this.booking.modules = [];
    this.booking.semesterId = 0;
  }

  // editing
  private setBooking(b) {
    this.booking.id = b.id;
    this.booking.buildingId = b.building.id;
    this.booking.roomId = b.room.id;
    this.booking.semesterId = b.semester.id;
    this.booking.bookDate = b.bookDate;
    this.booking.timeSlots = _.pluck(b.timeSlots, 'id');
    this.booking.modules = _.pluck(b.modules, 'id');
  }

  onBuildingChange() {
    this.populateRooms();

    delete this.booking.roomId;
  }

  private populateRooms() {
    var selectedBuilding = this.buildings.find(b => b.id == this.booking.buildingId);
    this.rooms = selectedBuilding ? selectedBuilding.rooms : [];
  }

  submit() {
    // Rearrange date
    // var date = this.booking.bookDate.split(this.DELIMITER);
    // this.year = parseInt(date[2], 10);
    // this.month = parseInt(date[1], 10);
    // this.day = parseInt(date[0], 10);
    // this.booking.bookDate = this.month + this.DELIMITER + this.day + this.DELIMITER + this.year;

    // Convert JSON values into string
    var date: any = this.booking.bookDate; // date has to be of 'any' type
    this.year = date.year;
    this.month = date.month;
    this.day = date.day;
    this.booking.bookDate = this.year + this.DELIMITER + this.month + this.DELIMITER + this.day;

    var result$ = (this.booking.id) ? this.bookingService.update(this.booking) : this.bookingService.create(this.booking); 
    result$.subscribe(() => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'Booking was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 3000
      });
      this.resetBookingField();
      // this.router.navigate(['/pages/bookings/', this.booking.id]);
      this.redirectTo('/pages/bookings/');
    },
    err => {
      if (err.status == 409) {
        this.existAlert = true;
      } else if (err.status == 400) {
        this.requiredAlert = true;
      }
    });

    this.onClose();
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
