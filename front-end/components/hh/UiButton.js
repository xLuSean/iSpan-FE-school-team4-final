import { ToggleButton } from '@mui/material';

const UiButton = (props) => (
  <ToggleButton
    size="large"
    {...props}
    sx={{
      bgcolor: '#eee',
      color: 'var(--main-black)',
      borderTopLeftRadius: '3px !important',
      borderTopRightRadius: '3px !important',
      borderBottomRightRadius: '3px !important',
      borderBottomLeftRadius: '3px !important',
      paddingBlock: '.5rem',
      paddingInline: '1.5rem',
      fontWeight: 'bold',
      marginRight: '1rem',
      ':hover': {
        transition: '.2s',
        bgcolor: '#bbb',
      },
      '&.Mui-selected': {
        bgcolor: 'var(--steel-grey)',
        color: 'white',
      },
      '&.Mui-selected:hover': {
        bgcolor: 'var(--steel-grey)',
        filter: 'brightness(90%)',
      },

      ...props.sx,
    }}
  >
    {props.children}
  </ToggleButton>
);

export default UiButton;
