import { ToastyService } from 'ng2-toasty';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BuildingService } from '../../../services/building.service';
import { UserService } from '../../../services/user.service';
import { RoomService } from '../../../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveRoom } from '../../../models/room';
import { SaveBuilding } from '../../../models/building';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-view-rooms',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  private dialogRef: NbDialogRef<any>;
  dialogHeaderTitle: string;
  roomToBeDeleted: number;
  buildingToBeDeleted: number;

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
    private dialogService: NbDialogService
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

  deleteRoom(id, dialog: TemplateRef<any>) {
    this.roomToBeDeleted = id;
    this.dialogHeaderTitle = "Deleting room"
    this.dialogRef = this.dialogService.open(dialog, { context: 'Are you sure you want delete room?' });
  }

  private defaultToasty(message: string) {
    this.toasty.default({
      title: 'Success',
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  deleteBuilding(id, dialog: TemplateRef<any>) {
    this.buildingToBeDeleted = id;
    this.dialogHeaderTitle = "Deleting building"
    this.dialogRef = this.dialogService.open(dialog, { context: 'Are you sure you want delete building?' });
  }

  onConfirmDelete() {
    if (this.roomToBeDeleted) {
      this.roomService.delete(this.roomToBeDeleted)
        .subscribe(() => {
          this.closeDialog();
          this.roomToBeDeleted = 0;
          this.defaultToasty('Room was successfully deleted');
          this.redirectTo('/pages/rooms');
        });
    }

    if (this.buildingToBeDeleted) {
      this.buildingService.delete(this.buildingToBeDeleted)
        .subscribe(() => {
          this.closeDialog();
          this.buildingToBeDeleted = 0;
          this.defaultToasty('Building was successfully deleted');
          this.redirectTo('/pages/rooms');
        });
    }
  }

  closeDialog(): void {
    if (this.dialogRef) this.dialogRef.close();
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
