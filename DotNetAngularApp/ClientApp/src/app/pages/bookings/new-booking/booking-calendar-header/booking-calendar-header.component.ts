import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { Router } from '@angular/router';

@Component({
  selector: 'booking-calendar-header',
  templateUrl: './booking-calendar-header.component.html',
  styleUrls: ['./booking-calendar-header.component.scss'],
})
export class BookingCalendarHeaderComponent {
  constructor(private router: Router) {}

  @Input() view: CalendarView | 'month' | 'week' | 'day';

  @Input() viewDate: Date;

  @Input() locale: string = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
