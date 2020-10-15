import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { BookingListComponent } from './bookings/booking-list/booking-list';
import { ViewBookingComponent } from './bookings/view-booking/view-booking';
import { NewBookingComponent } from './bookings/new-booking/new-booking.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { NewRoomComponent } from './rooms/new-room/new-room.component';
import { ViewRoomComponent } from './rooms/view-room/view-room';
import { UserProfileComponent } from './users/user-profile/user-profile';
import { NewFacultyComponent } from './faculties/new-faculty/new-faculty.component';
import { ViewModuleComponent } from './modules/view-module/view-module.component';
import { ModuleListComponent } from './modules/module-list/module-list.component';
import { NewModuleComponent } from './modules/new-module/new-module.component';
import { TimeSlotListComponent } from './time-slots/time-slot-list/time-slot-list.component';
import { NewTimeSlotComponent } from './time-slots/new-time-slot/new-time-slot.component';
import { ViewTimeSlotComponent } from './time-slots/view-time-slot/view-time-slot';
import { LecturerListComponent } from './lecturers/lecturer-list/lecturer-list.component';
import { NewLecturerComponent } from './lecturers/new-lecturer/new-lecturer.component';
import { ViewLecturerComponent } from './lecturers/view-lecturer/view-lecturer.component';
import { NewBuildingComponent } from './buildings/new-building/new-building.component';
import { ViewBuildingComponent } from './buildings/view-building/view-building.component';
import { BuildingListComponent } from './buildings/building-list/building-list.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'bookings/new', component: NewBookingComponent },
    { path: 'bookings/:id', component: ViewBookingComponent },
    { path: 'bookings/edit/:id', component: NewBookingComponent },
    { path: 'bookings', component: BookingListComponent },
    { path: 'rooms/new', component: NewRoomComponent },
    { path: 'rooms/:id', component: ViewRoomComponent },
    { path: 'rooms/edit/:id', component: NewRoomComponent },
    { path: 'rooms', component: RoomListComponent },
    { path: 'buildings/new', component: NewBuildingComponent },
    { path: 'buildings/:id', component: ViewBuildingComponent },
    { path: 'buildings/edit/:id', component: NewBuildingComponent },
    { path: 'buildings', component: BuildingListComponent },
    { path: 'account/profile', component: UserProfileComponent },  // ? change to auth/profile?
    { path: 'faculties/new', component: NewFacultyComponent },
    { path: 'modules', component: ModuleListComponent },
    { path: 'modules/new', component: NewModuleComponent },
    { path: 'modules/:id', component: ViewModuleComponent },
    { path: 'modules/edit/:id', component: NewModuleComponent },
    { path: 'timeslots', component: TimeSlotListComponent },
    { path: 'timeslots/new', component: NewTimeSlotComponent },
    { path: 'timeslots/:id', component: ViewTimeSlotComponent },
    { path: 'timeslots/edit/:id', component: NewTimeSlotComponent },
    { path: 'lecturers', component: LecturerListComponent },
    { path: 'lecturers/new', component: NewLecturerComponent },
    { path: 'lecturers/:id', component: ViewLecturerComponent },
    { path: 'lecturers/edit/:id', component: NewLecturerComponent },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
