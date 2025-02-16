import React from 'react';
import { TextField } from '@mui/material';

const Input = ({ label, name, value, onChange, type = 'text', ...rest }) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      variant="outlined"
      {...rest}
    />
  );
};

export default Input;