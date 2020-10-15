import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { BuildingService } from '../../../services/building.service';

@Component({
  selector: 'view-building',
  templateUrl: './view-building.component.html',
})
export class ViewBuildingComponent implements OnInit {
  building: any;
  buildingId: number;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private toastyService: ToastyService,
    private buildingService: BuildingService) {

    route.params.subscribe(p => {
      this.buildingId = +p['id'];
      if (isNaN(this.buildingId) || this.buildingId <= 0) {
        router.navigate(['/pages/buildings']);
        return; 
      }
    });
  }

  ngOnInit() { 
    this.buildingService.getBuilding(this.buildingId)
      .subscribe(
        b => this.building = b,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/pages/buildings']);
            return; 
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.buildingService.delete(this.building.id)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success', 
            msg: 'Building was sucessfully removed.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
          this.router.navigate(['/pages/buildings']);
        });
    }
  }
}