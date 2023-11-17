import React from 'react';
import styles from '@/styles/product.module.css';

export default function CuiImgsmap({ productData }) {
  return (
    <>
      {productData.sid && (
        <div className={`${styles['flexrow']}`}>
          <img
            className={`${styles['productimgs']}`}
            src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/product/${
              productData.picture.split(',')[0]
            }`}
          />
        </div>
      )}
    </>
  );
}
