import React from 'react';
    import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
    import MenuIcon from '@mui/icons-material/Menu';

    interface HeaderProps {
      onMenuClick: () => void;
    }

    const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
      return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              My App
            </Typography>
          </Toolbar>
        </AppBar>
      );
    };

    export default Header;
