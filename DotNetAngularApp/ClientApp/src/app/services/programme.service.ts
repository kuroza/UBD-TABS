import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveProgramme } from '../models/programme';

@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {

  private readonly programmesEndpoint = '/api/programme';

  constructor(
    private http: HttpClient) { }
  
  getModule(id) {
    return this.http.get(this.programmesEndpoint + '/' + id)
      .pipe(map(response => response));
  }
  
  getAllProgrammes() {
    return this.http.get('/api/allprogrammes')
      .pipe(map(response => response));
  }

  // async getAllProgrammes() {
  //   return this.http.get('/api/allprogrammes').toPromise();
  // }

  create(programme) {
    return this.http.post(this.programmesEndpoint, programme)
      .pipe(map(response => response));
  }

  update(programme: SaveProgramme) {
    return this.http.put(this.programmesEndpoint + '/' + programme.id, programme)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete(this.programmesEndpoint + '/' + id)
      .pipe(map(response => response));
  }
}
