import React, { useState } from 'react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Box,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { MenuItemProps } from './types';
import MenuBadge from './MenuBadge';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const MenuItem: React.FC<MenuItemProps> = ({ item, level = 0 }) => {
  const [open, setOpen] = useState(false);
  const hasSubItems = item.items &amp;&amp; item.items.length > 0;
  const IconComponent = item.icon;
  const navigate = useNavigate(); // Use useNavigate here


  const handleClick = () => {
    if (hasSubItems) {
      setOpen(!open);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          pl: level * 3 + 2,
          '&amp;:hover': {
            backgroundColor: 'action.hover',
          },
          cursor: 'pointer', // Add the pointer cursor here
        }}
      >
        <ListItemIcon>
          <IconComponent />
        </ListItemIcon>
        <ListItemText primary={item.title} />
        {item.badge &amp;&amp; (
          <Box ml={1}>
            <MenuBadge value={item.badge} />
          </Box>
        )}
        {hasSubItems &amp;&amp; (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {hasSubItems &amp;&amp; (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.items.map((subItem) => (
              <MenuItem key={subItem.id} item={subItem} level={level + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default MenuItem;
