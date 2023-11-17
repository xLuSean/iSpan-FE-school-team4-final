import React from 'react';
import CUICard from '../customUI/cui-card';
import styles from '@/styles/product.module.css';
import CUIButton from '../customUI/cui-button';
import { Link, Rating, Typography } from '@mui/material';

export default function ListCard({ data = [], cid }) {
  console.log(data.length);
  return (
    <>
      <div className={`${styles['list-Cardcontainer']}`}>
        {data.map((v, i) => {
          return (
            <CUICard key={v.sid} className={`${styles['smallCard']}`}>
              <Link
                style={{ textDecoration: 'none' }}
                href={`/product/category/${cid}/${v.sid}`}
              >
                <div className={`${styles['product-img-container']}`}>
                  <img
                    src={`${
                      process.env.NEXT_PUBLIC_BACKEND_PORT
                    }/imgs/product/${v.picture.split(',')[0]}`}
                  />
                </div>
              </Link>
              <div className={`${styles['product-content-container']}`}>
                <div className={`${styles['product-title']}`}>
                  <Typography variant="h6">{v.name}</Typography>
                </div>
                <div className={`${styles['product-price']}`}>
                  <Typography variant="h6">${v.price}</Typography>
                </div>
              </div>
              <div>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </div>
              <div className={`${styles['CardButtonContainer']}`}>
                <CUIButton className={`${styles['smallCardButton']}`}>
                  加入購物車
                </CUIButton>
              </div>
            </CUICard>
          );
        })}
      </div>
    </>
  );
}
