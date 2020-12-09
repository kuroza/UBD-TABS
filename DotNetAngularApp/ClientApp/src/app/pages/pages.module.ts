import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { NgModule } from '@angular/core';
import { NbMenuModule, NbCardModule, NbButtonModule, NbAccordionModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { PagesRoutingModule } from './pages-routing.module';
import { BookingsModule } from './bookings/bookings.module';
import { FacultiesModule } from './faculties/faculties.module';
import { ModulesModule } from './modules/modules.module';
import { LecturersModule } from './lecturers/lecturers.module';
import { TimeSlotsModule } from './time-slots/time-slots.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    HomeModule,
    BookingsModule,
    RoomsModule,
    UsersModule,
    FacultiesModule,
    ModulesModule,
    LecturersModule,
    TimeSlotsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    
  ],
  declarations: [
    PagesComponent,
    
  ],
})
export class PagesModule {
}
