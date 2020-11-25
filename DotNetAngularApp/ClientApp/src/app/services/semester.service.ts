import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveSemester } from '../models/semester';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  private readonly semestersEndpoint = '/api/semesters';

  constructor(
    private http: HttpClient) { }

  getSemester(id) {
    return this.http.get(this.semestersEndpoint + '/' + id)
      .pipe(map(response => response));
  }

  getAllSemesters() {
    return this.http.get('/api/allsemesters')
      .pipe(map(response => response));
  }

  create(semester) {
    return this.http.post(this.semestersEndpoint, semester)
      .pipe(map(response => response));
  }

  update(semester: SaveSemester) {
    return this.http.put(this.semestersEndpoint + '/' + semester.id, semester)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete(this.semestersEndpoint + '/' + id)
      .pipe(map(response => response));
  }
}