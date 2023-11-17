import Paper from '@mui/material/Paper';

export default function CUICard({ children, ...props }) {
  return (
    <Paper elevation={4} {...props}>
      {children}
    </Paper>
  );
}
