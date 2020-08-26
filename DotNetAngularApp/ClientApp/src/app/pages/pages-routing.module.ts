import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingListComponent } from './bookings/booking-list/booking-list';
import { ViewBookingComponent } from './bookings/view-booking/view-booking';
import { NewBookingComponent } from './bookings/new-booking/new-booking.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { NewRoomComponent } from './rooms/new-room/new-room.component';
// import { AuthGuard } from '../services/auth.guard';
import { ViewRoomComponent } from './rooms/view-room/view-room';
import { UserProfileComponent } from './users/user-profile/user-profile';
import { TestAddBookingComponent } from './bookings/test-add-booking/test-add-booking';
import { NewFacultyComponent } from './faculties/new-faculty/new-faculty.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'bookings/new', component: NewBookingComponent },
    { path: 'bookings/test', component: TestAddBookingComponent },
    { path: 'bookings/:id', component: ViewBookingComponent },
    { path: 'bookings/edit/:id', component: NewBookingComponent },
    { path: 'bookings', component: BookingListComponent },
    { path: 'rooms/new', component: NewRoomComponent },
    { path: 'rooms/:id', component: ViewRoomComponent },
    { path: 'rooms/edit/:id', component: NewRoomComponent },
    { path: 'rooms', component: RoomListComponent },
    { path: 'account/profile', component: UserProfileComponent },  // ? change to auth/profile?
    { path: 'faculties/new', component: NewFacultyComponent },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
