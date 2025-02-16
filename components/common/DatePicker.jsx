import React from 'react';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker as MuiDatePicker } from '@mui/x-date-pickers';

const DatePicker = ({ label, name, value, onChange, ...rest }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} fullWidth />}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;