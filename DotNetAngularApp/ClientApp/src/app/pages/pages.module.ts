import { BuildingsModule } from './buildings/buildings.module';
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
import { SemestersComponent } from './semesters/semesters.component';
import { CoursesComponent } from './courses/courses.component';
import { ModulesModule } from './modules/modules.module';
import { LecturersModule } from './lecturers/lecturers.module';
import { SemestersModule } from './semesters/semesters.module';
import { CoursesModule } from './courses/courses.module';
import { TimeSlotsModule } from './time-slots/time-slots.module';

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
    ModulesModule,
    LecturersModule,
    SemestersModule,
    CoursesModule,
    TimeSlotsModule,
    BuildingsModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
