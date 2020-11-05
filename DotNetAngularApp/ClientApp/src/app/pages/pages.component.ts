// import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

import { MENU_ITEMS_ADMIN, MENU_ITEMS_USER } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu *ngIf="hasAccess" [items]="menu_admin" autoCollapse="true"></nb-menu>
      <nb-menu *ngIf="!hasAccess" [items]="menu_user" autoCollapse="true"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  
  hasAccess;

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.hasAccess = this.userService.hasAccess();
    }
  }

  menu_admin = MENU_ITEMS_ADMIN;
  menu_user = MENU_ITEMS_USER;
}
