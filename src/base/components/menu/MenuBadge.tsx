import React from 'react';
import { Box } from '@mui/material';

interface MenuBadgeProps {
  value: number;
}

const MenuBadge: React.FC<MenuBadgeProps> = ({ value }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        borderRadius: '12px',
        padding: '0 8px',
        fontSize: '0.75rem',
        height: '20px',
        minWidth: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {value}
    </Box>
  );
};

export default MenuBadge;
