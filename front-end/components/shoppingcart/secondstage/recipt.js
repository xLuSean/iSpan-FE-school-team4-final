import React from 'react';
import styles from '@/styles/shoppingcart.module.css';

export default function Recipt() {
  return (
    <>
      {/* 發票 */}
      <div className={styles.PaymentMethodContainer}>
        <div className={styles.PaymentMethodTitle}>請選擇發票</div>
        <div className={styles.PaymentMethodComponent}>
          <div className={styles.PaymentMethod}>捐贈</div>
          <div className={styles.PaymentMethod}>公司</div>
          <div className={styles.PaymentMethod}>雲端發票</div>
          <div className={styles.PaymentMethod}>隨貨寄送</div>
          <div className={styles.PaymentMethodBlank}></div>
        </div>
      </div>
    </>
  );
}
