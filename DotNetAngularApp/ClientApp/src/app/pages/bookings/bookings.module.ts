import { ViewBookingComponent } from './view-booking/view-booking';
import { PaginationComponent } from './../../@theme/components/shared/pagination.component';
import { RouterModule } from '@angular/router';
import { BookingFormModule } from '../../@theme/components/booking-form/booking-form.module';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { NbCardModule, NbTabsetModule, NbIconModule, NbButtonModule, NbTreeGridModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { BookingListComponent } from './booking-list/booking-list';
import { BookingDetailsModule } from '../../@theme/components/booking-details/booking-details.module';
import { BookingListTreeComponent } from './booking-list-tree/booking-list-tree';

@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbIconModule,
    NbTreeGridModule,
    ThemeModule,
    FormsModule,
    RouterModule,
    BookingFormModule,
    BookingDetailsModule
  ],
  declarations: [
    BookingListComponent,
    BookingListTreeComponent,
    NewBookingComponent,
    ViewBookingComponent,
    PaginationComponent,
  ],
})
export class BookingsModule { }