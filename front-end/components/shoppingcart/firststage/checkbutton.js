import React from 'react';
import Button from '@mui/material/Button';
import createColorTheme from '@/libs/CreateColorTheme';
import styles from '@/styles/shoppingcart.module.css';
import Link from 'next/link';
import { useAuth } from '@/context/auth/useAuth';
import { checkbutton } from '@/styles/shoppingcart-style/recommandproduct';
import Box from '@mui/material/Box';

export default function CheckButton(props) {
  const WhiteTheme = createColorTheme('#FFF');
  const RedTheme = createColorTheme('#FF0000');
  const { auth } = useAuth();
  const checkConfirm = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/cart/SCconfirm`, {
      method: 'POST',
      body: {},
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    })
      .then((r) => r.json)
      .then((result) => result);
  };
  return (
    <>
      {/* 結帳按鈕 */}
      <Box sx={checkbutton}>
        <div className={`${styles.checkButtonContainer}`}>
          <WhiteTheme>
            <Button
              className={`${styles.buttonContainer}`}
              sx={{
                flexWrap: 'nowrap',
                marginLeft: '10px',
                width: '200px',
                ':hover': {
                  opacity: '.7',
                  bgcolor: 'var(--light-gray2)',
                },
                '@media screen and (max-width: 996px)': {
                  width: '0',
                },
              }}
              variant="contained"
              onClick={props.onClick}
            >
              <Link href="/" sx={{ width: '100%' }}>
                返回首頁
              </Link>
            </Button>
          </WhiteTheme>
          <RedTheme>
            <Button
              className={`${styles.buttonContainer}`}
              sx={{
                marginLeft: '10px',
                width: '200px',
                ':hover': {
                  opacity: '.7',
                  bgcolor: 'var(--main-red)',
                },
                '@media screen and (max-width: 996px)': {
                  width: '0',
                },
              }}
              variant="contained"
              onClick={checkConfirm}
              disabled={!props.cartItems ? false : true}
            >
              <Link href="/shoppingcart/secondstage">送出訂單</Link>
            </Button>
          </RedTheme>
        </div>
      </Box>
    </>
  );
}
