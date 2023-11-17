import { TextField, MenuItem } from '@mui/material';

export default function CUISelect(props) {
  return (
    <TextField
      variant="standard"
      sx={{ width: '100%', ...props.sx }}
      select
      SelectProps={props.SelectProps}
      value={props.value}
      name={props.name}
      color={props.color}
      label={props.label}
      defaultValue={props.defaultValue || ''}
      helperText={props.helperText}
      onChange={props.onChange}
    >
      {props.options?.map((option, index) => {
        return typeof option === 'string' || option instanceof String ? (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ) : (
          <MenuItem
            key={option.key || index}
            value={option.value || option.label || ''}
          >
            {option.label || option.value || ''}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
