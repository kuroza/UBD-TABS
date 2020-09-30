import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SemestersComponent } from './semesters.component';

@NgModule({
    imports: [
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