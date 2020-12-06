/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'ngx-app',
  template: `
    <ng2-toasty [position]="'bottom-right'"></ng2-toasty>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
  }
}
