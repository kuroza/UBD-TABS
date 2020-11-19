import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbSelectModule, NbInputModule, NbAlertModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FacultyListComponent } from './faculty-list/faculty-list.component';

@NgModule({
    imports: [
      NbCardModule,
      NbTabsetModule,
      NbAccordionModule,
      NbButtonModule,
      ThemeModule,
      FormsModule,
      RouterModule,
      NbTooltipModule,
      NbIconModule,
      NbAlertModule,
      NbInputModule,
      NbSelectModule,
    ],
    declarations: [
      FacultyListComponent,
    ],
  })
  export class FacultiesModule { }