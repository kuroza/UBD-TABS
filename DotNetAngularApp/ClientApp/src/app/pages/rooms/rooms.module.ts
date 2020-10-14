import { RoomFormModule } from './../../@theme/components/room-form/room-form.module';
import { NewRoomComponent } from './new-room/new-room.component';
import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbSelectModule, NbInputModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RoomListComponent } from './room-list/room-list.component';
import { RouterModule } from '@angular/router';
import { ViewRoomComponent } from './view-room/view-room';
import { RoomDetailsModule } from '../../@theme/components/room-details/room-details.module';

@NgModule({
    imports: [
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
      NewRoomComponent,
      ViewRoomComponent,
    ],
  })
  export class RoomsModule { }