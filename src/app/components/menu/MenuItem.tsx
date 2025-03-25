import React from 'react';
import { ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuBadge from './MenuBadge';
import { MenuItem as MenuItemType } from './types';

interface MenuItemProps {
  item: MenuItemType;
  depth: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, depth }) => {
  const theme = useTheme();
  const { id, title, icon: Icon, badge, path = `/${item.id}` } = item;
  const paddingLeft = depth * 16 + (depth > 0 ? 24 : 0);

  console.log(`MenuItem ${title} props:`, { item, depth });

  return (
    <ListItem
      button
      component={NavLink}
      to={path}
      sx={{
        paddingLeft,
        '&.active': {
          backgroundColor: theme.palette.action.selected,
          '& .MuiTypography-root, & .MuiSvgIcon-root': {
            fontWeight: 'bold',
            color: theme.palette.primary.main,
          },
        },
      }}
    >
      {Icon && (
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      )}

      <ListItemText primary={title} />
      {badge && <MenuBadge count={badge} />}
    </ListItem>
  );
};

export default MenuItem;
