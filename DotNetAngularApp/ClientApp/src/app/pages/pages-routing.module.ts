import { ManageUserComponent } from './users/manage-user/manage-user.component';
import { AuthGuard } from '../services/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { BookingListComponent } from './bookings/booking-list/booking-list';
import { NewBookingComponent } from './bookings/new-booking/new-booking.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { UserProfileComponent } from './users/user-profile/user-profile';
import { ModuleListComponent } from './modules/module-list/module-list.component';
import { TimeSlotListComponent } from './time-slots/time-slot-list/time-slot-list.component';
import { LecturerListComponent } from './lecturers/lecturer-list/lecturer-list.component';
import { FacultyListComponent } from './faculties/faculty-list/faculty-list.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    
    { path: 'account/profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'bookings/new', component: NewBookingComponent, canActivate: [AuthGuard], data: { permittedRoles:['SuperAdmin', 'Admin'] } },
    { path: 'bookings/edit/:id', component: NewBookingComponent, canActivate: [AuthGuard], data: { permittedRoles:['SuperAdmin', 'Admin'] } },
    // { path: 'bookings', component: BookingListComponent },
    { path: 'calendar', component: HomeComponent },
    { path: 'faculties', component: FacultyListComponent, canActivate: [AuthGuard], data: { permittedRoles:['SuperAdmin', 'Admin'] } },
    { path: 'lecturers', component: LecturerListComponent, canActivate: [AuthGuard], data: { permittedRoles:['SuperAdmin', 'Admin'] } },
    { path: 'modules', component: ModuleListComponent, canActivate: [AuthGuard], data: { permittedRoles:['SuperAdmin', 'Admin'] } },
    { path: 'rooms', component: RoomListComponent, canActivate: [AuthGuard], data: { permittedRoles:['SuperAdmin', 'Admin'] } },
    { path: 'timeslots', component: TimeSlotListComponent, canActivate: [AuthGuard], data: { permittedRoles:['SuperAdmin'] } },
    { path: 'users/manage', component: ManageUserComponent, canActivate: [AuthGuard], data: { permittedRoles:['SuperAdmin'] } },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
