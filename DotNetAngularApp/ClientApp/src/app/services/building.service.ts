import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveBuilding } from '../models/building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private readonly buildingsEndpoint = '/api/buildings';

  constructor(
    private http: HttpClient) { }

  getBuilding(id) {
    return this.http.get(this.buildingsEndpoint + '/' + id)
      .pipe(map(response => response));
  }

  getAllBuildings() {
    return this.http.get('/api/allbuildings')
      .pipe(map(response => response));
  }

  create(building) {
    return this.http.post(this.buildingsEndpoint, building)
      .pipe(map(response => response));
  }

  update(building: SaveBuilding) {
    return this.http.put(this.buildingsEndpoint + '/' + building.id, building)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete(this.buildingsEndpoint + '/' + id)
      .pipe(map(response => response));
  }
}