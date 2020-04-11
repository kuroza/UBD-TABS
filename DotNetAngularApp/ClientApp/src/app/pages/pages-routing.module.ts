import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingListComponent } from './bookings/booking-list/booking-list';
import { NewBookingComponent } from './bookings/new-booking/new-booking.component';
import { ViewRoomsComponent } from './rooms/view-rooms/view-rooms.component';
import { ViewBookingComponent } from './bookings/view-booking/view-booking';
import { AuthGuard } from '../services/auth.guard';
import { BookingListTreeComponent } from './bookings/booking-list-tree/booking-list-tree';

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
    { path: 'bookings', component: BookingListComponent }, // view all bookings / table
    { path: 'bookings/tree', component: BookingListTreeComponent }, // * Booking list tree
    { path: 'bookings/new', component: NewBookingComponent, canActivate: [AuthGuard] },
    { path: 'bookings/:id', component: ViewBookingComponent },
    { path: 'bookings/edit/:id', component: NewBookingComponent, canActivate: [AuthGuard] },
    { path: 'rooms', component: ViewRoomsComponent },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
