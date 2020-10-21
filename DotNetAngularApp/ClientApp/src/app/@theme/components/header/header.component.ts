import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  name: string;
  isAuthenticated: boolean;
  subscription: Subscription;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ 
    { title: 'Profile', link: '/pages/account/profile' }, 
    { title: 'Reset password', link: '/pages/account/reset-password' }, 
    { title: 'Settings', link: '/pages/account/settings' }
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private breakpointService: NbMediaBreakpointsService,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.subscription = this.authService.authNavStatus$
      .subscribe(status => this.isAuthenticated = status);
    this.name = this.authService.name;    
  }

  ngAfterViewInit() {
    console.log("Name: " + this.name);
    console.log("isAuthenticated: " + this.isAuthenticated);
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  async signout() {
    await this.authService.signout();     
  }

  login() {
    this.authService.login();
  }

  register() {
    this.router.navigate(['/pages/register']);
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
