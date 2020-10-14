import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbSelectModule, NbInputModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewTimeSlotComponent } from './view-time-slot/view-time-slot';
import { NewTimeSlotComponent } from './new-time-slot/new-time-slot.component';
import { TimeSlotListComponent } from './time-slot-list/time-slot-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
      NbCardModule,
      NbTabsetModule,
      NbAccordionModule,
      NbButtonModule,
      NbInputModule,
      NbSelectModule,
      ThemeModule,
      FormsModule,
      RouterModule,
      NgbModule,
    ],
    declarations: [
      TimeSlotListComponent,
      NewTimeSlotComponent,
      ViewTimeSlotComponent,
    ],
  })
  export class TimeSlotsModule { }