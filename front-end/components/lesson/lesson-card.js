import { useState } from 'react';
import Image from 'next/image';
import ForwardSymbol from '@/assets/forward-symbol';
import getToast from '@/hh_global/getToast';

import { Button, Box, Typography, Chip } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';

import CUICard from '@/components/customUI/cui-card';
import PurchaseCard from './purchaseCard';

import {
  cardStyle,
  cardImgStyle,
  cardBodyStyle,
  imgBox,
  imgButtonStyle,
  imgStyle,
  cardTitleStyle,
  favoriteIconStyle,
  cardInfoBoxStyle,
  cardInfoRowStyle,
  cardInfoTitleStyle,
  cardInfoStyle,
  tagBoxStyle,
  tagStyle,
  priceRegiBoxStyle,
  iconStyle,
  priceIconStyle,
  priceTextStyle,
  regisBoxStyle,
  forwardSymbolBoxStyle,
} from '@/styles/lesson-style/lesson-card-style';
import Link from 'next/link';

import { saveLesson, cancelSaveLesson } from '@/hh_global/handleSaveLessons';

const actionDictionary = {
  save: saveLesson,
  cancel: cancelSaveLesson,
};

const messageDictionary = {
  save: '成功加入收藏',
  cancel: '已移除收藏',
};

const LessonCard = ({ lesson, setLessons, coachcard }) => {
  const [open, setOpen] = useState(false);
  const openCard = () => setOpen(true);
  const closeCard = () => setOpen(false);

  const myToast = getToast();

  const handleNoLoginSave = () => myToast.hint();

  let isPending = false;
  const handleSave = async (action) => {
    if (isPending) return;

    isPending = true;
    myToast.loading();

    const result = await actionDictionary[action](lesson.sid);
    isPending = false;

    if (!result.success) return myToast.error();

    myToast.success(messageDictionary[action]);
    setLessons((prev) =>
      prev.map((item) =>
        item.sid === lesson.sid ? { ...item, save: !item.save } : item
      )
    );
  };

  const goSave = () => handleSave('save');
  const goCancel = () => handleSave('cancel');

  return (
    <>
      <CUICard
        sx={
          coachcard
            ? { ...cardStyle, height: '12.5rem' }
            : {
                ...cardStyle,
                width: '90%',
                '@media (max-width: 600px)': {
                  width: '100%',
                },
              }
        }
      >
        <Box sx={cardImgStyle}>
          <Box sx={imgBox}>
            <Link
              href={
                coachcard
                  ? `/coach/${lesson.coach_sid}`
                  : `/lesson/${lesson.category_sid}`
              }
            >
              <Button
                variant="outlined"
                size="small"
                color="main_white"
                sx={imgButtonStyle}
              >
                {coachcard ? '教練資料' : '系列課程'}
              </Button>
            </Link>
            <Image
              className="lesson_card_img"
              sizes="50vw"
              alt="lessonImg"
              src={
                coachcard
                  ? `${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/coach/coachs-img/${lesson.coach_img}`
                  : `${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/lesson/lessons-img/${lesson.img}`
              }
              placeholder="blur"
              blurDataURL={
                coachcard ? lesson.coach_img_base64 : lesson.img_base64
              }
              fill
              style={imgStyle}
            />
          </Box>
        </Box>
        <Box
          sx={
            coachcard
              ? { ...cardBodyStyle, width: { xs: '100%', sm: '65%' } }
              : cardBodyStyle
          }
        >
          <Typography variant="h5" sx={cardTitleStyle}>
            {lesson.name}
          </Typography>
          {lesson.save === undefined ? (
            <FavoriteBorderOutlinedIcon
              sx={favoriteIconStyle}
              onClick={handleNoLoginSave}
            />
          ) : lesson.save ? (
            <FavoriteIcon sx={favoriteIconStyle} onClick={goCancel} />
          ) : (
            <FavoriteBorderOutlinedIcon
              sx={favoriteIconStyle}
              onClick={goSave}
            />
          )}
          <Box sx={cardInfoBoxStyle}>
            <Box sx={cardInfoRowStyle}>
              <Typography variant="subtitle1" sx={cardInfoTitleStyle}>
                <EmojiPeopleIcon sx={iconStyle} />
                指導教練
              </Typography>
              <Typography variant="subtitle1" sx={cardInfoStyle}>
                {lesson.nickname}
              </Typography>
            </Box>
            <Box sx={cardInfoRowStyle}>
              <Typography variant="subtitle1" sx={cardInfoTitleStyle}>
                <AccessTimeIcon sx={iconStyle} />
                課程時間
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ ...cardInfoStyle, fontWeight: 'normal' }}
              >
                {lesson.time}
              </Typography>
            </Box>
            <Box sx={cardInfoRowStyle}>
              <Typography variant="subtitle1" sx={cardInfoTitleStyle}>
                <GroupsIcon sx={iconStyle} />
                報名人數
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ ...cardInfoStyle, fontStyle: 'oblique' }}
              >
                {lesson.enrolled} / {lesson.capacity}
              </Typography>
            </Box>
            {!coachcard && (
              <Box sx={tagBoxStyle}>
                {lesson.tags.map((tag, index) => (
                  <Chip key={index} label={tag} sx={tagStyle} />
                ))}
              </Box>
            )}
          </Box>
          <Box sx={priceRegiBoxStyle}>
            <Typography
              variant="h5"
              sx={{ ...priceTextStyle, fontSize: '1.6rem' }}
            >
              <MonetizationOnRoundedIcon sx={priceIconStyle} />
              價格: {lesson.price}
            </Typography>
            {lesson.enrolled < lesson.capacity ? (
              <Box sx={regisBoxStyle} onClick={openCard}>
                <Typography variant="h6" className="regisText">
                  立即報名
                </Typography>
                <Box sx={forwardSymbolBoxStyle}>
                  <ForwardSymbol width={'2rem'} color={'goldenrod'} />
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  ...regisBoxStyle,
                  ':hover': {},
                  cursor: 'not-allowed',
                  color: 'grey',
                }}
              >
                <Typography variant="h6" className="regisText">
                  已額滿
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </CUICard>
      <PurchaseCard open={open} closeCard={closeCard} lesson={lesson} />
    </>
  );
};

export default LessonCard;
