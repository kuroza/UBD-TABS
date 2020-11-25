import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveFaculty } from '../models/faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private readonly facultiesEndpoint = '/api/faculties';

  constructor(
    private http: HttpClient) { }
  
  getFaculty(id) {
    return this.http.get(this.facultiesEndpoint + '/' + id)
      .pipe(map(response => response));
  }
  
  getAllFaculties() {
    return this.http.get('/api/allfaculties')
      .pipe(map(response => response));
  }

  create(faculty) {
    return this.http.post(this.facultiesEndpoint, faculty)
      .pipe(map(response => response));
  }

  update(faculty: SaveFaculty) {
    return this.http.put(this.facultiesEndpoint + '/' + faculty.id, faculty)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete(this.facultiesEndpoint + '/' + id)
      .pipe(map(response => response));
  }
}
