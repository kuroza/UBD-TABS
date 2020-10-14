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
  
  getModules() {
    return this.http.get('/api/modules')
      .pipe(map(response => response));
  }

  create(module) {
    return this.http.post(this.modulesEndpoint, module)
      .pipe(map(response => response));
  }
}
