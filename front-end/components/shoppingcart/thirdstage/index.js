import React from 'react';
import Box from '@mui/material/Box';
import styles from '@/styles/shoppingcart.module.css';
import ShoppingState from './shoppingstate';
import BuyerInfo from './buyerInfo';
import CheckButton from './checkbutton';
import {
  indexBackground,
  indexContainerFor3rdPage,
} from '@/styles/shoppingcart-style/recommandproduct';
export default function ThirdStage() {
  return (
    <>
      <Box sx={indexBackground}>
        <Box sx={indexContainerFor3rdPage}>
          <ShoppingState></ShoppingState>
          <BuyerInfo></BuyerInfo>
          <CheckButton></CheckButton>
        </Box>
      </Box>
    </>
  );
}
