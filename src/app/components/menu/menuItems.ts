import {
      Dashboard,
      Person,
      Assessment,
      Settings,
      People,
      Business,
      Assignment,
      Notifications,
      Mail,
    } from '@mui/icons-material';
    import { MenuItem } from './types';

    export const menuItems: MenuItem[] = [
      {
        id: 'dashboard',
        title: 'Dashboard',
        icon: Dashboard,
        badge: 3,
      },
      {
        id: 'users',
        title: 'Users',
        icon: Person,
        items: [
          {
            id: 'user-list',
            title: 'User List',
            icon: People,
            badge: 12,
          },
          {
            id: 'companies',
            title: 'Companies',
            icon: Business,
            badge: 4,
          },
        ],
      },
      {
        id: 'reports',
        title: 'Reports',
        icon: Assessment,
        items: [
          {
            id: 'daily-reports',
            title: 'Daily Reports',
            icon: Assignment,
            badge: 2,
          },
          {
            id: 'monthly-reports',
            title: 'Monthly Reports',
            icon: Assignment,
          },
        ],
      },
      {
        id: 'notifications',
        title: 'Notifications',
        icon: Notifications,
        badge: 5,
      },
      {
        id: 'messages',
        title: 'Messages',
        icon: Mail,
        badge: 3,
      },
      {
        id: 'settings',
        title: 'Settings',
        icon: Settings,
      },
    ];
