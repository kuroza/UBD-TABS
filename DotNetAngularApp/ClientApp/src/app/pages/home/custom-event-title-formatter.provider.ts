import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { DatePipe } from '@angular/common';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  month(event: CalendarEvent): string {
    return `${new DatePipe(this.locale).transform(
      event.start,
      'hh:mm a',
      this.locale,
    )} - ${new DatePipe(this.locale).transform(
      event.end,
      'hh:mm a',
      this.locale,
    )}<br> ${event.title}<hr>`;
  }

  week(event: CalendarEvent): string {
    return `<i>${new DatePipe(this.locale).transform(
      event.start,
      'HH:mm',
      this.locale,
    )}-${new DatePipe(this.locale).transform(
      event.end,
      'HH:mm',
      this.locale,
    )}</i><br> ${event.title}`;
  }

  day(event: CalendarEvent): string {
    return `<i>${new DatePipe(this.locale).transform(
      event.start,
      'hh:mm a',
      this.locale,
    )} - ${new DatePipe(this.locale).transform(
      event.end,
      'hh:mm a',
      this.locale,
    )}</i><br> ${event.title}`;
  }
}
