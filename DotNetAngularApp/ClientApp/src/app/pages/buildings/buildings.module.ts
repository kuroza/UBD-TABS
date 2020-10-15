import { NbCardModule, NbTabsetModule, NbAccordionModule, NbButtonModule, NbSelectModule, NbInputModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewBuildingComponent } from './view-building/view-building.component';
import { NewBuildingComponent } from './new-building/new-building.component';
import { BuildingListComponent } from './building-list/building-list.component';

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
        BuildingListComponent,
        NewBuildingComponent,
        ViewBuildingComponent,
    ],
  })
  export class BuildingsModule { }