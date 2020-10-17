import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
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
  // * Account settings on sidebar
  {
    title: 'Account',
    icon: 'lock-outline',
    children: [
      {
        title: 'Profile',
        link: '/pages/account/profile',
      },
  //     {
  //       title: 'Request Password',
  //       link: '/pages/account/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/pages/account/reset-password',
  //     },
    ],
  // },
  // {
  //   title: 'Settings',
  //   icon: 'settings-outline',
  },
  {
    title: 'Admin',
    group: true,
  },
  {
    title: 'Bookings',
    icon: 'file-add-outline',
    children: [
      {
        title: 'Add new booking',
        link: '/pages/bookings/new',
      },
      {
        title: 'View all bookings',
        link: '/pages/bookings',
      },
    ],
  },
  {
    title: 'Calendar',
    icon: 'calendar-outline',
    children: [
      {
        title: 'View calendar',
        link: '/pages/home',
      },
    ],
  },
  {
    title: 'Rooms',
    icon: 'grid-outline',
    children: [
      {
        title: 'Add room',
        link: '/pages/rooms/new',
      },
      {
        title: 'Add building',
        link: '/pages/buildings/new',
      },
      {
        title: 'View all rooms and buildings',
        link: '/pages/rooms',
      },
    ],
  },
  {
    title: 'Lecturers',
    icon: 'people-outline',
    children: [
      {
        title: 'Add lecturer',
        link: '/pages/lecturers/new',
      },
      {
        title: 'View all lecturers',
        link: '/pages/lecturers',
      },
    ],
  },
  {
    title: 'Modules',
    icon: 'book-open-outline',
    children: [
      {
        title: 'Add module',
        link: '/pages/modules/new',
      },
      {
        title: 'View all modules',
        link: '/pages/modules',
      },
    ],
  },
  // {
  //   title: 'Staff',
  //   icon: 'people-outline',
  //   children: [
  //     {
  //       title: 'Add staff',
  //       link: '/',
  //     },
  //     {
  //       title: 'View all staffs',
  //       link: '/',
  //     },
  //   ],
  // },
  {
    title: 'Time slot',
    icon: 'clock-outline',
    children: [
      {
        title: 'Add time slot',
        link: '/pages/timeslots/new',
      },
      {
        title: 'View all time slots',
        link: '/pages/timeslots',
      },
    ],
  },
];
