import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http: HttpClient) { }

  getBuildings() { //gets buildings from server and return the data in json format to client
    return this.http.get('/api/buildings')
      .pipe(map(response => response));
  }
}
