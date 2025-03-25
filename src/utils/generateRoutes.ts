import React from 'react';
import { Route } from 'react-router-dom';
import { MenuItem } from '@/base/components/menu/types';

export const generateRoutes = (menuItems: MenuItem[]): React.ReactNode[] => {
  const routes: React.ReactNode[] = [];

  const processMenuItems = (items: MenuItem[], parentPath: string = '') => {
    items.forEach((item) => {
      const routePath = `${parentPath}${item.route || ''}`;

      if (item.component) {
        routes.push(React.createElement(Route, {
          key: item.id,
          path: routePath,
          element: React.createElement(item.component),
        }));
      }

      if (item.items) {
        processMenuItems(item.items, routePath);
      }
    });
  };

  processMenuItems(menuItems);

  return routes;
};
