import Image from 'next/image';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import CUIButton from '../customUI/cui-button';

import { useAuth } from '@/context/auth/useAuth';
import { getAuthHeaders } from '@/hh_global/authCache';
import getToast from '@/hh_global/getToast';
import { setAuthCache } from '@/hh_global/authCache';

const cardBgcolor = '#eee';

const dialogContentStyle = {
  minWidth: '300px',
  width: { xs: '80vw', sm: '60vw', md: '50vw', lg: '40vw' },
  p: 2,
  bgcolor: cardBgcolor,
};

const imgBoxStyle = {
  position: 'relative',
  height: '180px',
  width: '100%',
  marginBottom: 1,
  borderRadius: '10px',
  overflow: 'hidden',
  img: {
    transition: '.5s',
  },
  ':hover': {
    img: {
      transform: 'scale(1.2)',
    },
  },
};

const lessonTitleStyle = { fontWeight: 'bold' };

const infoBoxStyle = { display: 'flex' };
const subtitleStyle = {
  fontWeight: 'bold',
  boxShadow: '-9px 0 0 -5px var(--steel-grey)',
  marginLeft: '.5rem',
  paddingLeft: '.5rem',
};
const infoStyle = { marginLeft: 'auto', marginRight: '.5rem' };

const dialogActionsStyle = {
  boxShadow: '0 -10px 0 -8px grey',
  bgcolor: cardBgcolor,
  p: 2,
};

const locationDictionary = {
  taipei: '台北館',
  taichung: '台中館',
  kaohsiung: '高雄館',
};

const ADDCARTURL = `${process.env.NEXT_PUBLIC_BACKEND_PORT}/SCadd`;
const addToCart = async (lessonSid) => {
  const result = {};
  const body = {
    products_type_sid: 4,
    item_sid: lessonSid,
    quantity: 1,
  };
  try {
    const res = await fetch(ADDCARTURL, {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-type': 'application/json' },
      body: JSON.stringify(body),
    });

    const { code } = await res.json();
    result.success = code === 200;
  } catch (error) {
    result.success = false;
    result.error = error;
  }

  return result;
};

const PurchaseCard = ({ open, closeCard, lesson }) => {
  const { auth } = useAuth();

  const infoDictionary = [
    { title: '教練', content: lesson.nickname },
    { title: '地點', content: locationDictionary[lesson.location] },
    { title: '課程時間', content: lesson.time },
    { title: '課程時長', content: lesson.period },
    { title: '費用', content: lesson.price },
  ];
  const myToast = getToast();

  const handleAddCart = async () => {
    myToast.loading();

    const result = await addToCart(lesson.sid);

    if (!result.success) return myToast.error();

    myToast.success('成功加入購物車');
    setTimeout(() => {
      open && closeCard();
    }, 1000);
  };

  return (
    <Dialog open={open} onClose={closeCard} maxWidth={false}>
      <DialogContent sx={dialogContentStyle}>
        <Box sx={imgBoxStyle}>
          <Image
            alt="purchselessonImg"
            sizes="50vw"
            src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/lesson/lessons-img/${lesson.img}`}
            placeholder="blur"
            blurDataURL={lesson.img_base64}
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            fill
          />
        </Box>
        <Typography variant="h6" sx={lessonTitleStyle}>
          {lesson.name}
        </Typography>
        {infoDictionary.map((item, index) => (
          <Box key={index} sx={infoBoxStyle}>
            <Typography variant="subtitle1" sx={subtitleStyle}>
              {item.title}
            </Typography>
            <Typography sx={infoStyle}>{item.content}</Typography>
          </Box>
        ))}
      </DialogContent>
      <DialogActions sx={dialogActionsStyle}>
        <CUIButton btncolor={'#777'} onClick={closeCard}>
          取消
        </CUIButton>
        {auth.isLogin ? (
          <CUIButton color={'steel_grey'} onClick={handleAddCart}>
            加入購物車
          </CUIButton>
        ) : (
          <CUIButton disabled color={'steel_grey'}>
            尚未登入
          </CUIButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseCard;
