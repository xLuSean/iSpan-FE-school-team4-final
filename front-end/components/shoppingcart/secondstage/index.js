import React, { useState, useEffect } from 'react';
import ShoppingState from './shoppingstate';
import Box from '@mui/material/Box';
import BuyerInfo from './buyerinfo';
import ItemListTitle from './itemlisttitle';
import ItemList from './itemlist';
import Payment from './payment';
import CheckButton from './checkbutton';
import { useAuth } from '@/context/auth/useAuth';
import Delivery from './delivery';
import {
  indexBackground,
  indexContainer,
  indexContainerFor2ndPageCheckButton,
} from '@/styles/shoppingcart-style/recommandproduct';
export default function SecondStage() {
  const { auth } = useAuth();
  const [itemList, setItemList] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [finalQuantity, setFinalQuantity] = useState(0);
  const [value, setValue] = useState('');

  const [confirmInfo, setConfirmInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: '',
  });

  const [delivery, setDelivery] = useState('');

  // 從DB抓取產品列表
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/OLbuyerData`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    })
      .then((r) => r.json())
      .then((results) => {
        setItemList(results.data);
      })
      .catch((error) => console.log(error));
  }, [auth?.accessToken]);

  useEffect(() => {
    let totalPrice = 0;
    let totalQuantity = 0;
    if (itemList) {
      for (let i = 0; i < itemList.length; i++) {
        let price = parseInt(itemList[i].price);
        let quantity = parseInt(itemList[i].quantity);
        totalPrice += price * quantity;
      }

      for (let i = 0; i < itemList.length; i++) {
        let Quantity = parseInt(itemList[i].quantity);
        totalQuantity += Quantity;
      }
    }
    setFinalPrice(totalPrice);
    setFinalQuantity(totalQuantity);
  }, [itemList]);
  return (
    <>
      <Box sx={indexBackground}>
        <Box sx={indexContainer}>
          <ShoppingState></ShoppingState>
          <BuyerInfo
            setConfirmInfo={setConfirmInfo}
            setValue={setValue}
            setDelivery={setDelivery}
          ></BuyerInfo>
          <ItemListTitle></ItemListTitle>
          <ItemList itemList={itemList}></ItemList>
          <Delivery
            setConfirmInfo={setConfirmInfo}
            value={value}
            setValue={setValue}
          ></Delivery>
          <Payment setDelivery={setDelivery} delivery={delivery}></Payment>
          {/* <Recipt></Recipt> */}
        </Box>
        <Box sx={indexContainerFor2ndPageCheckButton}>
          <CheckButton
            confirmInfo={confirmInfo}
            delivery={delivery}
            itemList={itemList}
            finalPrice={finalPrice}
            finalQuantity={finalQuantity}
          ></CheckButton>
        </Box>
      </Box>
    </>
  );
}
