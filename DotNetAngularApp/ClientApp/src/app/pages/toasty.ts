import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable({
    providedIn: 'root'
})
export class Toasty {
    constructor(private toastyService: ToastyService) {}

    public successToasty(message: string) {
        this.toastyService.success({
          title: 'Success',
          msg: message,
          theme: 'bootstrap',
          showClose: true,
          timeout: 3000
        });
    }

    public defaultToasty(message: string) {
        this.toastyService.default({
          title: 'Success',
          msg: message,
          theme: 'bootstrap',
          showClose: true,
          timeout: 3000
        });
    }
}