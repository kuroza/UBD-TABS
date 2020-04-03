import { ViewBookingComponent } from './view-booking/view-booking';
import { PaginationComponent } from './../../@theme/components/shared/pagination.component';
import { RouterModule } from '@angular/router';
import { BookingFormModule } from '../../@theme/components/booking-form/booking-form.module';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { NgbdTablePaginationModule } from '../../@theme/components/table-pagination/table-pagination.module';
import { NbCardModule, NbTabsetModule, NbIconModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { BookingListComponent } from './booking-list/booking-list';
import { BookingTableModule } from '../../@theme/components/booking-table/booking-table.module';
import { BookingDetailsModule } from '../../@theme/components/booking-details/booking-details.module';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    FormsModule,
    NbTabsetModule,
    NgbdTablePaginationModule,
    BookingTableModule,
    BookingFormModule,
    RouterModule,
    NbIconModule,
    BookingDetailsModule
  ],
  declarations: [
    BookingListComponent,
    NewBookingComponent,
    PaginationComponent,
    ViewBookingComponent
  ],
})
export class BookingsModule { }