import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem } from '@mui/material';

const Select = ({ label, name, value, onChange, options, ...rest }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${name}-label`}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;