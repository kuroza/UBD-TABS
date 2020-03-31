import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

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
}
