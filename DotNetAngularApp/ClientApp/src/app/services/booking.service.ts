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

  async getAllBookings() {
    return this.http.get('/api/allbookings').toPromise();
  }

  getBookings(filter) {
    return this.http.get(this.bookingsEndpoint + '?' + this.toQueryString(filter))
      .pipe(map(response => response));
  }

  toQueryString(obj) { // * for multiple query strings eg. 'buildingId=1&roomId=2'
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
  }

  create(booking) {
    return this.http.post(this.bookingsEndpoint, booking)
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

  getBuildings() {
    return this.http.get('/api/buildings')
      .pipe(map(response => response));
  }

  getLecturers() {
    return this.http.get('/api/lecturers')
      .pipe(map(response => response));
  }
}
