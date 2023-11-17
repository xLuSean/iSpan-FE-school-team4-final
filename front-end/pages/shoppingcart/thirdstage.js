import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ThirdStage from '@/components/shoppingcart/thirdstage';
import {
  popup,
  MainIconClosed,
  MainIconOpened,
} from '@/styles/shoppingcart-style/popup';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

export default function Thirdstage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ThirdStage>
        {/* <Button
          sx={popup}
          onClick={() => {
            const newisOpen = !isOpen;
            setIsOpen(newisOpen);
          }}
        >
          {isOpen ? (
            <AddCircleIcon sx={MainIconOpened} />
          ) : (
            <AddCircleIcon sx={MainIconClosed} />
          )}
        </Button> */}
      </ThirdStage>
    </>
  );
}
