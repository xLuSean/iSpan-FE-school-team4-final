import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import { useState } from 'react';
export default function CUIRadioButtons(props) {
  const ContainerFormStyle = props.ContainerFormStyle || {};
  const ButtonFormStyle = props.ButtonFormStyle || {};
  return (
    <>
      <FormControl sx={{ ...ContainerFormStyle }}>
        <FormLabel
          sx={{
            marginBottom: '30px',
            fontSize: '24px',
            fontWeight: '700',
            color: 'black',
          }}
        >
          {props.RadioButtonTitle}
        </FormLabel>
        <RadioGroup
          row
          name="row-radio-buttons-group"
          sx={{ ...ButtonFormStyle }}
          onChange={(e) => {
            const value = e.target.value;
            props.setDelivery(value);
          }}
        >
          {props.RadioButtonArray.map((v, i) => {
            return (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FormControlLabel
                      key={i}
                      value={v.value}
                      control={<Radio />}
                      label={v.label}
                    />
                    {v.src === '' ? (
                      v.Icon
                    ) : (
                      <img src={v.src} alt={v.alt} width={v.width}></img>
                    )}
                  </div>
                </Box>
              </>
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
}
