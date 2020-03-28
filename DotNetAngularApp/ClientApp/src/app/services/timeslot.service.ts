import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  constructor(private http: HttpClient) { }

  getTimeSlots() {
    return this.http.get('/api/timeslots')
      .pipe(map(response => response));
  }
}
