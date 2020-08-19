import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private http: HttpClient) { }

  getFaculties() {
    return this.http.get('api/faculties')
      .pipe(map(response => response)); // get the resonse and map to json
  }
}
