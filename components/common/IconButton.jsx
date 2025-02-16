import React from 'react';
import { IconButton as MuiIconButton } from '@mui/material';

const IconButton = ({ children, onClick, color = 'default', ...rest }) => {
  return (
    <MuiIconButton color={color} onClick={onClick} {...rest}>
      {children}
    </MuiIconButton>
  );
};

export default IconButton;