import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../../services/building.service';
import { UserService } from '../../../services/user.service';
import { RoomService } from '../../../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveRoom } from '../../../models/room';
import { SaveBuilding } from '../../../models/building';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'ngx-view-rooms',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  buildingDetails: any;
  building: SaveBuilding = {
    id: 0,
    name: '',
  };
  buildings: any;
  buildingSettings: IDropdownSettings = {};
  selectedBuilding: any = [];
  roomDetails: any;
  roomId: number;
  room: SaveRoom = {
    id: 0,
    name: '',
    capacity: null,
    buildingId: 0,
  };

  hasAccess = false;
  setActiveAddRoom: boolean;
  setActiveAddBuilding: boolean;
  setActiveDetails: boolean;
  error: string;
  existRoomAlert: boolean = false;
  existBuildingAlert: boolean = false;
  requiredAlert: boolean = false;
  detailsAlert: boolean = true;

  constructor(
    private buildingService: BuildingService,
    private userService: UserService,
    private roomService: RoomService,
    private toasty: ToastyService,
    private route: ActivatedRoute, 
    private router: Router,
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.hasAccess = this.userService.hasAccess();

    this.buildingService.getAllBuildings()
      .subscribe(buildings => this.buildings = buildings);

      this.buildingSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'name',
        allowSearchFilter: true,
        enableCheckAll: false
      };
  }

  deleteRoom(id) {
    if (confirm("Are you sure?")) {
      this.roomService.delete(id)
        .subscribe(() => {
          this.warningToasty('Room was successfully deleted');
          this.redirectTo('/pages/rooms');
        });
    }
  }

  private warningToasty(message: string) {
    this.toasty.warning({
      title: 'Success',
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  deleteBuilding(id) {
    if (confirm("Are you sure?")) {
      this.buildingService.delete(id)
        .subscribe(() => {
          this.warningToasty('Building was successfully deleted');
          this.redirectTo('/pages/rooms');
        });
    }
  }

  private setRoom(r) {
    this.room.id = r.id;
    this.room.name = r.name;
    this.room.capacity = r.capacity;
    this.room.buildingId = r.buildingId;
    this.selectedBuilding = [];
    this.selectedBuilding.push(this.buildings.find(building => building.id == r.building.id));
  }

  private setBuilding(b) {
    this.building.id = b.id;
    this.building.name = b.name;
  }

  onBuildingSelect(item: any) {
    this.room.buildingId = item.id;
  }

  onBuildingDeSelect(item: any) {
    this.room.buildingId = 0;
  }

  editRoom(id) {
    this.roomService.getRoom(id)
    .subscribe(
      r => {
        this.setActiveDetails = false;
        this.setActiveAddBuilding = false;
        this.setActiveAddRoom = true;
        this.setRoom(r);
      });
  }

  editBuilding(id) {
    this.buildingService.getBuilding(id)
    .subscribe(
      b => {
        this.setActiveDetails = false;
        this.setActiveAddRoom = false;
        this.setActiveAddBuilding = true;
        this.setBuilding(b);
      });
  }

  selectRoom(id) {
    this.roomService.getRoom(id)
    .subscribe(
      r => {
        this.setActiveAddRoom = false;
        this.setActiveAddBuilding = false;
        this.setActiveDetails = true;
        this.roomDetails = r;
      },
      err => {
        if (err.status == 404) {
          this.redirectTo('/pages/rooms');
          return; 
        }
      });
  }

  selectBuilding(id) {
    this.buildingService.getBuilding(id)
    .subscribe(
      b => {
        this.setActiveAddRoom = false;
        this.setActiveAddBuilding = false;
        this.setActiveDetails = true;
        this.buildingDetails = b;
      },
      err => {
        if (err.status == 404) {
          this.redirectTo('/pages/rooms');
          return; 
        }
      });
  }

  submitRoom() {
    var result$ = (this.room.id) ? this.roomService.update(this.room) : this.roomService.create(this.room); 

    result$.subscribe(() => {
      this.successToasty('Room was successfully saved');
      this.redirectTo('/pages/rooms');
    },
    err => {
      if (err.status == 409) {
        this.requiredAlert = false;
        this.error = err.error;
        this.existRoomAlert = true;
      }
      else if (err.status == 400) {
        this.existRoomAlert = false;
        this.requiredAlert = true;
      }
    });
    
    this.onClose();
  }

  private successToasty(message: string) {
    this.toasty.success({
      title: 'Success',
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  onClose() {
    this.existRoomAlert = false;
    this.existBuildingAlert = false;
    this.requiredAlert = false;
    this.detailsAlert = false;
  }

  submitBuilding() {
    var result$ = (this.building.id) ? this.buildingService.update(this.building) : this.buildingService.create(this.building);

    result$.subscribe(() => {
      this.successToasty('Building was successfully saved');
      this.redirectTo('/pages/rooms');
    },
    err => {
      if (err.status == 409) {
        this.requiredAlert = false;
        this.error = err.error;
        this.existBuildingAlert = true;
      }
      else if (err.status == 400) {
        this.existBuildingAlert = false;
        this.requiredAlert = true;
      }
    });

    this.onClose();
  }

  onClickBack() {
    this.room.id = 0;
    this.room.name = '';
    this.room.capacity = null;
    this.room.buildingId = 0;
    this.selectedBuilding = [];

    this.building.id = 0;
    this.building.name = '';
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
}
