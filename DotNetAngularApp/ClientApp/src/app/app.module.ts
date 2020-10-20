/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

// import { AuthService } from './services/auth.service';
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
import { BuildingService } from './services/building.service';
import { SemesterService } from './services/semester.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbEvaIconsModule,
    
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
  bootstrap: [AppComponent],
  providers: [
    BookingService,
    BuildingService,
    FacultyService,
    LecturerService,
    ModuleService,
    RoomService,
    SemesterService,
    TimeSlotService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ]
})
export class AppModule {
}
