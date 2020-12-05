import { NbAlertModule, NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    NgMultiSelectDropDownModule,
    NbTooltipModule,
    NbIconModule,
    NbAlertModule,
    NbUserModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbRadioModule,
    ThemeModule,
    FormsModule,
  ],
  declarations: [
    UserProfileComponent,
    ManageUserComponent,
  ],
})
export class UsersModule {
}