import React from 'react';
import styles from '@/styles/shoppingcart.module.css';

export default function ItemListTitle() {
  return (
    <>
      <div className={`${styles.ItemListTitle}`}>產品列表</div>
      {/* 商品列表title */}
      <div className={`${styles.ProductConFirmTitleContainer}`}>
        <div className={`${styles.ProductConFirmTitleComponent1}`}>
          商品資訊
        </div>
        <div className={`${styles.ProductConFirmTitleComponent2}`}>
          產品名稱
        </div>
        <div className={`${styles.ProductConFirmTitleComponent1}`}>單價</div>
        <div className={`${styles.ProductConFirmTitleComponent1}`}>數量</div>
        <div className={`${styles.ProductConFirmTitleComponent1}`}>小計</div>
      </div>
    </>
  );
}
