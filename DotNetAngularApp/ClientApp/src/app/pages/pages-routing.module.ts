import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewBookingsComponent } from './bookings/view-bookings/view-bookings.component';
import { NewBookingComponent } from './bookings/new-booking/new-booking.component';
import { ViewRoomsComponent } from './rooms/view-rooms/view-rooms.component';

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
    { path: 'bookings', component: ViewBookingsComponent }, //view all bookings / table
    { path: 'bookings/new', component: NewBookingComponent },
    { path: 'bookings/:id', component: NewBookingComponent },
    { path: 'rooms', component: ViewRoomsComponent },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
