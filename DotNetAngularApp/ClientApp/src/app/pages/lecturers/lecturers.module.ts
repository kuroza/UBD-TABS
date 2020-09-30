import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LecturerListComponent } from './lecturer-list/lecturer-list.component';
import { NewLecturerComponent } from './new-lecturer/new-lecturer.component';
import { ViewLecturerComponent } from './view-lecturer/view-lecturer.component';

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
        LecturerListComponent,
        NewLecturerComponent,
        ViewLecturerComponent,
    ],
  })
  export class LecturersModule { }