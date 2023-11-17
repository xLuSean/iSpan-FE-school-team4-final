import React, { useEffect, useState } from 'react';
import MemberCenterLayout from '@/components/layout/memberCenterLayout';
import styles from '@/styles/member.module.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CUITextField from '@/components/customUI/cui-textfield';
import CUIDatePicker from '@/components/customUI/cui-date-picker';
import CUISelect from '@/components/customUI/cui-select';
import CUIButton from '@/components/customUI/cui-button';
import { Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '@/context/auth/useAuth';
import { toast } from 'react-hot-toast';
import ImgUploadModal from '@/components/member/ImgUploadModal';

const validationSchema = yup.object({
  mobile: yup.string().matches(/^09[0-9]{8}$/, '錯誤的手機格式'),
  birth: yup.date(),
});

export default function Index() {
  const initialData = {
    name: '',
    email: '',
    sex: '',
    address: '',
    birth: '',
    mobile: '',
  };
  const formikInitialData = {
    sex: '',
    address: '',
    birth: '',
    mobile: '',
  };
  const [data, setData] = useState(initialData);
  const [displayData, setDisplayData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const formik = useFormik({
    initialValues: formikInitialData,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const valuesCopied = { ...values };
      delete valuesCopied['name'];
      delete valuesCopied['email'];
      //抹掉不必要欄位 valuesCopied為要 patch的資料
      console.log(JSON.stringify(valuesCopied, null, 2));
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/member`,
        { ...valuesCopied },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      setData((prev) => {
        return { ...prev, ...valuesCopied };
      });
      toast.success(`${res.data.message}`);
    },
  });
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/member`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        setData(data.data);
        setDisplayData(data.data);
        formik.setValues(data.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchMemberData();
    /* 
   address birth  email hero_icon mobile name sex_sid
*/
  }, []);
  useEffect(() => {
    setDisplayData({ ...data, ...formik.values });
  }, [formik.values]);
  const filed = [
    {
      label: '姓名',
      placeholder: '',
      name: 'name',
      type: 'text',
      disabled: true,
    },
    {
      label: '電子信箱',
      placeholder: '',
      name: 'email',
      type: 'text',
      disabled: true,
    },
    {
      label: '性別',
      placeholder: '',
      name: 'sex',
      type: 'select',
      disabled: false,
    },
    { label: '地址', placeholder: '請輸入地址', name: 'address', type: 'text' },
    { label: '生日', placeholder: '請輸入生日', name: 'birth', type: 'date' },
    {
      label: '手機',
      placeholder: 'ex:0912345678',
      name: 'mobile',
      type: 'text',
    },
  ];
  return (
    <div className={`${styles['center-container']}`}>
      <div
        role="button"
        tabIndex="0"
        onClick={() => {
          handleOpen();
        }}
        onKeyUp={() => {}}
        className={`${styles['photo']}`}
      >
        {auth.user.icon ? (
          <img
            style={{ width: '100%' }}
            src={auth.user.icon}
            alt="使用者照片"
          />
        ) : (
          <CameraAltIcon className={`${styles['camera']}`} fontSize="large" />
        )}{' '}
      </div>
      {open && <ImgUploadModal open={open} handleClose={handleClose} />}
      <form onSubmit={formik.handleSubmit} className={`${styles['info']}`}>
        {filed.map((el) => {
          const { label, name, placeholder, type, disabled = false } = el;
          if (disabled) {
            return (
              <CUITextField
                key={name}
                value={displayData[name]}
                label={label}
                disabled
              />
            );
          }
          if (type === 'date') {
            return (
              <CUIDatePicker
                className={styles['date-picker']}
                key={name}
                value={displayData[name] ? displayData[name] : undefined}
                label={label}
                format="YYYY-MM-DD"
                onChange={(e) => {
                  if (e === 'Invalid Date') {
                    formik.setValues((v) => {
                      console.log('L138', v);
                      return { ...v, [name]: '' };
                    });
                    return;
                  }
                  formik.setValues((v) => {
                    return { ...v, [name]: e };
                  });
                }}
              />
            );
          }
          if (type === 'select') {
            return (
              <CUISelect
                sx={{ marginBottom: '15px', marginTop: '0px' }}
                label={label}
                options={['男', '女', '不透露']}
                key={name}
                value={displayData[name]}
                onChange={(e) => {
                  formik.setValues((v) => {
                    return { ...v, [name]: e.target.value };
                  });
                }}
              />
            );
          }
          return (
            <CUITextField
              className={`${name === 'address' ? styles['filed-address'] : ''}`}
              key={name}
              label={label}
              placeholder={placeholder}
              name={name}
              type={type}
              value={displayData[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[name] && Boolean(formik.errors[name])}
              helperText={formik.touched[name] && formik.errors[name]}
              autoComplete="off"
              disabled={disabled}
              sx={{ marginBottom: '15px', marginTop: '0px' }}
            />
          );
        })}
        <Box className={styles['button-container']}>
          <CUIButton
            sx={{ marginRight: '10px' }}
            color={'main_white'}
            onClick={() => {
              formik.setValues(data);
              toast.success('重置成功');
            }}
          >
            重置
          </CUIButton>
          <CUIButton type="submit" color={'steel_grey'}>
            儲存並變更
          </CUIButton>
        </Box>
      </form>
    </div>
  );
}

Index.getLayout = (page) => <MemberCenterLayout>{page}</MemberCenterLayout>;
