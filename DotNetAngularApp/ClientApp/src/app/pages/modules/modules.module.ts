import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewModuleComponent } from './view-module/view-module.component';
import { NewModuleComponent } from './new-module/new-module.component';
import { ModuleListComponent } from './module-list/module-list.component';

@NgModule({
    imports: [
      NbCardModule,
      NbTabsetModule,
      NbAccordionModule,
      NbButtonModule,
      NbInputModule,
      NbSelectModule,
      ThemeModule,
      FormsModule,
      RouterModule,
    ],
    declarations: [
        ModuleListComponent,
        NewModuleComponent,
        ViewModuleComponent,
    ],
  })
  export class ModulesModule { }