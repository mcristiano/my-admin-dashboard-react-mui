import React from 'react';
import { Typography, Paper } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the dashboard! This is a placeholder for your dashboard content.
      </Typography>
    </Paper>
  );
};

export default Dashboard;
