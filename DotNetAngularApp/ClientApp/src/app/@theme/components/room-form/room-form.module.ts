import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // for binding forms
import { RoomFormComponent } from './room-form.component';
import { NbDatepickerModule, NbCardModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbSelectModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    NbDatepickerModule, 
    NbCardModule, 
    NgbModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule,
  ],
  declarations: [RoomFormComponent],
  exports: [RoomFormComponent],
  bootstrap: [RoomFormComponent],
  providers: [
  ],
})
export class RoomFormModule {}
