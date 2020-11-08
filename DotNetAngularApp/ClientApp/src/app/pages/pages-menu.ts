import { NbMenuItem } from '@nebular/theme';

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
    link: '/pages/account/profile'
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
    title: 'Modules',
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
    link: '/pages/account/profile',
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
    title: 'Lecturers',
    icon: 'people-outline',
    link: '/pages/lecturers',
  },
  {
    title: 'Modules',
    icon: 'book-open-outline',
    link: '/pages/modules',
  },
  {
    title: 'Time slots',
    icon: 'clock-outline',
    link: '/pages/timeslots',
  },
];
