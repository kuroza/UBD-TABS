import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbInputModule, NbSelectModule, NbAlertModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModuleListComponent } from './module-list/module-list.component';

@NgModule({
    imports: [
      NbTooltipModule,
      NbIconModule,
      NbAlertModule,
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
    ],
  })
  export class ModulesModule { }