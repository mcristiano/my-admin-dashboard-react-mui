import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React from 'react';

export interface MenuItem {
  id: string;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> &amp; {
    muiName: string;
  };
  badge?: number;
  items?: MenuItem[];
  onClick?: () => void; // Add onClick property
  route?: string; // Add route property
  component?: React.ComponentType; // Add component property
}

export interface MenuItemProps {
  item: MenuItem;
  level?: number;
}
