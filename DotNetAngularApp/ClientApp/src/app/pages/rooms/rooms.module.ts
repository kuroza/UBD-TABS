import { RoomFormModule } from './../../@theme/components/room-form/room-form.module';
import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbSelectModule, NbInputModule, NbAlertModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RoomListComponent } from './room-list/room-list.component';
import { RouterModule } from '@angular/router';
import { RoomDetailsModule } from '../../@theme/components/room-details/room-details.module';

@NgModule({
    imports: [
      NbTooltipModule,
      NbIconModule,
      NbAlertModule,
      NbCardModule,
      NbTabsetModule,
      NbAccordionModule,
      NbButtonModule,
      NbInputModule,
      NbSelectModule,
      ThemeModule,
      FormsModule,
      RouterModule,
      RoomFormModule,
      RoomDetailsModule
    ],
    declarations: [
      RoomListComponent,
    ],
  })
  export class RoomsModule { }