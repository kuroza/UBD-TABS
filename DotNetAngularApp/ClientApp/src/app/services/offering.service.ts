import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveOffering } from '../models/offering';

@Injectable({
  providedIn: 'root'
})
export class OfferingService {

  private readonly offeringsEndpoint = '/api/offerings';

  constructor(
    private http: HttpClient) { }

  getOffering(id) {
    return this.http.get(this.offeringsEndpoint + '/' + id)
      .pipe(map(response => response));
  }

  getAllOfferings() {
    return this.http.get('/api/allofferings')
      .pipe(map(response => response));
  }

  create(offering: SaveOffering) {
    return this.http.post(this.offeringsEndpoint, offering)
      .pipe(map(response => response));
  }

//   confirmCreate(offering: SaveOffering) {
//     return this.http.post(this.offeringsEndpoint + "/confirm", offering)
//       .pipe(map(response => response));
//   }

  update(offering: SaveOffering) {
    return this.http.put(this.offeringsEndpoint + '/' + offering.id, offering)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete(this.offeringsEndpoint + '/' + id)
      .pipe(map(response => response));
  }
}
