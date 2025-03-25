import React from 'react';
    import { Typography, Paper } from '@mui/material';
    import { useLocation } from 'react-router-dom';

    const NotFound: React.FC = () => {
      const location = useLocation();

      return (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            404 - Not Found
          </Typography>
          <Typography variant="body1">
            The page you requested, <code>{location.pathname}</code>, could not be found.
          </Typography>
        </Paper>
      );
    };

    export default NotFound;
