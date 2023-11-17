import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import { Input } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Box } from '@mui/material';

const SUIDataBox = ({ title, result }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '80px',
        bgcolor: 'var(--steel-grey)',
        p: 1,
        borderRadius: '20px',
        display: 'flex',
        // justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '20%',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '30px',
          p: 2,
          m: 2,
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          width: '80%',
          height: '90%',
          bgcolor: 'var(--light-gray)',
          borderRadius: '20px',
          p: 2,
          paddingLeft: 5,
          marginLeft: 2,
          marginRight: 3,
          fontSize: '28px',
          display: 'flex',
          // justifyContent: 'end',
          // alignContent: 'center',
          alignItems: 'center',
        }}
      >
        {result}
      </Box>
    </Box>
  );
};

const SUIInputNumber = (props) => {
  const Csx = { width: '100%', m: 1 };

  return (
    <TextField
      id={props.id}
      label={props.label}
      type="number"
      variant="standard"
      sx={{ ...Csx, ...props.sx }}
    />
  );
};

const SUIInput99 = (props) => {
  return (
    <FormControl variant="standard" {...props}>
      <InputLabel htmlFor="component-simple" sx={{ fontSize: '20px' }}>
        {props.children}
      </InputLabel>
      <Input
        id="component-simple"
        // defaultValue="Composed TextField"
        type="number"
      />
    </FormControl>
  );
};

export { SUIInput99, SUIInputNumber, SUIDataBox };
