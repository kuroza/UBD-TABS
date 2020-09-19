import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { PagesRoutingModule } from './pages-routing.module';
import { BookingsModule } from './bookings/bookings.module';
import { FacultiesModule } from './faculties/faculties.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    HomeModule,
    BookingsModule,
    RoomsModule,
    UsersModule,
    FacultiesModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
