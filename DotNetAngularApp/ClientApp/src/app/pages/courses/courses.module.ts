import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';

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
        CoursesComponent,
    ],
  })
  export class CoursesModule { }