import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  providers: [AuthService],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule
  ]
})
export class AccountModule { }
