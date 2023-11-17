import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React, { useEffect, useRef } from 'react';

export default function DialogModal(props) {
  const idRef = useRef(props.currentIndex);
  // console.log(props.open && !!props.currentID);
  return (
    <Dialog
      open={props.open && !!props.currentID}
      onClose={() => {
        props.handleClose();
      }}
    >
      <DialogTitle id="alert-dialog-title">
        {('溫馨提示', '確定要刪除序號為' + idRef.current + '的商品嗎?')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          產品數量為 0 時將刪除物品
          {console.log('pop')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.handleClose();
            console.log('cancel');
          }}
        >
          取消
        </Button>
        <Button
          onClick={() => {
            //  const  async aa=()=>{
            //   const res =await callapi(v.id)
            //   const data =await res.json()
            //   handleClose();
            //   setCartItems(remove(cartItems, v.id));
            //  }
            props.handleClose();
            props.setCartItems(props.remove(props.cartItems, props.currentID));
            console.log('submit');
          }}
        >
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
}
