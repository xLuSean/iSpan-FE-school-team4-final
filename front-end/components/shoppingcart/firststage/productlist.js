/* 商品列表、總計欄、結帳按鈕，之後用fetch從DB抓資料 */
import React from 'react';
import { useState, useEffect } from 'react';
import styles from '@/styles/shoppingcart.module.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@/components/shoppingcart/Dialog';
import CheckButton from '@/components/shoppingcart/firststage/checkbutton';
import SpatialProduct from './spatialproduct';
import RecommendProduct from './recommendproduct';
import { checkbutton } from '@/styles/shoppingcart-style/recommandproduct';
import {
  indexContainer,
  AddAndReduceButton,
} from '@/styles/shoppingcart-style/recommandproduct';
import axios from 'axios';
import Link from 'next/link';
import { useAuth } from '@/context/auth/useAuth';
export default function ProductList() {
  const [finalPrice, setFinalPrice] = useState('');
  const [finalQuantity, setFinalQuantity] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const [currentIndex, setCurrentIndex] = useState();
  const { auth } = useAuth();

  const handleClickOpen = (id, i) => {
    setOpen(true);
    setCurrentID(id);
    setCurrentIndex(i + 1);
  };

  const handleClose = () => {
    setCurrentID();
    setOpen(false);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/cart`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    })
      .then((r) => r.json())
      .then((results) => {
        console.log(results);
        setCartItems(results.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    let totalQuantity = 0;
    if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        let price = parseInt(cartItems[i].price);
        let quantity = parseInt(cartItems[i].quantity);
        totalPrice += price * quantity;
      }

      for (let i = 0; i < cartItems.length; i++) {
        let Quantity = parseInt(cartItems[i].quantity);
        totalQuantity += Quantity;
      }
    }
    // console.log(totalPrice, totalQuantity);
    setFinalPrice(totalPrice.toLocaleString());
    setFinalQuantity(totalQuantity.toLocaleString());
  }, [cartItems]);

  // quantity更新api(給+ -及input用)
  const updateQuantity = async (order_sid, newQuantity) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_PORT}/cart/SCeditquantity/${order_sid}`,
        {
          order_sid: order_sid,
          quantity: newQuantity,
        }
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // 刪除商品API(給delete用)
  const deleteItem = async (order_sid) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_PORT}/cart/SCdelete/${order_sid}`
      );
    } catch (error) {
      console.log('error to delete item');
    }
  };

  const minus = (cartItems, id) => {
    return cartItems.map((v, i) => {
      if (v.sid === id) {
        const newQuantity = v.quantity - 1;
        updateQuantity(v.sid, newQuantity);
        return { ...v, quantity: newQuantity };
      }
      return { ...v };
    });
  };

  const add = (cartItems, id) => {
    return cartItems.map((v, i) => {
      if (v.sid === id) {
        const newQuantity = v.quantity + 1;
        updateQuantity(v.sid, newQuantity);
        return { ...v, quantity: newQuantity };
      }
      return { ...v };
    });
  };

  const remove = (cartItems, id) => {
    cartItems.map((v, i) => {
      if (v.sid === id) {
        console.log(v.sid);
        const order_sid = v.sid;
        deleteItem(order_sid);
      }
    });

    return cartItems.filter((v) => {
      return v.sid !== id;
    });
  };

  const update = (cartItems, id, value) => {
    return cartItems.map((v, i) => {
      if (v.sid === id) {
        const newQuantity = value;
        updateQuantity(v.sid, newQuantity);
        return { ...v, quantity: newQuantity };
      }
      return { ...v };
    });
  };
  return cartItems.length > 0 ? (
    <>
      <div className={`${styles.ProductListStyles}`}>
        {cartItems.map((v, i) => {
          return (
            <div
              /* 判斷商品有多少樣，奇數套用樣式1，偶數套用樣式2 */
              className={`${
                i % 2 === 0
                  ? styles.ProductListContainer1
                  : styles.ProductListContainer2
              }`}
              key={i}
            >
              {/* 將map後的data塞到對應的欄位 */}
              <div className={`${styles.ProductListComponent2} `}>{i + 1}</div>
              <div className={`${styles.ProductListComponent3}`}>
                <div className={`${styles.ProductListComponentForPhoto} `}>
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
                <div className={`${styles.ProductListComponentForDetail}`}>
                  <Link
                    href={
                      v.products_type_sid === 4
                        ? `http://localhost:3000/lesson/${v.item_sid}`
                        : `http://localhost:3000/product/category/${v.products_type_sid}/${v.item_sid}`
                    }
                  >
                    {v.item_name}{' '}
                  </Link>
                </div>
              </div>

              <div className={`${styles.ProductListComponent1}`}>
                {v.price.toLocaleString()}
              </div>
              {/* 新增可調整數量按鈕 */}
              <div className={styles.ProductListComponentForQuantity}>
                <Button
                  sx={AddAndReduceButton}
                  onClick={() => {
                    if (v.quantity > 1) {
                      // updateQuantity();
                      setCartItems(minus(cartItems, v.sid));
                    }
                    if (v.quantity === 1) {
                      handleClickOpen(parseInt(v.sid), i);
                    }
                  }}
                >
                  <RemoveIcon></RemoveIcon>
                </Button>
                <input
                  type="number"
                  className={`${styles.inputHideAdjustButton} ${styles.buttonWidth}`}
                  value={v.quantity}
                  onChange={(e) => {
                    let value = parseInt(e.target.value);

                    if (value > 99) {
                      value = 99;
                    }
                    if (isNaN(value)) {
                      return;
                    }
                    setCartItems(update(cartItems, v.sid, value));
                  }}
                />
                <Button
                  sx={AddAndReduceButton}
                  onClick={() => {
                    setCartItems(add(cartItems, v.sid));
                  }}
                >
                  <AddIcon></AddIcon>
                </Button>
              </div>
              <div className={`${styles.ProductListComponent1}`}>
                {(v.price * v.quantity).toLocaleString()}
              </div>
              {/* 刪除按鈕 */}
              <div className={`${styles.ProductListComponent2} `}>
                <Button
                  sx={{ color: 'black' }}
                  onClick={() => {
                    handleClickOpen(parseInt(v.sid), i);
                  }}
                >
                  <DeleteOutlineIcon
                    sx={{ fontSize: '26px' }}
                  ></DeleteOutlineIcon>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {open && (
        <Dialog
          currentID={currentID}
          setCurrentID={setCurrentID}
          handleClose={handleClose}
          remove={remove}
          cartItems={cartItems}
          setCartItems={setCartItems}
          open={open}
          currentIndex={currentIndex}
        ></Dialog>
      )}
      <Box sx={indexContainer}>
        <SpatialProduct></SpatialProduct>
      </Box>
      <Box sx={indexContainer}>
        <RecommendProduct></RecommendProduct>
      </Box>
      <Box sx={checkbutton}>
        {/* 產品總計欄位 */}
        <div>
          <div className={styles.countContainer}>
            {/* button 以外的元件 */}
            <div className={`${styles.countComponentWithoutButton}`}>
              <div className={`${styles.countComponent}`}>總計：</div>
              <div className={`${styles.countComponentForQuantity}`}>
                {finalQuantity}
              </div>
              <div className={`${styles.countComponentForNumber}`}>
                {finalPrice}
              </div>
            </div>
            {/* 只包含button的元件 */}
            {/* <div className={`${styles.countButtonContainer}`}> */}
            <div className={`${styles.countButtonComponent}`}>
              <CheckButton></CheckButton>
            </div>
            {/* </div> */}
          </div>
        </div>
      </Box>
    </>
  ) : (
    <>
      <Box sx={indexContainer}>
        <div className={styles.noItem}>尚未選取商品</div>
      </Box>
      <Box sx={indexContainer}>
        <SpatialProduct></SpatialProduct>
      </Box>
      <Box sx={indexContainer}>
        <RecommendProduct></RecommendProduct>
      </Box>
      <Box sx={checkbutton}>
        {/* 產品總計欄位 */}
        <div>
          <div className={styles.countContainer}>
            {/* button 以外的元件 */}
            <div className={`${styles.countComponentWithoutButton}`}>
              <div className={`${styles.countComponent}`}>總計：</div>
              <div className={`${styles.countComponentForQuantity}`}>
                {finalQuantity}
              </div>
              <div className={`${styles.countComponentForNumber}`}>
                {finalPrice}
              </div>
            </div>
            {/* 只包含button的元件 */}
            <div className={`${styles.countButtonComponent}`}>
              <CheckButton cartItems={cartItems}></CheckButton>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
