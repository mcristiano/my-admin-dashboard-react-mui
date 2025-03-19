import React from 'react';
    import { Badge, useTheme } from '@mui/material';

    interface MenuBadgeProps {
      count: number;
    }

    const MenuBadge: React.FC<MenuBadgeProps> = ({ count }) => {
      const theme = useTheme();

      return (
        <Badge
          badgeContent={count}
          sx={{
            '& .MuiBadge-badge': {
              color: theme.palette.primary.contrastText,
              backgroundColor: theme.palette.primary.main,
            },
          }}
        />
      );
    };

    export default MenuBadge;
