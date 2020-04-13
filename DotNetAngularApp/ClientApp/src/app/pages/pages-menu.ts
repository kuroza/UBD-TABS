import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Main',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  // * Account settings on sidebar
  // {
  //   title: 'User',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Profile',
  //       link: '/auth/profile',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
  // {
  //   title: 'Settings',
  //   icon: 'settings-outline',
  // },
  {
    title: 'Admin',
    group: true,
  },
  {
    title: 'Bookings',
    icon: 'calendar-outline',
    children: [
      {
        title: 'Add new booking',
        link: '/pages/bookings/new',
      },
      {
        title: 'View all bookings',
        link: '/pages/bookings',
      },
      {
        title: 'View calendar',
        link: '/pages/dashboard',
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
        title: 'View all rooms',
        link: '/pages/rooms',
      },
    ],
  },
  {
    title: 'Staff',
    icon: 'people-outline',
    children: [
      {
        title: 'Add staff',
        link: '/',
      },
      {
        title: 'View all staffs',
        link: '/',
      },
    ],
  },
  {
    title: 'Time slot',
    icon: 'clock-outline',
    children: [
      {
        title: 'Edit time slot',
        link: '/',
      },
    ],
  },
];
