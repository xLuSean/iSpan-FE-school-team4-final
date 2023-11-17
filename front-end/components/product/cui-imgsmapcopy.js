import React from 'react';
import styles from '@/styles/product.module.css';

export default function CuiImgsmap() {
  let arr = [
    'st0010102.jpg',
    'st0010102.jpg',
    'st0010102.jpg',
    'st0010102.jpg',
  ];
  return (
    <>
      <div className={`${styles['flexrow']}`}>
        <div className={`${styles['sidImg']}`}>
          {arr.map((v) => (
            <img key={v} src={`http://localhost:3000/p-imgs/${v}`} />
          ))}
        </div>
        <img
          className={`${styles['productimgs']}`}
          src="http://localhost:3000/p-imgs/st0010102.jpg"
        />
      </div>
    </>
  );
}
