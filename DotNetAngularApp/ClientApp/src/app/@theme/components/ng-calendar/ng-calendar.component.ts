import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { 
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { BookingService } from '../../../services/booking.service';
import { colors } from '../calendar-header/colors';
import { BuildingService } from '../../../services/building.service';

@Component({
  selector: 'ngx-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ng-calendar.component.html',
  styleUrls: ['./ng-calendar.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class NgCalendarComponent {

  excludeDays: number[] = [0, 5];
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  date: string;
  refresh: Subject<any> = new Subject(); // ? Subject()
  events: CalendarEvent[] = [];
  bookings: any; // Bookings[]
  startDateTime: any;
  endDateTime: any;
  bookDate: any;
  startTime: any;
  endTime: any;
  buildings: any;
  rooms: any;
  filter: any = {};
  allBookings: any;

  constructor(
    private bookingService: BookingService,
    private buildingService: BuildingService
    ) {}

  async ngOnInit() {
    this.buildingService.getAllBuildings() // get the buildings from service for filter drop down
      .subscribe(buildings => this.buildings = buildings); // and store in this.buildings

    this.bookings = this.allBookings = await this.bookingService.getAllBookings() // ! using Promise instead
    this.populateCalendar(); // show all events on init
    this.refresh.next(); // refresh calendar after loading
  }

  // * this will need to be considered when changing the filter/search
  // * reset the current calendar if changing to other searching type (eg. by modules)
  onFilterChange() { // anytime the filters are changed
    this.activeDayIsOpen = false;
    this.events = []; // reset events after every filter change
    var bookings = this.allBookings;

    if (this.filter.buildingId)
      bookings = bookings.filter(b => b.building.id == this.filter.buildingId);

    if (this.filter.roomId)
      bookings = bookings.filter(b => b.room.id == this.filter.roomId);

    this.bookings = bookings;
    this.populateCalendar();
  }

  resetFilter() {
    this.filter = {}; // empty filter drop down
    this.rooms = []; // clear room drop down filter
    this.emptyRoomFilter();
    this.showAllBookings(); // show all if reset
  }

  onBuildingChange() { // for cascading
    var selectedBuilding = this.buildings.find(b => b.id == this.filter.buildingId);
    this.rooms = selectedBuilding ? selectedBuilding.rooms : []; // cascade rooms drop down
    this.emptyRoomFilter();
    
    var bookings = this.allBookings;;
    this.bookings = bookings.filter(b => b.building.id == this.filter.buildingId); // filter events by building
    this.populateCalendar();
  }

  emptyRoomFilter() {
    this.activeDayIsOpen = false;
    this.events = []; // clear events
    delete this.filter.roomId; // clear selected roomId
    this.refresh.next();// refresh calendar after loading
  }

  showAllBookings() {
    this.bookings = this.allBookings;
    this.populateCalendar();
  }

  private populateCalendar() {
    for (let b of this.bookings) {
      var dateFormat = require('dateformat');
      this.bookDate = dateFormat(b.bookDate, 'yyyy-mm-dd'); // * format date

      var modulesLength = b.modules.length;
      var modules: string = b.modules[0].code;
      for (var i=1; i<modulesLength; i++) {
        modules += ", " + b.modules[i].code;
      }

      for (let timeSlot of b.timeSlots) { // * nested loop for each time slots under each booking
        var timeFormat = require('dateformat');
        this.startTime = timeFormat(timeSlot.startTime, 'HH:MM:ss');
        this.startDateTime = this.bookDate + "T" + this.startTime; // * concat date and time into string
        this.endTime = timeFormat(timeSlot.endTime, 'HH:MM:ss');
        this.endDateTime = this.bookDate + "T" + this.endTime;

        this.events = [ // push object into events[]
          ...this.events,
          {
            start: new Date(this.startDateTime),
            end: new Date(this.endDateTime),
            title: ` <b>Module:</b> ${ modules } | <b>Room:</b> ${ b.building.name } - ${ b.room.name }`,
            color: colors.blue,
            meta: {
              id: b.id, // * just the id for component call
              // b, // * the whole booking object
            },
          },
        ];
      }
    }
    this.refresh.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  @Output() selectedBookingId = new EventEmitter<number>();
  
  // send Id to home component for booking-details to use
  sendBookingId({ event }: { event: CalendarEvent }): void {
    this.selectedBookingId.emit(event.meta.id); // * gets the bookingId when event is clicked
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() { // for calendar-header.. click next to close slide animation
    this.activeDayIsOpen = false;
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }
}
