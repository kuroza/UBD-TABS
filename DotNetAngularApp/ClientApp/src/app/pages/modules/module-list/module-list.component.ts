import { ProgrammeService } from './../../../services/programme.service';
import { ModuleService } from './../../../services/module.service';
import { Component, OnInit } from '@angular/core';
import { SaveModule } from '../../../models/module';
import { BookingService } from '../../../services/booking.service';
import { LecturerService } from '../../../services/lecturer.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as _ from 'underscore';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'module-list',
  templateUrl: './module-list.component.html',
  styles: [`
  .table tr {
    cursor: pointer;
  }
  `]
})
export class ModuleListComponent implements OnInit {
  hasAccess = false;
  setActiveAddModule: boolean;
  setActiveDetails: boolean;
  existAlert: boolean = false;
  requiredAlert: boolean = false;
  detailsAlert: boolean = true;

  moduleDetails: any;
  modules: any;
  programmes: any;
  lecturers: any;
  module: SaveModule = {
    id: 0,
    name: '',
    code: '',
    programmeId: 0,
    lecturers: [],
  };

  constructor(
    private moduleService: ModuleService,
    private lecturerService: LecturerService,
    private toastyService: ToastyService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private programmeService: ProgrammeService
  ) { }

  async ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }

    this.modules = await this.moduleService.getAllModules(); // promise

    // this.moduleService.getAllModules() // observable
    //   .subscribe(modules => this.modules = modules);

    this.programmeService.getAllProgrammes() // observable
      .subscribe(programmes => this.programmes = programmes);

    this.lecturerService.getAllLecturers()
      .subscribe(lecturers => this.lecturers = lecturers);
  }

  private setModule(m) {
    this.module.id = m.id;
    this.module.name = m.name;
    this.module.code = m.code;
    this.module.lecturers = _.pluck(m.lecturers, 'id');
  }

  submit() {
    var result$ = (this.module.id) ? this.moduleService.update(this.module) : this.moduleService.create(this.module);

    result$.subscribe(() => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'Module was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 3000
      });
      this.redirectTo('/pages/modules');
    },
    err => {
      if (err.status == 409) {
        this.existAlert = true;
      }
      else if (err.status == 400) {
        this.requiredAlert = true;
      }
    });
  }

  onClose() {
    this.existAlert = false;
    this.requiredAlert = false;
  }

  onCloseDetails() {
    this.detailsAlert = false;
  }

  edit(id) {
    this.moduleService.getModule(id)
    .subscribe(
      m => {
        this.setActiveDetails = false;
        this.setActiveAddModule = true;
        this.setModule(m);
      });
  }

  delete(id) {
    if (confirm("Are you sure?")) {
      this.moduleService.delete(id)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success', 
            msg: 'Module was sucessfully deleted.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 3000
          });
          this.redirectTo('/pages/modules');
        });
    }
  }

  selectModule(id) {
    this.moduleService.getModule(id)
    .subscribe(
      m => {
        this.setActiveAddModule = false;
        this.setActiveDetails = true;
        this.moduleDetails = m;
      },
      err => {
        if (err.status == 404) {
          this.redirectTo('/pages/modules');
          return; 
        }
      });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
