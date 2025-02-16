import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const RadioButton = ({ label, name, value, onChange, options, ...rest }) => {
  return (
    <FormControl>
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={`${name}-label`}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButton;