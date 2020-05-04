import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingListComponent } from './bookings/booking-list/booking-list';
import { ViewBookingComponent } from './bookings/view-booking/view-booking';
import { NewBookingComponent } from './bookings/new-booking/new-booking.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { NewRoomComponent } from './rooms/new-room/new-room.component';
import { AuthGuard } from '../services/auth.guard';
import { ViewRoomComponent } from './rooms/view-room/view-room';
import { UserProfileComponent } from './users/user-profile/user-profile';
import { TestAddBookingComponent } from './bookings/test-add-booking/test-add-booking';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'bookings/new', component: NewBookingComponent, canActivate: [AuthGuard] },
    { path: 'bookings/test', component: TestAddBookingComponent, canActivate: [AuthGuard] },
    { path: 'bookings/:id', component: ViewBookingComponent, canActivate: [AuthGuard] },
    { path: 'bookings/edit/:id', component: NewBookingComponent, canActivate: [AuthGuard] },
    { path: 'bookings', component: BookingListComponent, canActivate: [AuthGuard] },
    { path: 'rooms/new', component: NewRoomComponent, canActivate: [AuthGuard] },
    { path: 'rooms/:id', component: ViewRoomComponent, canActivate: [AuthGuard] },
    { path: 'rooms/edit/:id', component: NewRoomComponent, canActivate: [AuthGuard] },
    { path: 'rooms', component: RoomListComponent, canActivate: [AuthGuard] },
    { path: 'account/profile', component: UserProfileComponent, canActivate: [AuthGuard]},  // ? change to auth/profile?
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
