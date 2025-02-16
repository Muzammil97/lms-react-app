import React from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

const Checkbox = ({ label, name, checked, onChange, ...rest }) => {
  return (
    <FormControlLabel
      control={<MuiCheckbox checked={checked} onChange={onChange} name={name} />}
      label={label}
      {...rest}
    />
  );
};

export default Checkbox;