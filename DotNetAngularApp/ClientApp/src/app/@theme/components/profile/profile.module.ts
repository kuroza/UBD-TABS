import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { ProfileComponent } from './profile.component';
import { ThemeModule } from '../../theme.module';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    FormsModule,
  ],
  declarations: [
    ProfileComponent,
  ],
})
export class ProfileModule { }
