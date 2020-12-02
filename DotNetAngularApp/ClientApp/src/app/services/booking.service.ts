import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveBooking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly bookingsEndpoint = '/api/bookings';

  constructor(
    private http: HttpClient) { }

  getBooking(id) {
    return this.http.get(this.bookingsEndpoint + '/' + id)
      .pipe(map(response => response));
  }

  getAllBookings() {
    return this.http.get('/api/allbookings')
      .pipe(map(response => response));
  }

  create(booking: SaveBooking) {
    return this.http.post(this.bookingsEndpoint, booking)
      .pipe(map(response => response));
  }

  confirmCreate(booking: SaveBooking) {
    return this.http.post(this.bookingsEndpoint + "/confirm", booking)
      .pipe(map(response => response));
  }

  update(booking: SaveBooking) {
    return this.http.put(this.bookingsEndpoint + '/' + booking.id, booking)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete(this.bookingsEndpoint + '/' + id)
      .pipe(map(response => response));
  }
}
