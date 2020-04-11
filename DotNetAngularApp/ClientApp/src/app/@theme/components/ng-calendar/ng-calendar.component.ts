import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
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
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  bookings: any; // ? bookings: Bookings[];
  startDateTime: any;
  endDateTime: any;
  bookDate: any;
  startTime: any;
  endTime: any;

  constructor(private bookingService: BookingService) {}

  async ngOnInit() {
    this.bookings = await this.bookingService.getAllBookings()
      // .subscribe(result => this.bookings = result); // ! using Promise instead

    for (let b of this.bookings) {
      var dateFormat = require('dateformat');
      this.bookDate = dateFormat(b.bookDate, 'yyyy-mm-dd'); // * format date

      for (let timeSlot of b.timeSlots) { // * nested loop for each time slots under each booking
        var timeFormat = require('dateformat');
        this.startTime = timeFormat(timeSlot.startTime, 'hh:MM:ss');
        this.startDateTime = this.bookDate + "T" + this.startTime; // * concat date and time into string
        this.endTime = timeFormat(timeSlot.endTime, 'hh:MM:ss');
        this.endDateTime = this.bookDate + "T" + this.endTime;

        this.events = [ // push object into events[]
          ...this.events,
          {
            start: new Date(this.startDateTime),
            end: new Date(this.endDateTime),
            title: "Purpose: " + b.purpose + " | Name: " + b.contact.name,
            meta: {
              // id: b.id, // * just the id
              b, // * booking object
            },
          },
        ];
      }
    }
    this.refresh.next(); // refresh calendar after loading
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

  eventClicked({ event }: { event: CalendarEvent }): void {
    // todo: here write code to show clicked event's details on right card
    console.log('Event clicked', event);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() { // for calendar-header.. click next, close slide animation
    this.activeDayIsOpen = false;
  }
}
