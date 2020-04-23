import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // for binding forms
import { TestAddBookingComponent, CustomAdapter, CustomDateParserFormatter } from './test-add-booking';
import { NbDatepickerModule, NbCardModule } from '@nebular/theme';

@NgModule({
  imports: [CommonModule, FormsModule, NbDatepickerModule, NbCardModule, NgbModule],
  declarations: [TestAddBookingComponent],
  exports: [TestAddBookingComponent],
  bootstrap: [TestAddBookingComponent],
  providers: [
    DatePipe,
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ],
})
export class TestAddBookingModule {}