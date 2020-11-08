import { PaginationComponent } from './../../@theme/components/shared/pagination.component';
import { RouterModule } from '@angular/router';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { NbCardModule, NbTabsetModule, NbIconModule, NbButtonModule, NbTreeGridModule, NbInputModule, NbDatepickerModule, NbSelectModule, NbCheckboxModule, NbAlertModule, NbAccordionModule, NbSpinnerModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { BookingListComponent } from './booking-list/booking-list';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingCalendarHeaderModule } from './new-booking/booking-calendar-header/booking-calendar-header.module';

@NgModule({
  imports: [
    NbSpinnerModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
    ThemeModule,
    FormsModule,
    RouterModule,
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BookingCalendarHeaderModule,
    NbAlertModule,
    NgbModule,
    NbCheckboxModule,
    NbSelectModule,
    NgSelectModule,
    NbDatepickerModule,
    NbAccordionModule,
  ],
  declarations: [
    BookingListComponent,
    NewBookingComponent,
    PaginationComponent,
  ],
  providers: [
    DatePipe,
  ],
})
export class BookingsModule { }