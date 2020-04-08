import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventAction,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { 
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { colors } from '../calendar-header/colors';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  //excludeDays: number[] = [0, 5];
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  bookings: any; // bookings: Bookings[];
  date: string;

  constructor(private bookingService: BookingService) {}

  async ngOnInit() {
    this.bookings = await this.bookingService.getAllBookings()
      // .subscribe(result => this.bookings = result); // using Promise instead

    for (let booking of this.bookings) {
      // this.date = formatDate(booking.bookDate, 'medium', 'en-us', 'GMT+8');        
      this.events = [ // push object into events[]
        ...this.events,
        {
          start: new Date(booking.bookDate),
          title: booking.purpose,
          meta: {
            id: booking.id,
          },
        },
      ];
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
    // here write code to show clicked event's details on right card
    console.log('Event clicked', event);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() { // for calendar-header.. click next, close slide animation
    this.activeDayIsOpen = false;
  }
}
