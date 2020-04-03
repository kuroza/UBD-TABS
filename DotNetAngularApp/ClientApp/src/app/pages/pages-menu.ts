import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Main',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'User',
    icon: 'lock',
    children: [
      {
        title: 'Profile',
        link: '/auth/profile',
      },
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  {
    title: 'Settings',
    icon: 'settings',
  },
  {
    title: 'Admin',
    group: true,
  },
  {
    title: 'Calendar',
    icon: 'calendar',
    children: [
      {
        title: 'View calendar',
        link: '/pages/dashboard',
      },
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
    title: 'Rooms',
    icon: 'grid',
    children: [
      {
        title: 'Add room',
        link: '/pages/rooms',
      },
      {
        title: 'View all rooms',
        link: '/pages/rooms',
      },
      {
        title: 'Edit room details',
        link: '/pages/rooms',
      },
    ],
  },
  {
    title: 'Staff',
    icon: 'people',
    children: [
      {
        title: 'Add staff',
        link: '/',
      },
      {
        title: 'View all staffs',
        link: '/',
      },
      {
        title: 'Edit staff details',
        link: '/',
      },
    ],
  },
  {
    title: 'Time slot',
    icon: 'clock',
    children: [
      {
        title: 'Edit time slot',
        link: '/',
      },
    ],
  },
];
