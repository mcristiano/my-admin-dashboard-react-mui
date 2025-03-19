import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const drawerWidth = 240; 

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
			
      <Sidebar open={sidebarOpen} />
			
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
					p: 0,
          marginLeft: sidebarOpen ? 0 : `-${drawerWidth}px`,
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        <Header onMenuClick={toggleSidebar} />
        <MainContent>{children}</MainContent>
				
      </Box>
    </Box>
  );
};

export default Layout;
