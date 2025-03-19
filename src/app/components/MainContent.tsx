import React from 'react';
    import { Container, Box } from '@mui/material';

    const MainContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
      return (
        <Container maxWidth={false} sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Box>{children}</Box>
        </Container>
      );
    };

    export default MainContent;
