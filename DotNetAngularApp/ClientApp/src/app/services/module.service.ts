import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveModule } from '../models/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private readonly modulesEndpoint = '/api/modules';

  constructor(
    private http: HttpClient) { }
  
  getModule(id) {
    return this.http.get(this.modulesEndpoint + '/' + id)
      .pipe(map(response => response));
  }
  
  getAllModules() {
    return this.http.get('/api/allmodules')
      .pipe(map(response => response));
  }

  // async getAllModules() {
  //   return this.http.get('/api/allmodules').toPromise();
  // }

  create(module) {
    return this.http.post(this.modulesEndpoint, module)
      .pipe(map(response => response));
  }

  update(module: SaveModule) {
    return this.http.put(this.modulesEndpoint + '/' + module.id, module)
      .pipe(map(response => response));
  }

  delete(id) {
    return this.http.delete(this.modulesEndpoint + '/' + id)
      .pipe(map(response => response));
  }
}
