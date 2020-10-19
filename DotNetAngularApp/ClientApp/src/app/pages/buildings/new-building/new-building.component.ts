import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';
import { SaveBuilding } from '../../../models/building';
import { BuildingService } from '../../../services/building.service';

@Component({
  selector: 'new-building',
  templateUrl: './new-building.component.html',
})
export class NewBuildingComponent implements OnInit {
  building: SaveBuilding = {
    id: 0,
    name: '',
  };
  
  constructor(
    private buildingService: BuildingService,
    private toastyService: ToastyService,
    private router: Router,
    private route: ActivatedRoute
    ) { 

      route.params.subscribe(p => {
        this.building.id = +p['id'] || 0;
      });
    }

  ngOnInit() {
    var sources = [];

    if (this.building.id)
      sources.push(this.buildingService.getBuilding(this.building.id));
    
    Observable.forkJoin(sources).subscribe(data => {
      if (this.building.id) {
        this.setBuilding(data[0]);
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/']);
    });
  }

  private setBuilding(b) {
    this.building.id = b.id;
    this.building.name = b.name;
  }

  submit() {
    var result$ = (this.building.id) ? this.buildingService.update(this.building) : this.buildingService.create(this.building);

    result$.subscribe(() => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'Building was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.router.navigate(['/pages/buildings/', this.building.id]);
    });
  }
}
