
import { BuildingService } from './../../../services/building.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'booking-form',
  templateUrl: './booking-form.component.html',
})
export class BookingFormComponent implements OnInit {
  buildings: any;
  rooms: any;
  
  booking: any = {}; //booking object

  constructor(
    private buildingService: BuildingService,
    ) {}

  ngOnInit() {
    this.buildingService.getBuildings() //get the buildings from server
      .subscribe(buildings => this.buildings = buildings); //use that to initialize this buildings field

    
  }

  onBuildingChange() { //when the option is selected
    var selectedBuilding = this.buildings.find(b => b.id == this.booking.building); //get the selected building from db
    this.rooms = selectedBuilding ? selectedBuilding.rooms : []; //get the rooms as well?
  }
}
