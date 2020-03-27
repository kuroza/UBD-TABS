import { BookingFormComponent } from './../../@theme/components/booking-form/booking-form.component';
import { FormsModule } from '@angular/forms';
import { CalendarHeaderComponent } from '../../@theme/components/calendar-header/calendar-header.component';
import { NgCalendarComponent } from '../../@theme/components/ng-calendar/ng-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgModule } from '@angular/core';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
//CommonModule in app.module.ts

@NgModule({
  imports: [
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NbCardModule,
    ThemeModule,
    FormsModule,
    NbTabsetModule
  ],
  declarations: [
    DashboardComponent,
    NgCalendarComponent,
    CalendarHeaderComponent,
    BookingFormComponent
  ],
})
export class DashboardModule { }
