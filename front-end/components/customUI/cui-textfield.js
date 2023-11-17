import React, { useState } from 'react';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//TODO暫時沒改
export default function CUITextField(prop) {
  const [showPassword, setShowPassword] = useState(false);
  if (prop.type === 'password') {
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return (
      <FormControl variant="standard" fullWidth error={prop.error}>
        <InputLabel htmlFor={prop.name}>{prop.label}</InputLabel>
        <Input
          id={prop.name}
          name={prop.name}
          type={showPassword ? 'text' : 'password'}
          value={prop.value}
          required={prop.required}
          onChange={prop.onChange}
          onBlur={prop.onBlur}
          autoComplete={prop.autoComplete}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{prop.helperText || ' '}</FormHelperText>
      </FormControl>
    );
  }
  return (
    <TextField
      variant="standard"
      fullWidth
      {...prop}
      helperText={prop.helperText || ' '}
    />
  );
}
