import { Paper } from '@mui/material';

export default function ShowColor() {
  return (
    <>
      <Paper
        sx={{ width: '100px', height: '100px', bgcolor: '#E0E3E7' }}
      ></Paper>
      <Paper
        sx={{ width: '100px', height: '100px', bgcolor: '#B2BAC2' }}
      ></Paper>
      <Paper
        sx={{ width: '100px', height: '100px', bgcolor: '#6F7E8C' }}
      ></Paper>
    </>
  );
}
