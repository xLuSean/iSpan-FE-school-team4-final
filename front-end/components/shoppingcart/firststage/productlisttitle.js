import React from 'react';
import styles from '@/styles/shoppingcart.module.css';
export default function ProductListTitle() {
  return (
    <div>
      <div className={`${styles.ProductionTitleContainer}`}>
        <div className={`${styles.ProductionTitleComponentOrderAndDelete}`}>
          序號
        </div>
        <div className={`${styles.ProductionTitleComponentInfo}`}>商品資訊</div>
        <div className={`${styles.ProductionTitleComponent} `}>單價</div>
        <div className={`${styles.ProductionTitleComponent}`}>數量</div>
        <div
          className={`${styles.ProductionTitleComponent}  ${styles.productListTitleWords576}`}
        >
          小計
        </div>
        <div
          className={`${styles.ProductionTitleComponentOrderAndDelete} ${styles.productListTitle996}`}
        >
          刪除
        </div>
      </div>
    </div>
  );
}
