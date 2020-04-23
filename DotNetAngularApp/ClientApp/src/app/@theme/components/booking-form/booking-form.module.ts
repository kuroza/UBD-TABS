import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingFormComponent, CustomAdapter, CustomDateParserFormatter } from './booking-form.component';
import { NbCardModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    NbCardModule, 
    NgbModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule,
    NgSelectModule
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
