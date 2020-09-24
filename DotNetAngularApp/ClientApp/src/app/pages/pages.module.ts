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
import { ModulesComponent } from './modules/modules.component';
import { LecturersComponent } from './lecturers/lecturers.component';
import { SemestersComponent } from './semesters/semesters.component';
import { CoursesComponent } from './courses/courses.component';

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
    ModulesComponent,
    LecturersComponent,
    SemestersComponent,
    CoursesComponent,
  ],
})
export class PagesModule {
}
