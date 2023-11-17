import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Box from '@mui/material/Box';

import CUIRadioButtons from '@/components/customUI/cui-radiobutton';
import { useEffect } from 'react';
import Delivery from './delivery';
export default function Payment(props) {
  const ContainerFormStyle = {
    width: '100%',
    margin: 'auto',
    padding: '20px 0',
  };
  const ButtonFormStyle = {
    margin: 'auto',
    width: '100%',
    justifyContent: 'space-between',
  };
  const RadioButtonTitle = '付款方式';
  const RadioButtonArray = [
    {
      label: 'LinePay',
      value: 2,
      src: '/shoppingcart/LINE-Pay(v)_W61_n.png',
      Icon: '',
      alt: '無法顯示圖片',
      width: '',
      overFlow: 'hidden',
    },
    {
      label: '藍新金流',
      value: 4,
      src: '/shoppingcart/creditcard.png',
      Icon: null,
      alt: '無法顯示圖片',
      width: '100px',
    },
    {
      label: '貨到付款',
      value: 5,
      src: '',
      Icon: (
        <LocalShippingIcon
          sx={{
            fontSize: '70px',
          }}
        ></LocalShippingIcon>
      ),
      alt: '無法顯示圖片',
    },
    {
      label: 'ATM轉帳',
      value: 1,
      src: '',
      Icon: (
        <LocalAtmIcon
          sx={{
            fontSize: '70px',
          }}
        ></LocalAtmIcon>
      ),
      alt: '無法顯示圖片',
    },
  ];
 
  return (
    <>
      {/* 付款方式 */}
      <Box sx={{ padding: '50px 0' }}>
        <CUIRadioButtons
          ContainerFormStyle={ContainerFormStyle}
          ButtonFormStyle={ButtonFormStyle}
          RadioButtonArray={RadioButtonArray}
          RadioButtonTitle={RadioButtonTitle}
          setDelivery={props.setDelivery}
          delivery={props.delivery}
        ></CUIRadioButtons>
      </Box>
    </>
  );
}
