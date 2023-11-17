import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MemberLayout from '@/components/layout/memberLayout';
import styles from '@/styles/member.module.css';
import Logo from '@/assets/logo';
import { MAIN_BLACK } from '@/assets/color-code';
import { Typography } from '@mui/material';
import AuthLink from '@/components/member/auth/auth-link';
import Link from 'next/link';
import CUITextField from '@/components/customUI/cui-textfield';
import CUIButton from '@/components/customUI/cui-button';
import useLoginNavigate from '@/hooks/useLoginNavigate';
import axios from 'axios';
import { resetPassword, resetPasswordToken } from '@/context/auth/config';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
const validationSchema1 = yup.object({
  email: yup
    .string('請輸入信箱')
    .email('錯誤的信箱格式')
    .required('信箱為必填欄位'),
  // .test(
  //   'email_async_validation',
  //   '此信箱已使用', // YUP always throws this error
  //   (value, a) => {
  //     console.log(a);
  //     return new Promise((resolve, reject) => {
  //       new Promise((res, rej) => {
  //         res({ data: { message: '錯誤' } });
  //       })
  //         .then((res) => {
  //           console.log(res);
  //           const { message } = res.data; // I want this error message to be shown in form.
  //           resolve(true);使用resolve(true) 表驗證成功 resolve(false) 表驗證失敗
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     });
  //   }
  // ),
  // name: yup.string('請輸入姓名').required('姓名為必填欄位'),
  // password: yup
  //   .string('請輸入密碼')
  //   .matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, '密碼需有1個英文字和1個數字')
  //   .min(6, '密碼長度需介於6-8個字')
  //   .max(8, '密碼長度需介於6-8個字')
  //   .required('密碼為必填欄位'),
  // confirmpassword: yup
  //   .string('請再次輸入密碼')
  //   .test('passwords-match', '密碼需相符', function (value) {
  //     return this.parent.password === value;
  //   }),
});
const validationSchema2 = yup.object({
  token: yup.number('請輸入驗證碼').required('請輸入驗證碼'),
  resetPassword: yup
    .string('請輸入密碼')
    .matches(/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, '密碼需有1個英文字和1個數字')
    .min(6, '密碼長度需介於6-8個字')
    .max(8, '密碼長度需介於6-8個字')
    .required('密碼為必填欄位'),
});
export default function ForgotPassword() {
  const [step, setStep] = useState('step1');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const filed1 = [
    {
      label: '電子信箱',
      placeholder: '',
      name: 'email',
      type: 'text',
      value: '',
    },
  ];
  useLoginNavigate();
  const formik1 = useFormik({
    initialValues: { email: '' },
    validationSchema: validationSchema1,
    onSubmit: async (values) => {
      const res = await axios.post(
        `${resetPasswordToken}`,
        { ...values },
        { withCredentials: false }
      );
      console.log(res.data?.token);
      if (res.data.message === 'token發送成功') {
        toast.success('驗證信已寄出，請確認。');
        setStep('step2');
        setEmail(values['email']);
        return;
      }
      if (res.data.message === '請確認信箱是否正確。') {
        toast.error('請確認信箱是否正確。');
      }
      if (res.data.message === 'token發送成功') {
        toast.success('驗證信已寄出，請確認。');
      }
    },
  });
  const formik2 = useFormik({
    initialValues: { token: '' },
    validationSchema: validationSchema2,
    onSubmit: async (values) => {
      const res = await axios.patch(
        `${resetPassword}`,
        { ...values, email },
        { withCredentials: false }
      );
      console.log(res.data.message);
      if (res.data.message === '資訊有誤') {
        toast.error('請確認驗證碼是否正確。');

        return;
      }
      if (res.data.message === '密碼變更成功') {
        toast.success('密碼變更成功，即將跳轉登入頁面');
        setTimeout(() => {
          router.push('/member/login');
        }, 1000);
      }
    },
  });
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

        <div className={styles['right-panel']}>
          <div className={`${styles['right-panel-bg']}`}></div>
          <Link className={styles['right-logo']} href="/">
            <Logo fill={MAIN_BLACK} className={styles.logo} />
          </Link>
          <Typography variant="h4">忘記密碼</Typography>
          {['login', 'sign-up'].map((el) => (
            <AuthLink key={el} path={el} />
          ))}
          {step === 'step1' ? (
            <>
              <form
                onSubmit={formik1.handleSubmit}
                className={`${styles['sign-up-form-container']}`}
              >
                <Typography
                  sx={{ marginBottom: '15px', color: 'var(--main-red)' }}
                >
                  輸入信箱並送出後，請至信箱確認驗證碼。
                </Typography>
                {filed1.map((el) => {
                  const { label, name, placeholder, type } = el;
                  return (
                    <CUITextField
                      key={name}
                      label={label}
                      placeholder={placeholder}
                      name={name}
                      type={type}
                      value={formik1.values[name]}
                      onChange={formik1.handleChange}
                      onBlur={formik1.handleBlur}
                      error={
                        formik1.touched[name] && Boolean(formik1.errors[name])
                      }
                      helperText={formik1.touched[name] && formik1.errors[name]}
                      autoComplete="off"
                      sx={{ marginBottom: '15px' }}
                    />
                  );
                })}
                <CUIButton fullWidth type="submit" color={'steel_grey'}>
                  送出驗證信
                </CUIButton>
              </form>
            </>
          ) : undefined}
          {step === 'step2' ? (
            <form
              onSubmit={formik2.handleSubmit}
              className={`${styles['sign-up-form-container']}`}
            >
              <CUITextField
                className={`${styles['CUITextField-number-input']}`}
                label={'驗證碼'}
                placeholder={'請輸入驗證碼'}
                name={'token'}
                type={'number'}
                value={formik2.values['token']}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                error={
                  formik2.touched['token'] && Boolean(formik2.errors['token'])
                }
                helperText={formik2.touched['token'] && formik2.errors['token']}
                autoComplete="off"
                sx={{ marginBottom: '15px' }}
              />
              <CUITextField
                label={'新密碼'}
                placeholder={'請輸入新密碼'}
                name={'resetPassword'}
                type={'password'}
                value={formik2.values['resetPassword']}
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                error={
                  formik2.touched['resetPassword'] &&
                  Boolean(formik2.errors['resetPassword'])
                }
                helperText={
                  formik2.touched['resetPassword'] &&
                  formik2.errors['resetPassword']
                }
                autoComplete="off"
                sx={{ marginBottom: '15px' }}
              />
              <CUIButton fullWidth type="submit" color={'steel_grey'}>
                新密碼確認
              </CUIButton>
            </form>
          ) : undefined}

          <div className={styles['back-cover']}></div>
          <div className={styles['front-cover']}></div>
        </div>
      </div>
    </>
  );
}

ForgotPassword.getLayout = (page) => <MemberLayout>{page}</MemberLayout>;
