import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbCalendarRangeModule, NbCalendarModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SemestersComponent } from './semesters.component';

@NgModule({
    imports: [
      NbCalendarModule,
      NbCalendarRangeModule,
      NbCardModule,
      NbTabsetModule,
      NbAccordionModule,
      NbButtonModule,
      ThemeModule,
      FormsModule,
      RouterModule,
    ],
    declarations: [
        SemestersComponent,
    ],
  })
  export class SemestersModule { }