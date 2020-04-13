import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // for binding forms
import { NbDatepickerModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { RoomDetailsComponent } from './room-details.component';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    NbDatepickerModule, 
    NbCardModule, 
    NgbModule,
    NbButtonModule
  ],
  declarations: [RoomDetailsComponent],
  exports: [RoomDetailsComponent],
  bootstrap: [RoomDetailsComponent],
  providers: [
    DatePipe,
  ],
})
export class RoomDetailsModule {}
