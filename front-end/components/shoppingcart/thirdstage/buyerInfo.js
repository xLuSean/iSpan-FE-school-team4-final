import { useAuth } from '@/context/auth/useAuth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/shoppingcart.module.css';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
export default function BuyerInfo() {
  const [buyerInfo, setBuyerInfo] = useState({});
  const [itemList, setItemList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderNumber, setOrderNumber] = useState('');
  const [uuid, setUuid] = useState('');
  const { auth } = useAuth();
  useEffect(() => {
    const recipt = uuidv4();
    setUuid(recipt);
  }, []);
  useEffect(() => {
    const getBuyerInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_PORT}/FObuyerinfo/`,
          {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
          }
        );
        console.log(res.data);
        setBuyerInfo(res.data.omdata);
        if (dayjs(res.data.omdata.orderNumber).isValid()) {
          setOrderNumber(`J${Date.parse(res.data.omdata.orderNumber)}`);
        } else {
          setOrderNumber(`${res.data.omdata.orderNumber}`);
        }
      } catch (error) {
        console.log('error');
      }
    };
    getBuyerInfo();
    const getItemList = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_PORT}/FOitemlist/`,
          {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
          }
        );
        const tolocalestring = res.data.oddata.map((v, i) => {
          return { ...v, price: v.price.toLocaleString() };
        });
        setItemList(tolocalestring);
        let totalPrice = 0;
        res.data.oddata.map((v, i) => {
          totalPrice += v.quantity * v.price;
        });
        setTotalPrice(totalPrice.toLocaleString());
      } catch (error) {
        console.log('error');
      }
    };
    getItemList();
  }, [auth?.accessToken]);

  return (
    <>
      <div className={styles.titleContainer}>
        <div>訂單已完成</div>
      </div>
      <div className={styles.buyerInfoContainerFor3rdPage}>
        <div className={styles.buyerInfoTitleFor3rdPage}>收件人資訊</div>
        <div className={styles.buyerInfoLRFor3rdPage}>
          <div className={styles.buyerInfoLeftFor3rdPage}>
            <div>名稱 : {buyerInfo?.name}</div>
            <div>地址 : {buyerInfo?.address}</div>
            <div>電話 : {buyerInfo?.phone}</div>
            <div>信箱 : {buyerInfo?.email}</div>
          </div>
          <div className={styles.buyerInfoRightFor3rdPage}>
            <div>
              付款方式：
              {buyerInfo?.Method}
            </div>
            <div>商品數量：{buyerInfo?.amount}</div>
            <div>商品總價：{totalPrice}</div>
            <div>訂單編號：{orderNumber}</div>
          </div>
        </div>
      </div>

      <div className={styles.titleContainer}>
        <div>商品明細</div>
      </div>
      <div className={styles.thirdPageItemList}>
        {itemList.map((v, i) => {
          return (
            <div className={styles.itemListContainer} key={i}>
              <div className={styles.itemListTitle}>
                <div> {v.item_name}</div>
              </div>
              <div className={styles.itemListDetailWithPhoto}>
                {/* image */}
                <div>
                  <img
                    style={{ height: '95px', objectFit: 'cover' }}
                    src={
                      v.products_type_sid === 4
                        ? `${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/lesson/lessons-img/${v.picture}`
                        : `${
                            process.env.NEXT_PUBLIC_BACKEND_PORT
                          }/imgs/product/${v.picture.split(',')[0]}`
                    }
                    alt="商品圖片"
                  />
                </div>
                <div className={styles.itemListDetail}>
                  <div>價格 : {v.price}</div>
                  <div>數量 : {v.quantity}</div>
                  <div>
                    小計 :&nbsp;
                    {(
                      v.quantity * parseInt(v.price.replace(/,/g, ''))
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
