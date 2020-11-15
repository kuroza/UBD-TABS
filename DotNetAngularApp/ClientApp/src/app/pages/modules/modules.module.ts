import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbInputModule, NbSelectModule, NbAlertModule, NbIconModule, NbDialogModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModuleListComponent } from './module-list/module-list.component';

@NgModule({
    imports: [
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
      NbDialogModule.forChild(),
    ],
    declarations: [
        ModuleListComponent,
    ],
  })
  export class ModulesModule { }