import React from 'react';
import CUICard from '../customUI/cui-card';
import styles from '@/styles/product.module.css';
import CUIButton from '../customUI/cui-button';
import { Link, Rating, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth/useAuth';
import { toast } from 'react-hot-toast';

export default function ListCard({ data = [], cid }) {
  console.log(data.length);
  const { auth } = useAuth();
  const router = useRouter();

  return (
    <>
      <div className={`${styles['list-Cardcontainer']}`}>
        {data.map((v, i) => {
          return (
            <CUICard key={v.sid} className={`${styles['smallCard']}`}>
              <div
                className={`${styles['product-img-container']}`}
                onClick={() => {
                  router.push(`/product/category/${cid}/${v.sid}`);
                }}
                onKeyDown={() => {
                  router.push(`/product/category/${cid}/${v.sid}`);
                }}
                role="button"
                tabIndex="0"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/product/${
                    v.picture.split(',')[0]
                  }`}
                />
              </div>
              <div className={`${styles['product-content-container']}`}>
                <div className={`${styles['product-title']}`}>
                  <Typography variant="h6">{v.name}</Typography>
                </div>
                <div className={`${styles['product-price']}`}>
                  <Typography variant="h6">${v.price}</Typography>
                </div>
              </div>
              {/* <div className={`${styles['product-Rating']}`}>
                <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
                <Typography>4.5(22)</Typography>
              </div> */}
              <div className={`${styles['CardButtonContainer']}`}>
                {auth?.isLogin ? (
                  <CUIButton
                    className={`${styles['smallCardButton']}`}
                    onClick={() => {
                      //判斷有登入 就加入購物車
                      //如果沒登入就用toast提示登入
                      // console.log(auth?.isLogin);
                      const jsonData = JSON.stringify({
                        products_type_sid: cid,
                        item_sid: v.sid,
                        quantity: 1,
                      });
                      fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/SCadd`, {
                        method: 'POST',
                        body: jsonData,
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${auth?.accessToken}`,
                        },
                      });
                      toast.success('已加入購物車');
                    }}
                  >
                    加入購物車
                  </CUIButton>
                ) : (
                  <CUIButton
                    className={`${styles['smallCardButton']}`}
                    onClick={() => {
                      toast.success('請先登入');
                    }}
                  >
                    加入購物車
                  </CUIButton>
                )}
              </div>
            </CUICard>
          );
        })}
      </div>
    </>
  );
}
