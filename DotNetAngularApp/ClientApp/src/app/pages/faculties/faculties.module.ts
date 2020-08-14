import { FacultyFormModule } from './../../@theme/components/faculty-form/faculty-form.module';
import { NewFacultyComponent } from './new-faculty/new-faculty.component';
import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
      NbCardModule,
      NbTabsetModule,
      NbAccordionModule,
      NbButtonModule,
      ThemeModule,
      FormsModule,
      RouterModule,
      FacultyFormModule,
    ],
    declarations: [
      NewFacultyComponent,
    ],
  })
  export class FacultiesModule { }