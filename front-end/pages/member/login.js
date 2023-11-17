import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MemberLayout from '@/components/layout/memberLayout';
import styles from '@/styles/member.module.css';
import Logo from '@/assets/logo';
import { DEEPGREY, MAIN_BLACK } from '@/assets/color-code';
import { Box, Typography } from '@mui/material';
import AuthLink from '@/components/member/auth/auth-link';
import Link from 'next/link';
import CUITextField from '@/components/customUI/cui-textfield';
import CUIButton from '@/components/customUI/cui-button';
import GoogleSvg from '@/public/icons/google-svg.svg';
import useLoginNavigate from '@/hooks/useLoginNavigate';
import { useAuth } from '@/context/auth/useAuth';
import useFirebase from '@/utils/useFirebase';
import CUINonstyleButton from '@/components/customUI/cui-nonstyle-button';
import { toast } from 'react-hot-toast';
const validationSchema = yup.object({
  email: yup
    .string('請輸入信箱')
    .email('錯誤的信箱格式')
    .required('信箱為必填欄位'),
  password: yup
    .string('請輸入密碼')
    .matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, '密碼需有1個英文字和1個數字')
    .min(6, '密碼長度需介於6-8個字')
    .max(8, '密碼長度需介於6-8個字')
    .required('密碼為必填欄位'),
});
export default function Login() {
  const { loginGoogle } = useFirebase();
  useLoginNavigate();
  const { login, googleLogin } = useAuth();
  const filed = [
    {
      label: '電子信箱',
      placeholder: '',
      name: 'email',
      type: 'text',
      value: '',
    },
    {
      label: '密碼',
      placeholder: '',
      name: 'password',
      type: 'password',
      value: '',
    },
  ];
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      //TODO拿掉console

      const result = await login(values);
      if (result === 401) {
        setFieldError('email', '帳號或密碼錯誤');
        return toast.error('帳號或密碼錯誤');
      }
    },
  });
  const handleGoogleLogin = async (providerData) => {
    googleLogin(providerData);
  };
  return (
    <>
      <div className={`${styles.bg}`}></div>
      <div className={`${styles['panel-section']}`}>
        <div className={`${styles['logo-container']}`}>
          <div className={`${styles['logo-container-bg']}`}></div>
          <Link href="/">
            <Logo fill={MAIN_BLACK} className={styles.logo} />
          </Link>
        </div>

        <form onSubmit={formik.handleSubmit} className={styles['right-panel']}>
          <div className={`${styles['right-panel-bg']}`}></div>
          <Link className={styles['right-logo']} href="/">
            <Logo fill={MAIN_BLACK} className={styles.logo} />
          </Link>
          <Typography variant="h4">登入帳號</Typography>
          {['sign-up', 'forgot-password'].map((el) => (
            <AuthLink key={el} path={el} />
          ))}
          {filed.map((el) => {
            const { label, name, placeholder, type } = el;
            return (
              <CUITextField
                key={name}
                label={label}
                placeholder={placeholder}
                name={name}
                type={type}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}
                // autoComplete="off"
                sx={{ marginBottom: '-15px' }}
              />
            );
          })}
          <CUIButton fullWidth type="submit" color={'steel_grey'}>
            登入
          </CUIButton>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="span" sx={{ color: DEEPGREY }}>
              第三方登入
            </Typography>
            <CUINonstyleButton
              onClick={() => {
                loginGoogle(handleGoogleLogin);
              }}
            >
              <img
                src={GoogleSvg.src}
                width={25}
                alt="google登入"
                className={styles['google-login']}
              />
            </CUINonstyleButton>
          </Box>
          <div className={styles['back-cover']}></div>
          <div className={styles['front-cover']}></div>
        </form>
      </div>
    </>
  );
}
Login.getLayout = (page) => <MemberLayout>{page}</MemberLayout>;
