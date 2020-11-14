/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TimeSlotService } from './services/timeSlot.service';
import { RoomService } from './services/room.service';
import { ModuleService } from './services/module.service';
import { LecturerService } from './services/lecturer.service';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ToastyModule } from 'ng2-toasty';
import { BookingService } from './services/booking.service';
import { FacultyService } from './services/faculty.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AppErrorHandler } from './app.error-handler';
import { BuildingService } from './services/building.service';
import { SemesterService } from './services/semester.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginComponent } from './account/login/login.component';
import { RegistrationComponent } from './account/registration/registration.component';
import { AccountComponent } from './account/account.component';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    RegistrationComponent,
    LoginComponent,
  ],
  imports: [
    NgxPrintModule,
    NbLayoutModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbEvaIconsModule,
    ShowHidePasswordModule,
    NgxSpinnerModule,
    
    ToastyModule.forRoot(),
    ThemeModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
  ],
  bootstrap: [ AppComponent ],
  providers: [
    BookingService,
    BuildingService,
    FacultyService,
    LecturerService,
    ModuleService,
    RoomService,
    SemesterService,
    TimeSlotService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ]
})
export class AppModule {
}
