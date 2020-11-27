import { SaveOffering } from './../../../models/offering';
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
import { SaveSemester } from '../../../models/semester';

@Component({
  selector: 'module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  hasAccess = false;
  setActiveAddAssignModules: boolean;
  setActiveAddModule: boolean;
  setActiveSemester: boolean;
  error: string;
  existAlert: boolean = false;
  requiredAlert: boolean = false;
  detailsAlert: boolean = true;

  filter: any = {};
  moduleOfferingDetails: any;
  moduleDetails: any;
  modules: any;
  semesters: any;
  selectedSemester: any;
  allOfferings: any;
  offerings: any = [];
  majors: any;
  lecturers: any;
  
  module: SaveModule = {
    id: 0,
    name: '',
    code: '',
    majorId: 0
  };

  offering: SaveOffering = {
    id: 0,
    semesterId: 0,
    moduleId: 0,
    lecturers: []
  };

  semester: SaveSemester = {
    id: 0,
    session: '',
    startDate: '',
    endDate: ''
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

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }

    var sources = [
      this.semesterService.getAllSemesters(),
      this.offeringService.getAllOfferings(),
      this.majorService.getAllMajors(),
      this.lecturerService.getAllLecturers(),
      this.moduleService.getAllModules()
    ]

    Observable.forkJoin(sources)
      .subscribe(data => {
        this.semesters = data[0];
        this.allOfferings = data[1];
        this.majors = data[2];
        this.lecturers = data[3];
        this.modules = data[4];
      }, err => {
        console.log(err);
      });
  }

  private setModuleOffering(m) {

  }

  private setModule(m) {
    this.module.id = m.id;
    this.module.name = m.name;
    this.module.code = m.code;
    // this.module.lecturers = _.pluck(m.lecturers, 'id');
  }

  onSemesterFilter() {
    this.offerings = this.allOfferings.filter(o => o.semesterId == this.filter.semesterId);
    this.selectedSemester = this.semesters.find(s => s.id == this.filter.semesterId);
  }

  submitModule() {
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
      // here, set the tab to Modules List
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

  submitAssignModule() {
    var result$ = (this.offering.id) ? this.offeringService.update(this.offering) : this.offeringService.create(this.offering);

    result$.subscribe(() => {
      this.toastyService.success({
        title: 'Success', 
        msg: 'Module was sucessfully assigned to semester.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 3000
      });
      this.redirectTo('/pages/modules');
      // here, set the tab to Modules Offered
    },
    err => {
      if (err.status == 409) {
        console.log(err.error);
        this.requiredAlert = false;
        this.error = err.error;
        this.existAlert = true;
      }
      else if (err.status == 400 || err.status == 500) {
        this.existAlert = false;
        this.requiredAlert = true;
      }
    })
  }

  onClose() {
    this.existAlert = false;
    this.requiredAlert = false;
  }

  onCloseDetails() {
    this.detailsAlert = false;
  }

  editModuleOffering(id) {
    this.offeringService.getOffering(id)
    .subscribe(
      m => {
        this.setActiveSemester = false;
        this.setActiveAddModule = false;
        this.setActiveAddAssignModules = true;
        this.setModuleOffering(m);
      });
  }

  editModule(id) {
    this.moduleService.getModule(id)
    .subscribe(
      m => {
        this.setActiveAddAssignModules = false;
        this.setActiveSemester = false;
        this.setActiveAddModule = true;
        this.setModule(m);
      });
  }

  deleteModuleOffering(id) {
    if (confirm("Are you sure?")) {
      this.offeringService.delete(id)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success', 
            msg: 'Module was sucessfully removed from semester.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 3000
          });
          this.redirectTo('/pages/modules');
        });
    }
  }

  deleteModule(id) {
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

  selectOffering(id) {
    this.offeringService.getOffering(id)
      .subscribe(
        m => {
          this.moduleDetails = null;
          this.moduleOfferingDetails = m;
        },
        err => {
          if (err.status == 404) {
            this.redirectTo('/pages/modules');
            return; 
          }
        });
  }

  // selectModuleOffering(id) {
  //   this.offeringService.getModuleOffering(id)
  //     .subscribe(
  //       m => {
  //         this.moduleDetails = null;
  //         this.moduleOfferingDetails = m;
  //       },
  //       err => {
  //         if (err.status == 404) {
  //           this.redirectTo('/pages/modules');
  //           return; 
  //         }
  //       });
  // }

  selectModule(id) {
    this.moduleService.getModule(id)
      .subscribe(
        m => {
          this.detailsAlert = false;
          this.moduleOfferingDetails = null;
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

  onClickClose() {
    this.moduleOfferingDetails = null;
    this.moduleDetails = null;

  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
