//Show dates on title
//Disable slide animation

import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarView
} from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { colors } from '../calendar-header/colors';

@Component({
  selector: 'ng-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ng-calendar.component.html',
  styleUrls: ['./ng-calendar.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})
export class NgCalendarComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean; //for disabling slide animation
  events: CalendarEvent[] = [ //events inside animation
    {
      title: 'SS-1201: Programming Fundamentals',
      start: new Date(),
      color: colors.red
    },
  ];

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void { //for disabling slide animation
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
}
