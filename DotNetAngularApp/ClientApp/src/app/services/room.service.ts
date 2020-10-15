import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveRoom } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly roomsEndpoint = '/api/rooms';

  constructor(
    private http: HttpClient) { }

  getRoom(id) {
    return this.http.get(this.roomsEndpoint + '/' + id)
      .pipe(map(response => response));
  }

  getAllRooms() {
    return this.http.get('/api/allrooms')
      .pipe(map(response => response));
  }

  // async getAllRooms() {
  //   return this.http.get('/api/allrooms').toPromise();
  // }

  create(room) {
    return this.http.post(this.roomsEndpoint, room)
      .pipe(map(response => response));
  }

  update(room: SaveRoom) {
    return this.http.put(this.roomsEndpoint + '/' + room.id, room)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete(this.roomsEndpoint + '/' + id)
      .pipe(map(response => response));
  }
}