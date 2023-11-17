import { isValidElement } from 'react';
import { Typography, Stack, Box } from '@mui/material';
import CUICard from './cui-card';
import { styled } from '@mui/material/styles';
import CUIButton from './cui-button';

const labelNoIconStyle = {
  borderBottom: '3px solid lightgrey',
};

const labelWithIconStyle = {
  ...labelNoIconStyle,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const Item = styled(Box)(() => ({
  padding: '1.2rem 2rem',
}));

const Filter = ({ noButton = false, ...props }) => {
  const withIcon = isValidElement(props.filterIcon);
  const labelStyle = withIcon ? labelWithIconStyle : labelNoIconStyle;

  return (
    <CUICard
      sx={{
        height: 'fit-content',
        ...props.sx,
      }}
    >
      {typeof props.label === 'string' && (
        <Item sx={{ ...labelStyle, ...props.sxLabel }}>
          <Typography color={props.color} variant="h5">
            {props.label}
          </Typography>
          {withIcon && props.filterIcon}
        </Item>
      )}
      <Stack sx={props.sxBody}>
        {Array.isArray(props.items) &&
          props.items.map((item, index) => (
            <Item
              sx={{ borderBottom: '1px solid lightgrey' }}
              key={item.key || index}
            >
              {item}
            </Item>
          ))}
        {!noButton && (
          <Item sx={{ textAlign: 'center' }}>
            <CUIButton
              sx={{ width: '100%' }}
              color={props.color}
              variant="contained"
              onClick={props.onClick}
            >
              篩選
            </CUIButton>
          </Item>
        )}
      </Stack>
    </CUICard>
  );
};

export default Filter;
