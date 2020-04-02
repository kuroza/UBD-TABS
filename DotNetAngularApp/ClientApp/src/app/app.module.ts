import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ToastyModule } from 'ng2-toasty';
import { BookingService } from './services/booking.service';
import { CommonModule } from '@angular/common';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
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

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://c911f2c6b01742fd83e853133d6a4b06@sentry.io/5182636"
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    ToastyModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    NbEvaIconsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    BookingService, //for dependency injection in BookingService.ts
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ]
})
export class AppModule {
}
