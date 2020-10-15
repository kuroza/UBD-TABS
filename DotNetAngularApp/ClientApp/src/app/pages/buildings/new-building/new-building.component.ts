import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { SaveBuilding } from '../../../models/building';
import { BuildingService } from '../../../services/building.service';

@Component({
  selector: 'new-building',
  templateUrl: './new-building.component.html',
})
export class NewBuildingComponent implements OnInit {
  // buildings: any;
  building: SaveBuilding = {
    id: 0,
    name: '',
  };
  
  constructor(
    private buildingService: BuildingService,
    private toastyService: ToastyService,
    private router: Router,
    ) { }

  ngOnInit() {
    // this.buildingService.getAllBuildings()
    //   .subscribe(buildings => this.buildings = buildings);
  }

  submit() {
    var result$ = this.buildingService.create(this.building);

    result$.subscribe(() => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'Building was sucessfully added.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 5000
      });
      this.router.navigate(['/pages/buildings/', this.building.id]);
    });
  }
}
