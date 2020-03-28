import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { ViewRoomsComponent } from './view-rooms/view-rooms.component';

@NgModule({
    imports: [
      NbCardModule,
      ThemeModule,
      FormsModule,
      NbTabsetModule,
    ],
    declarations: [
      ViewRoomsComponent,
    ],
  })
  export class RoomsModule { }