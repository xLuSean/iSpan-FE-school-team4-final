import React from 'react';
import Button from '@mui/material/Button';
import createColorTheme from '@/libs/CreateColorTheme';
import styles from '@/styles/shoppingcart.module.css';
import Link from 'next/link';
import { useAuth } from '@/context/auth/useAuth';
import { toast } from 'react-hot-toast';

export default function CheckButton(props) {
  const WhiteTheme = createColorTheme('#FFF');
  const Deepgrey = createColorTheme('#707070');
  const { auth } = useAuth();
  const sendingEmail = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/cart/test`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    })
      .then((r) => r.json())
      .then((results) => {
        console.log(results);
      })
      .catch((error) => console.log(error));
  };

  const toastSendingEemail = () => {
    toast.success('已寄送訂單資訊至信箱');
  };
  return (
    <>
      <div className={styles.finishedButton}>
        <WhiteTheme>
          <Button
            className={`${styles.buttonContainer}`}
            sx={{
              flexWrap: 'nowrap',
              marginLeft: '10px',
              width: '100px',
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
        <Deepgrey>
          <Button
            className={`${styles.buttonContainer}`}
            sx={{
              marginLeft: '10px',
              width: '100px',
              ':hover': {
                opacity: '.7',
                bgcolor: 'var(--steel-grey)',
              },
              '@media screen and (max-width: 996px)': {
                width: '0',
              },
            }}
            variant="contained"
            onClick={() => {
              sendingEmail();
              toastSendingEemail();
            }}
          >
            寄送明細
          </Button>
        </Deepgrey>
      </div>
    </>
  );
}
