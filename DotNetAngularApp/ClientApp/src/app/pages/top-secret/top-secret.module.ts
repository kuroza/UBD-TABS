import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';

import { TopSecretService }  from '../top-secret/top-secret.service';
import { SharedModule } from '../../shared/shared.module';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [IndexComponent],
  providers: [ TopSecretService],
  imports: [
    CommonModule,
    SharedModule,
    NbCardModule,
  ]
})
export class TopSecretModule { }
