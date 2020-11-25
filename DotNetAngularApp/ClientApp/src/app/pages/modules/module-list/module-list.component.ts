import { SemesterService } from './../../../services/semester.service';
import { OfferingService } from './../../../services/offering.service';
import { MajorService } from '../../../services/major.service';
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
  setActiveSemester: boolean;
  error: string;
  existAlert: boolean = false;
  requiredAlert: boolean = false;
  detailsAlert: boolean = true;

  filter: any = {};
  moduleDetails: any;
  modules: any;
  semesters: any;
  allOfferings: any;
  offerings: any = [];
  majors: any;
  lecturers: any;
  
  module: SaveModule = {
    id: 0,
    name: '',
    code: '',
    majorId: 0,
    // lecturers: [],
  };

  constructor(
    private moduleService: ModuleService,
    private lecturerService: LecturerService,
    private toastyService: ToastyService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private majorService: MajorService,
    private offeringService: OfferingService,
    private semesterService: SemesterService
  ) { }

  async ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }

    this.modules = await this.moduleService.getAllModules(); // redundant? or maybe used in editing

    // this.moduleService.getAllModules() // observable
    //   .subscribe(modules => this.modules = modules);

    this.semesterService.getAllSemesters()
      .subscribe(semesters => this.semesters = semesters);

    this.offeringService.getAllOfferings()
      .subscribe(allOfferings => this.allOfferings = allOfferings);

    this.majorService.getAllMajors() // observable
      .subscribe(majors => this.majors = majors);

    this.lecturerService.getAllLecturers()
      .subscribe(lecturers => this.lecturers = lecturers);
  }

  private setModule(m) {
    this.module.id = m.id;
    this.module.name = m.name;
    this.module.code = m.code;
    // this.module.lecturers = _.pluck(m.lecturers, 'id');
  }

  onSemesterFilter() {
    this.offerings = this.allOfferings.filter(o => o.semesterId == this.filter.semesterId);
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
        this.requiredAlert = false;
        console.log(err.error);
        this.error = err.error;
        this.existAlert = true;
      }
      else if (err.status == 400) {
        this.existAlert = false;
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
        this.moduleDetails = m;
      },
      err => {
        if (err.status == 404) {
          this.redirectTo('/pages/modules');
          return; 
        }
      });
  }

  onClickBack() {
    this.module.id = 0;
    this.module.name = '';
    this.module.code = '';
    this.module.majorId = 0;
    // this.module.lecturers = [];
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
