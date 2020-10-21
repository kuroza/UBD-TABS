/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ToastyModule } from 'ng2-toasty';
import { BookingService } from './services/booking.service';
import { FacultyService } from './services/faculty.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AppErrorHandler } from './app.error-handler';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ToastyModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,

    ThemeModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),

    CoreModule.forRoot(),
    NbEvaIconsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    AuthGuard,
    BookingService,
    FacultyService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ]
})
export class AppModule {
}
