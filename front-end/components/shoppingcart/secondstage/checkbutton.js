import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import createColorTheme from '@/libs/CreateColorTheme';
import styles from '@/styles/shoppingcart.module.css';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { useAuth } from '@/context/auth/useAuth';
import { checkbutton } from '@/styles/shoppingcart-style/recommandproduct';
import { useRouter } from 'next/router';
export default function CheckButton(props) {
  // Neweb
  console.log(props);
  const buttonRef = useRef(null);
  const tradeInfoRef = useRef(null);
  const tradeShaRef = useRef(null);
  const merchantOrderNoRef = useRef(null);
  // Neweb
  const WhiteTheme = createColorTheme('#FFF');
  const RedTheme = createColorTheme('#FF0000');
  const { auth } = useAuth();
  const { name, phone, address, email, paymentMethod } = props.confirmInfo;
  const router = useRouter();
  const checkConfirm = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PORT}/OLdelivery`,
      {
        method: 'POST',
        body: JSON.stringify({
          ...props.confirmInfo,
          paymentMethod,
          deliveryMethod: parseInt(props.delivery),
        }),
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          'Content-type': 'application/json',
        },
      }
    );
    const data = res.json();
    router.push('/shoppingcart/thirdstage');
  };

  const testnewebpay = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/cart/newebpayInfo`, {
      method: 'POST',
      body: JSON.stringify({
        ...props.confirmInfo,
        paymentMethod,
        deliveryMethod: parseInt(props.delivery),
      }),
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
        'Content-type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((results) => {
        tradeInfoRef.current.value = results.data.TradeInfo;
        tradeShaRef.current.value = results.data.TradeSha;
        merchantOrderNoRef.current.value = results.data.MerchantOrderNo;
        buttonRef.current.click();
      });
  };
  return (
    <>
      <Box sx={checkbutton}>
        {/* 產品總計欄位 */}
        <div>
          <div className={styles.countContainer}>
            {/* button 以外的元件 */}
            <div className={`${styles.countComponentWithoutButton}`}>
              <div className={`${styles.countComponent}`}>總計：</div>
              <div className={`${styles.countComponentForQuantity}`}>
                {props.finalQuantity}
              </div>
              <div className={`${styles.countComponentForNumber}`}>
                {props.finalPrice}
              </div>
            </div>
            {/* 只包含button的元件 */}
            <div className={`${styles.countButtonComponent}`}>
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
                      <Link href="/shoppingcart" sx={{ width: '100%' }}>
                        上一步
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
                      onClick={() => {
                        // checkConfirm();
                        props.delivery === '4'
                          ? testnewebpay()
                          : checkConfirm();
                      }}
                      disabled={
                        props.delivery === '' ||
                        name === '' ||
                        phone === '' ||
                        address === '' ||
                        email === '' ||
                        paymentMethod === '' //paymentMethod是宅配方式!!!
                      }
                    >
                      送出訂單
                    </Button>
                  </RedTheme>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </Box>

      <div>
        <form
          name="Newebpay"
          action="https://ccore.newebpay.com/MPG/mpg_gateway"
          method="POST"
        >
          <input type="hidden" name="MerchantID" value="MS17361556" />
          <input type="hidden" name="TradeInfo" ref={tradeInfoRef} />
          <input type="hidden" name="TradeSha" ref={tradeShaRef} />
          <input type="hidden" name="Version" value="2.0" />
          <input
            type="hidden"
            name="MerchantOrderNo"
            ref={merchantOrderNoRef}
          />
          <button
            ref={buttonRef}
            type="submit"
            style={{ display: 'none' }}
          ></button>
        </form>
      </div>
    </>
  );
}
