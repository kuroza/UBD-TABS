import { BookingFormModule } from './../../@theme/components/booking-form/booking-form.modules';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { NgCalendarModule } from '../../@theme/components/ng-calendar/ng-calendar.module';
//CommonModule in app.module.ts

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    FormsModule,
    NbTabsetModule,
    NgCalendarModule,
    BookingFormModule
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
