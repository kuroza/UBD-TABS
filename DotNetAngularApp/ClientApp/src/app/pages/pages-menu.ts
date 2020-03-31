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
  {
    title: 'Profile',
    icon: 'lock-outline',
    children: [
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
    title: 'Calendar',
    icon: 'calendar-outline',
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
    icon: 'grid-outline',
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
      {
        title: 'Edit staff details',
        link: '/',
      },
    ],
  },
  {
    title: 'Manage',
    icon: 'edit-outline',
    children: [
      {
        title: 'Course',
        link: '/',
      },
      {
        title: 'Faculty',
        link: '/',
      },
      {
        title: 'Time slot',
        link: '/',
      },
    ],
  },
  {
    title: 'Settings',
    icon: 'settings-outline',
  },
];
