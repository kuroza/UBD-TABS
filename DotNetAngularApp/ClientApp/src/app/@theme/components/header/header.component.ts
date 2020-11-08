import { ToastyService } from 'ng2-toasty';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  userDetails;

  userMenu = [ 
    { title: 'Account', link: '/pages/account/profile', icon: 'lock-outline' }, 
    { title: 'Log out', icon: 'log-out-outline' },
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private toasty: ToastyService,
    private router: Router,
    private userService: UserService
    ) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.isAuthenticated = true;
      this.userService.getUserProfile()
        .subscribe(
          res => {
            this.userDetails = res;
          },
          err => {
            console.log(err);
          });
    }

    this.menuService.onItemClick()
      .subscribe((event) => {
        if (event.item.title === 'Log out')
          this.onLogout();
      });
  }

  ngOnDestroy() {
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

  onLogout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.router.navigate(['/account/login']);
    this.toasty.info({
      title: 'Logout successful', 
      msg: 'User successfully logged out!',
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  onLogin() {
    this.redirectTo('/account/login');
  }

  onRegister() {
    this.redirectTo('/account/register');
  }

  onClickCalendar() {
    this.redirectTo('/pages/calendar');
  }

  onClickAdd() {
    this.redirectTo('/pages/bookings/new');
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
