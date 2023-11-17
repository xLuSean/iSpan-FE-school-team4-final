import React, { useState } from 'react';
import styles from '@/styles/shoppingcart.module.css';
import Button from '@mui/material/Button';
import CUITextField from '@/components/customUI/cui-textfield';
import { useAuth } from '@/context/auth/useAuth';
import { toast } from 'react-hot-toast';
export default function BuyerInfo(props) {
  const { auth } = useAuth();
  const [name, setName] = useState('');
  const [checkName, setCheckName] = useState(false);

  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState(false);

  const [phone, setPhone] = useState('');
  const [checkPhone, setCheckPhone] = useState(false);

  const [address, setAddress] = useState('');
  const [checkAddress, setCheckAddress] = useState(false);

  const toastImportInfo = () => {
    toast.success('已匯入會員資訊');
  };
  const toastClearInfo = () => {
    toast.error('已清除會員資訊');
  };

  const importData = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/OLautofillinfo`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    })
      .then((r) => r.json())
      .then((results) => {
        const data = results.data[0];
        setName(data.name);
        setPhone(data.mobile);
        setAddress(data.address);
        setEmail(data.email);
        setCheckName(false);
        setCheckPhone(false);
        setCheckAddress(false);
        setCheckEmail(false);
        props.setConfirmInfo({
          name: data.name,
          address: data.address,
          phone: data.mobile,
          email: data.email,
          // paymentMethod: data.paymentMethod,
        });
      });
  };

  const clearInfo = () => {
    const data = '';
    setName(data);
    setPhone(data);
    setAddress(data);
    setEmail(data);
    setCheckName(true);
    setCheckPhone(true);
    setCheckAddress(true);
    setCheckEmail(true);
    // props.setValue(data);
    // props.setDelivery(data);
    props.setConfirmInfo({
      name: data,
      address: data,
      phone: data,
      email: data,
    });
  };

  return (
    <>
      <div className={`${styles.InfoArea}`}>
        <div className={`${styles.InfoContainer}`}>
          <div className={`${styles.buyerInfoTitle}`}>
            <div>收件人資訊</div>
          </div>
          <div className={`${styles.InfoComponent2}`}>
            <div>
              <Button
                sx={{
                  padding: '0 6px',
                  fontSize: '24px',
                  border: '1px solid #D9D9D9',
                  color: 'black',
                  fontWeight: '700',
                  '@media screen and (max-width:996px)': {
                    fontSize: '20px',
                  },
                }}
                onClick={() => {
                  importData();
                  toastImportInfo();
                }}
              >
                匯入會員資訊
              </Button>
            </div>
            <div>
              <Button
                sx={{
                  padding: '0 6px',
                  fontSize: '24px',
                  border: '1px solid #D9D9D9',
                  color: 'black',
                  fontWeight: '700',
                  '@media screen and (max-width:996px)': {
                    fontSize: '20px',
                  },
                }}
                onClick={() => {
                  clearInfo();
                  toastClearInfo();
                }}
              >
                清除欄位資訊
              </Button>
            </div>
          </div>
          <CUITextField
            className={`${styles.CUITextFieldStyle}`}
            error={checkName}
            label="請輸入收件人姓名"
            required
            helperText={`此為必填欄位`}
            value={name}
            onChange={(e) => {
              const imputValue = e.target.value;
              setName(imputValue);
              props.setConfirmInfo((prev) => {
                return { ...prev, name: imputValue };
              });
            }}
            onBlur={(e) => {
              const imputValue = e.target.value;
              const valid = e.target.value.length;
              valid ? setCheckName(false) : setCheckName(true);
              props.setConfirmInfo((prev) => {
                return { ...prev, name: imputValue };
              });
            }}
          ></CUITextField>
          <CUITextField
            className={`${styles.CUITextFieldStyle}`}
            error={checkAddress}
            label="請輸入寄送地址"
            required
            helperText={`此為必填欄位`}
            value={address}
            onChange={(e) => {
              const imputValue = e.target.value;
              setAddress(imputValue);
              props.setConfirmInfo((prev) => {
                console.log(prev);
                return { ...prev, address: imputValue };
              });
            }}
            onBlur={(e) => {
              const imputValue = e.target.value;
              const valid = e.target.value.length;
              valid ? setCheckAddress(false) : setCheckAddress(true);
              props.setConfirmInfo((prev) => {
                console.log(prev);
                return { ...prev, address: imputValue };
              });
            }}
          ></CUITextField>
          <CUITextField
            className={`${styles.CUITextFieldStyle}`}
            error={checkPhone}
            label="請輸入聯絡電話"
            required
            helperText={`此為必填欄位`}
            value={phone}
            onChange={(e) => {
              const imputValue = e.target.value;
              setPhone(imputValue);
              props.setConfirmInfo((prev) => {
                return { ...prev, phone: imputValue };
              });
            }}
            onBlur={(e) => {
              const imputValue = e.target.value;
              const valid = e.target.value.length;
              valid ? setCheckPhone(false) : setCheckPhone(true);
              props.setConfirmInfo((prev) => {
                return { ...prev, phone: imputValue };
              });
            }}
          ></CUITextField>
          <CUITextField
            className={`${styles.CUITextFieldStyle}`}
            error={checkEmail}
            label="請輸入電子信箱"
            required
            helperText={`此為必填欄位`}
            value={email}
            onChange={(e) => {
              const imputValue = e.target.value;
              setEmail(imputValue);
              props.setConfirmInfo((prev) => {
                return { ...prev, email: imputValue };
              });
            }}
            onBlur={(e) => {
              const imputValue = e.target.value;
              const valid = e.target.value.length;
              valid ? setCheckEmail(false) : setCheckEmail(true);
              props.setConfirmInfo((prev) => {
                return { ...prev, email: imputValue };
              });
            }}
          ></CUITextField>
        </div>
      </div>
    </>
  );
}
