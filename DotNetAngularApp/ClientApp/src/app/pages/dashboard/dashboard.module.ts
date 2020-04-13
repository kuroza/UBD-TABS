import { BookingDetailsModule } from './../../@theme/components/booking-details/booking-details.module';
import { BookingFormModule } from '../../@theme/components/booking-form/booking-form.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NbCardModule, NbTabsetModule, NbButtonModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { NgCalendarModule } from '../../@theme/components/ng-calendar/ng-calendar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    FormsModule,
    RouterModule,
    NbTabsetModule,
    NgCalendarModule,
    BookingFormModule,
    BookingDetailsModule,
    NbButtonModule
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
