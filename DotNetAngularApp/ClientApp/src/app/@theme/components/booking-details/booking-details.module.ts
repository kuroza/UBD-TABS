import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // for binding forms
import { NbDatepickerModule, NbCardModule } from '@nebular/theme';
import { BookingDetailsComponent } from './booking-details.component';

@NgModule({
  imports: [CommonModule, FormsModule, NbDatepickerModule, NbCardModule, NgbModule, RouterModule ],
  declarations: [BookingDetailsComponent],
  exports: [BookingDetailsComponent],
  bootstrap: [BookingDetailsComponent],
  providers: [
    DatePipe,
  ],
})
export class BookingDetailsModule {}
