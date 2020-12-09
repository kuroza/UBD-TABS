import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { ToastyService } from 'ng2-toasty';

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
  {
    title: 'Main',
    group: true,
  },
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Account',
    icon: 'lock-outline',
    children: [
      {
        title: 'Manage Profile',
        link: '/pages/account/profile',
        icon: 'person-outline',
      },
      {
        title: 'Log out',
        icon: 'log-out-outline'
      },
    ],
  },
  {
    title: 'Admin',
    group: true,
  },
  {
    title: 'Booking',
    icon: 'file-add-outline',
    link: '/pages/bookings/new',
    // children: [
    //   {
    //     title: 'Add new booking',
    //     link: '/pages/bookings/new',
    //   },
    //   {
    //     title: 'View all bookings',
    //     link: '/pages/bookings',
    //   },
    // ],
  },
  {
    title: 'Buildings and Rooms',
    icon: 'grid-outline',
    link: '/pages/rooms',
  },
  {
    title: 'Calendar',
    icon: 'calendar-outline',
    link: '/pages/calendar',
  },
  {
    title: 'Faculties and Majors',
    icon: 'grid',
    link: '/pages/faculties',
  },
  {
    title: 'Lecturers',
    icon: 'people-outline',
    link: '/pages/lecturers',
  },
  {
    title: 'Manage users',
    icon: 'person-add-outline',
    link: '/pages/users/manage',
  },
  {
    title: 'Modules and Semesters',
    icon: 'book-open-outline',
    link: '/pages/modules',
  },
  {
    title: 'Time slots',
    icon: 'clock-outline',
    link: '/pages/timeslots',
  },
];

export const MENU_ITEMS_USER: NbMenuItem[] = [
  {
    title: 'Main',
    group: true,
  },
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'Account',
    icon: 'lock-outline',
    children: [
      {
        title: 'Manage Profile',
        link: '/pages/account/profile',
        icon: 'person-outline',
      },
      {
        title: 'Log out',
        icon: 'log-out-outline'
      },
    ],
  },
  {
    title: 'Menu',
    group: true,
  },
  {
    title: 'Bookings',
    icon: 'file-add-outline',
    link: '/pages/bookings',
  },
  {
    title: 'Buildings and Rooms',
    icon: 'grid-outline',
    link: '/pages/rooms',
  },
  {
    title: 'Calendar',
    icon: 'calendar-outline',
    link: '/pages/calendar',
  },
  {
    title: 'Faculties and Majors',
    icon: 'grid',
    link: '/pages/faculties',
  },
  {
    title: 'Lecturers',
    icon: 'people-outline',
    link: '/pages/lecturers',
  },
  {
    title: 'Modules',
    icon: 'book-open-outline',
    link: '/pages/modules',
  },
  // {
  //   title: 'Time slots',
  //   icon: 'clock-outline',
  //   link: '/pages/timeslots',
  // },
];

class Pages implements OnInit {

  isAuthenticated = false;

  constructor(
    private menuService: NbMenuService,
    private toasty: ToastyService,
    private router: Router,
    ) {}

    ngOnInit() {
      if (localStorage.getItem('token') != null) {
        this.isAuthenticated = true;
      }

      this.menuService.onItemClick()
        .subscribe((event) => {
          if (event.item.title === 'Log out')
            this.onLogout();
        });
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
}