import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { BookingCalendarHeaderComponent } from './booking-calendar-header.component';

@NgModule({
  imports: [CommonModule, FormsModule, CalendarModule],
  declarations: [BookingCalendarHeaderComponent],
  exports: [BookingCalendarHeaderComponent],
})
export class BookingCalendarHeaderModule {}