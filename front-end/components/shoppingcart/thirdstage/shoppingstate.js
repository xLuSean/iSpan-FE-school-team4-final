import React from 'react';
import styles from '@/styles/shoppingcart.module.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import EastIcon from '@mui/icons-material/East';
export default function ShoppingState() {
  return (
    <div>
      <div className={`${styles.shoppingStateContainer}`}>
        <div className={`${styles.shoppingStateComponent}`}>
          <CheckCircleIcon className={styles.ShoppingState414} />
          訂單確認
        </div>
        <EastIcon className={styles.ShoppingState576} />
        <div
          className={`${styles.shoppingStateComponent} ${styles.ShoppingState576}`}
        >
          <CheckCircleIcon />
          買家資訊
        </div>
        <EastIcon className={styles.ShoppingState576} />
        <div
          className={`${styles.shoppingStateComponent} ${styles.ShoppingState576}`}
        >
          <CheckCircleIcon />
          訂單明細
        </div>
      </div>
    </div>
  );
}
