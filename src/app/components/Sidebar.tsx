import React from 'react';
    import { Drawer, List, Divider, useTheme } from '@mui/material';
    import { menuItems } from './menu/menuItems';
    import MenuItem from './menu/MenuItem';

    interface SidebarProps {
      open: boolean;
    }

    const drawerWidth = 240;

    const Sidebar: React.FC<SidebarProps> = ({ open }) => {
      const theme = useTheme();

      const renderMenuItems = (items: typeof menuItems, depth = 0) => {
        return items.map((item) => (
          <React.Fragment key={item.id}>
            <MenuItem item={item} depth={depth} />
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
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          <Toolbar />
          <List>{renderMenuItems(menuItems)}</List>
        </Drawer>
      );
    };

    export default Sidebar;
