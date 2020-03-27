import { NgbdTablePaginationModule } from './../../@theme/components/table-pagination/table-pagination.module';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { BookingsComponent } from './bookings.component';
import { BookingTableModule } from '../../@theme/components/booking-table/booking-table.module';

@NgModule({
    imports: [
      NbCardModule,
      ThemeModule,
      FormsModule,
      NbTabsetModule,
      NgbdTablePaginationModule,
      BookingTableModule
    ],
    declarations: [
      BookingsComponent,
    ],
  })
  export class BookingsModule { }