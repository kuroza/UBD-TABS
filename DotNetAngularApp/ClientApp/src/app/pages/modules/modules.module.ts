import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbInputModule, NbSelectModule, NbAlertModule, NbIconModule, NbTooltipModule, NbListModule, NbDatepickerModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModuleListComponent } from './module-list/module-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
    imports: [
      NgMultiSelectDropDownModule,
      NbDatepickerModule,
      NbListModule,
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
      ReactiveFormsModule
    ],
    declarations: [
        ModuleListComponent,
    ],
  })
  export class ModulesModule { }