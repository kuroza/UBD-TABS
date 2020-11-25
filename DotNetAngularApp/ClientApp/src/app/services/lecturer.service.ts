import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveLecturer } from '../models/lecturer';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  private readonly lecturersEndpoint = '/api/lecturers';

  constructor(
    private http: HttpClient) { }

  getLecturer(id) {
    return this.http.get(this.lecturersEndpoint + '/' + id)
      .pipe(map(response => response));
  }

  getAllLecturers() {
    return this.http.get('/api/alllecturers')
      .pipe(map(response => response));
  }

  create(lecturer) {
    return this.http.post(this.lecturersEndpoint, lecturer)
      .pipe(map(response => response));
  }

  update(lecturer: SaveLecturer) {
    return this.http.put(this.lecturersEndpoint + '/' + lecturer.id, lecturer)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete(this.lecturersEndpoint + '/' + id)
      .pipe(map(response => response));
  }
}