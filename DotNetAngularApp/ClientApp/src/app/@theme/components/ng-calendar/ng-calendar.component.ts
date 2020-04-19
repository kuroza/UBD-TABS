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

  // excludeDays: number[] = [0, 5];
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  date: string;
  refresh: Subject<any> = new Subject(); // ? Subject()
  events: CalendarEvent[] = [];
  bookings: any; // ? bookings: Bookings[];
  startDateTime: any;
  endDateTime: any;
  bookDate: any;
  startTime: any;
  endTime: any;
  buildings: any;
  rooms: any;
  filter: any = {};
  allBookings: any;

  constructor(private bookingService: BookingService) {}

  async ngOnInit() {
    this.bookingService.getBuildings() // get the buildings from service for filter drop down
      .subscribe(buildings => this.buildings = buildings); // and store in this.buildings

    this.bookings = this.allBookings = await this.bookingService.getAllBookings()
    // .subscribe(result => this.bookings = result); // ! using Promise instead
    
    this.refresh.next(); // refresh calendar after loading
  }

  onFilterChange() {
    this.activeDayIsOpen = false;
    this.events = []; // reset events after every filter change
    var bookings = this.allBookings;

    if (this.filter.buildingId == 0 || this.filter.roomId == 0) // if none is selected, empty events
      this.events = [];

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
  }

  onBuildingChange() { // for cascading
    var selectedBuilding = this.buildings.find(b => b.id == this.filter.buildingId);
    this.rooms = selectedBuilding ? selectedBuilding.rooms : []; // cascade rooms drop down
    this.emptyRoomFilter();
  }

  emptyRoomFilter() {
    this.activeDayIsOpen = false;
    this.events = []; // clear events
    delete this.filter.roomId; // clear selected roomId
    this.refresh.next();// refresh calendar after loading
  }

  private populateCalendar() {
    for (let b of this.bookings) {
      var dateFormat = require('dateformat');
      this.bookDate = dateFormat(b.bookDate, 'yyyy-mm-dd'); // * format date

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
            title: "Purpose: " + b.purpose + " | Name: " + b.contact.name,
            color: colors.blue,
            meta: {
              id: b.id, // * just the id
              // b, // * booking object
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
  
  eventClicked({ event }: { event: CalendarEvent }): void {
    this.selectedBookingId.emit(event.meta.id); // * gets the bookingId when event is clicked
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() { // for calendar-header.. click next, close slide animation
    this.activeDayIsOpen = false;
  }

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }
}
