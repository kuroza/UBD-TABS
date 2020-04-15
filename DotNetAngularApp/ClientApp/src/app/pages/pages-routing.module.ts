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

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    { path: 'bookings/new', component: NewBookingComponent, canActivate: [AuthGuard] },
    { path: 'bookings', component: BookingListComponent }, // view all bookings / table
    { path: 'bookings/:id', component: ViewBookingComponent },
    { path: 'bookings/edit/:id', component: NewBookingComponent, canActivate: [AuthGuard] },
    { path: 'rooms/new', component: NewRoomComponent },
    { path: 'rooms', component: RoomListComponent },
    { path: 'rooms/:id', component: ViewRoomComponent },
    { path: 'rooms/edit/:id', component: NewRoomComponent },
    { path: 'account/profile', component: UserProfileComponent, canActivate: [AuthGuard]},  // * temporary 
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
