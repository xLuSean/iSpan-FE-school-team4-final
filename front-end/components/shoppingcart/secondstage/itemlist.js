import React from 'react';
import styles from '@/styles/shoppingcart.module.css';
export default function ItemList(props) {
  return (
    <>
      {/* 商品列表body */}
      {props.itemList.map((v, i) => {
        return (
          <div className={`${styles.ProductConFirmListContainer}`} key={v.id}>
            <div className={`${styles.ProductConFirmListComponent1}`}>
              <img
                style={{ height: '95px', objectFit: 'cover' }}
                src={
                  v.products_type_sid === 4
                    ? `${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/lesson/lessons-img/${v.picture}`
                    : `${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/product/${
                        v.picture.split(',')[0]
                      }`
                }
                alt="商品圖片"
              />
            </div>
            <div className={`${styles.ProductConFirmListComponentName}`}>
              {v.item_name}
            </div>
            <div className={`${styles.ProductConFirmListComponent1}`}>
              {v.price}
            </div>
            <div className={`${styles.ProductConFirmListComponent1}`}>
              {v.quantity}
            </div>
            <div className={`${styles.ProductConFirmListComponent1}`}>
              {v.price * v.quantity}
            </div>
          </div>
        );
      })}
    </>
  );
}
