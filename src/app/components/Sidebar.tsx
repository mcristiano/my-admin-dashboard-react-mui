import React from 'react';
import { Drawer, List, Divider, useTheme, Toolbar } from '@mui/material';
import MenuItemComponent from './menu/MenuItem';
import getMenuItems from '@/config/menuConfig';

interface SidebarProps {
  open: boolean;
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const theme = useTheme();
  const menuItems = getMenuItems();

  const renderMenuItems = (items: any[], depth = 0) => {
    console.log(`renderMenuItems called with items:`, items, `and depth:`, depth);
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <MenuItemComponent item={item} depth={depth} />
        {item.items && (
          <>
            <Divider />
            <List component="div" disablePadding>
              {renderMenuItems(item.items, depth + 1)}
            </List>
            <Divider />
          </>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={(theme) => ({
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.default,
        },
      })}
    >
      <Toolbar />
      <List>{renderMenuItems(menuItems)}</List>
    </Drawer>
  );
};

export default Sidebar;
