import { ModuleService } from './../../../services/module.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'module-list',
  templateUrl: './module-list.component.html',
})
export class ModuleListComponent implements OnInit {
  modules: any;

  constructor(
    private moduleService: ModuleService,
  ) { }

  async ngOnInit() {
    // this.moduleService.getAllModules()
    //   .subscribe(modules => this.modules = modules);

    this.modules = await this.moduleService.getAllModules()
  }
}
