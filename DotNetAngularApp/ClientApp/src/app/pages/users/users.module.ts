import { NbCardModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    FormsModule,
  ],
  declarations: [
    UserProfileComponent
  ],
})
export class UsersModule {
}