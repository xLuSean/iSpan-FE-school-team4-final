import React from 'react';
import styles from '@/styles/shoppingcart.module.css';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { toast } from 'react-hot-toast';

export default function Delivery(props) {
  const [deliveryMethod, setDeliveryMethod] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/OLdeliveryMethod`, {
      method: 'GET',
    })
      .then((r) => r.json())
      .then((results) => {
        return setDeliveryMethod(results.data);
      });
  }, []);
  const toastDelivery1 = () => {
    toast.success('已選取超商取貨');
  };
  const toastDelivery2 = () => {
    toast.success('已選取宅配到家');
  };
  const toastDelivery3 = () => {
    toast.success('已選取來店取貨');
  };

  return (
    <div className={`${styles.deliveryContainer}`}>
      <div className={`${styles.deliveryTitle}`}>宅配方式</div>
      <div className={`${styles.deliveryContent}`}>
        <Box sx={{ width: '100%' }}>
          <BottomNavigation
            showLabels
            value={props.value}
            onChange={(event, newValue) => {
              const target = newValue;
              props.setValue(target);
              props.setConfirmInfo((prev) => {
                return { ...prev, paymentMethod: target };
              });
            }}
          >
            {deliveryMethod.map((v, i) => {
              return (
                <BottomNavigationAction
                  key={v.sid}
                  label={v.method}
                  icon={
                    v.sid === 1 ? (
                      <LocalConvenienceStoreIcon
                        sx={{ fontSize: '50px' }}
                        onClick={toastDelivery1}
                      />
                    ) : v.sid === 2 ? (
                      <LocalShippingIcon
                        sx={{ fontSize: '50px' }}
                        onClick={toastDelivery2}
                      />
                    ) : (
                      <DirectionsCarIcon
                        sx={{ fontSize: '50px' }}
                        onClick={toastDelivery3}
                      />
                    )
                  }
                  sx={{
                    padding: '0',
                    margin: '30px',
                  }}
                />
              );
            })}
          </BottomNavigation>
        </Box>
      </div>
    </div>
  );
}
