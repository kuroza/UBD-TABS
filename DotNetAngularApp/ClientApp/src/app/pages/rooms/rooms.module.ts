import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { ViewRoomsComponent } from './view-rooms/view-rooms.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
      NbCardModule,
      NbTabsetModule,
      NbAccordionModule,
      NbButtonModule,
      ThemeModule,
      FormsModule,
      RouterModule
    ],
    declarations: [
      ViewRoomsComponent,
    ],
  })
  export class RoomsModule { }