import React from 'react';
import { Typography, Box } from '@mui/material';

const PageHeader = ({ title, children }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default PageHeader;