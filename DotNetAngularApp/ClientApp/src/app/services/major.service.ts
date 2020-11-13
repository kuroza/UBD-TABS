import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveMajor } from '../models/major';

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  private readonly majorsEndpoint = '/api/major';

  constructor(
    private http: HttpClient) { }
  
  getModule(id) {
    return this.http.get(this.majorsEndpoint + '/' + id)
      .pipe(map(response => response));
  }
  
  getAllMajors() {
    return this.http.get('/api/allmajors')
      .pipe(map(response => response));
  }

  // async getAllMajors() {
  //   return this.http.get('/api/all-majors').toPromise();
  // }

  create(major) {
    return this.http.post(this.majorsEndpoint, major)
      .pipe(map(response => response));
  }

  update(major: SaveMajor) {
    return this.http.put(this.majorsEndpoint + '/' + major.id, major)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete(this.majorsEndpoint + '/' + id)
      .pipe(map(response => response));
  }
}
