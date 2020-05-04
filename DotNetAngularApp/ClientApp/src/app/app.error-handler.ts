// import * as Sentry from "@sentry/browser";
import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone, isDevMode } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {

    constructor(
        private ngZone: NgZone,
        @Inject(ToastyService)  private toastyService: ToastyService) {}

    handleError(error: any): void {
        // if (!isDevMode()) // only in development mode
        //     Sentry.captureException(error.originalError || error);
        // else
        //     throw error; // otherwise rethrow exception

        this.ngZone.run(() => {
            this.toastyService.error({
                title: 'Error',
                msg: 'An unexpected error happened.',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        });
    }
}