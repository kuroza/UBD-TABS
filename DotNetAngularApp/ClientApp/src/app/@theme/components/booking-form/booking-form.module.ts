import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // for binding forms
import { BookingFormComponent, CustomAdapter, CustomDateParserFormatter } from './booking-form.component';
import { NbDatepickerModule, NbCardModule, NbButtonModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    NbDatepickerModule, 
    NbCardModule, 
    NgbModule,
    NbButtonModule
  ],
  declarations: [BookingFormComponent],
  exports: [BookingFormComponent],
  bootstrap: [BookingFormComponent],
  providers: [
    DatePipe,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ],
})
export class BookingFormModule {}
