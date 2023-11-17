import { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';

import createColorTheme from '@/libs/CreateColorTheme';
import { MAIN_RED, STEEL_GREY } from '@/assets/color-code';
const RedTheme = createColorTheme(STEEL_GREY);

const thumbsStyle = {
  marginBottom: 3,
  '& .MuiSlider-thumb': {
    '.MuiSlider-valueLabelOpen': {
      userSelect: 'none',
      ':before': {
        content: 'none',
      },
      transform: 'translateY(145%) translateX(0%) scale(1)',
    },
    ':last-child': {
      '.MuiSlider-valueLabelOpen': {
        transform: 'translateY(-95%) translateX(0%) scale(1)',
      },
    },
  },
};

const defaultValue = {
  min: 200,
  max: 2000,
  distance: 50,
};

export default function CUISlider(props) {
  if (props.value && !Array.isArray(props.value))
    throw 'CUISlider can only accept value with Array type';

  const thumbs = [0, 1].map((index) => {
    const which = index === 0 ? 'min' : 'max';

    return props.value && index in props.value
      ? props.value[index]
      : props[which] || defaultValue[which];
  });

  const [min, max, distance, firstThumb, secondThumb] = [
    props.min || thumbs[0],
    props.max || thumbs[1],
    props.distance || defaultValue.distance,
    ...thumbs,
  ].map((value) => parseInt(value));

  if (max <= min) throw 'max value cannot less than min value';
  if (max - min < distance) throw 'distance value too large';
  if (min > firstThumb) throw 'firstThumb value cannot less than min value';
  if (max < secondThumb) throw 'max value cannot less than secondThumb value';

  const [value, setValue] = useState([firstThumb, secondThumb]);

  const handleChange = (event, newValue, activeThumb) => {
    const newState = getNewValue(event, newValue, activeThumb);
    setValue(newState);
    typeof props.onChange === 'function' && props.onChange(newState);
  };

  const getNewValue = (event, newValue, activeThumb) => {
    if (newValue[1] - newValue[0] >= distance) {
      return newValue;
    }

    if (activeThumb === 0) {
      const clamped = Math.min(newValue[0], max - distance);
      return [clamped, clamped + distance];
    }

    const clamped = Math.max(newValue[1], distance + min);
    return [clamped - distance, clamped];
  };

  return (
    <RedTheme>
      <Box sx={{ width: '100%', paddingLeft: '1rem', paddingRight: '1rem' }}>
        <Typography
          color={props.color}
          variant="subtitle1"
          align="center"
          mb={4}
        >
          {props.label}
        </Typography>
        <Slider
          min={min}
          max={max}
          step={distance}
          color={props.color}
          name={props.name}
          value={value}
          sx={thumbsStyle}
          onChange={handleChange}
          valueLabelDisplay="on"
          disableSwap
        />
      </Box>
    </RedTheme>
  );
}
