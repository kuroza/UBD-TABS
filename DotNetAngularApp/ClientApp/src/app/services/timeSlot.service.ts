import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveTimeSlot } from '../models/timeSlot';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  private readonly timeSlotsEndpoint = '/api/timeslots';

  constructor(
    private http: HttpClient) { }

  getTimeSlot(id) {
    return this.http.get(this.timeSlotsEndpoint + '/' + id)
      .pipe(map(response => response));
  }

  getAllTimeSlots() {
    return this.http.get('/api/alltimeslots')
      .pipe(map(response => response));
  }

  create(timeSlot) {
    return this.http.post(this.timeSlotsEndpoint, timeSlot)
      .pipe(map(response => response));
  }

  update(timeSlot: SaveTimeSlot) {
    return this.http.put(this.timeSlotsEndpoint + '/' + timeSlot.id, timeSlot)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete(this.timeSlotsEndpoint + '/' + id)
      .pipe(map(response => response));
  }
}
