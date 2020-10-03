import { BookingDetailsModule } from '../../@theme/components/booking-details/booking-details.module';
import { BookingFormModule } from '../../@theme/components/booking-form/booking-form.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NbCardModule, NbTabsetModule, NbButtonModule, NbAccordionModule, NbSelectModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeComponent } from './home.component';
import { NgCalendarModule } from '../../@theme/components/ng-calendar/ng-calendar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    FormsModule,
    RouterModule,
    NbTabsetModule,
    NbAccordionModule,
    NgCalendarModule,
    BookingFormModule,
    BookingDetailsModule,
    NbButtonModule,
    NbSelectModule
  ],
  declarations: [
    HomeComponent,
  ],
})
export class HomeModule { }
