import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbSelectModule, NbInputModule, NbIconModule, NbTooltipModule, NbAlertModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TimeSlotListComponent } from './time-slot-list/time-slot-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
      NbTooltipModule,
      NbIconModule,
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
      NbAlertModule,
    ],
    declarations: [
      TimeSlotListComponent,
    ],
  })
  export class TimeSlotsModule { }