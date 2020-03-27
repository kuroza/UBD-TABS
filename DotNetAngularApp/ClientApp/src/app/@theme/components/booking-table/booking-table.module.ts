import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingTableComponent } from './booking-table.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [BookingTableComponent],
  exports: [BookingTableComponent],
  bootstrap: [BookingTableComponent]
})
export class BookingTableModule {}
