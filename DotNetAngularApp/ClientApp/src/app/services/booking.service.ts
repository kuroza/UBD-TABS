import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveBooking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBooking(id) {
    return this.http.get('/api/bookings/' + id)
      .pipe(map(response => response));
  }

  getBuildings() { //gets buildings from server and return the data in json format to client
    return this.http.get('/api/buildings')
      .pipe(map(response => response));
  }
  
  getRooms() {
    return this.http.get('/api/rooms')
      .pipe(map(response => response));
  }

  getTimeSlots() {
    return this.http.get('/api/timeslots')
      .pipe(map(response => response));
  }

  create(booking) {
    return this.http.post('/api/bookings', booking)
      .pipe(map(response => response));
  }

  update(booking: SaveBooking) {
    return this.http.put('/api/bookings/' + booking.id, booking)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete('/api/bookings/' + id)
      .pipe(map(response => response));
  }
}
