import { useEffect, useState, useRef } from 'react';
import {
  Box,
  IconButton,
  Container,
  TextField,
  Typography,
  Skeleton,
  Icon,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import CUICard from '@/components/customUI/cui-card';
import BrickWallPaper from '@/components/brick-wallpaper';

import Image from 'next/image';
import { useRouter } from 'next/router';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import getToast from '@/hh_global/getToast';
import Layout from '@/components/layout/layout';
import ProtectedRouteWrapper from '@/components/protected-route';

import { useAuth } from '@/context/auth/useAuth';
import { setAuthCache, getAuthHeaders } from '@/hh_global/authCache';

import {
  mainContainerStyle,
  iconStyle,
  editCardStyle,
  imgBoxStyle,
  imgIconBoxStyle,
  imgIconStyle,
  editBoxStyle,
  nameBoxStyle,
  iconBoxStyle,
  introBoxStyle,
  introEditModeStyle,
} from '@/styles/coach-style/coach-edit-style';

const BASEURL = `${process.env.NEXT_PUBLIC_BACKEND_PORT}/coach`;
const EDITURL = `${BASEURL}/edit`;
const UPLOADURL = `${BASEURL}/upload-img`;

const editData = async (data) => {
  const result = {};
  try {
    const body = JSON.stringify(data);
    const res = await fetch(EDITURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body,
    });
    return await res.json();
  } catch (error) {
    result.success = false;
    result.error = error;
  }
  return result;
};

const nameReg = /^([^0-9]*)+$/;

const CoachEditPage = () => {
  const router = useRouter();
  const { auth } = useAuth();
  setAuthCache(auth);

  const idRef = useRef();
  const [count, setCount] = useState(0);
  const [coach, setCoach] = useState(null);
  const [inEdit, setInEdit] = useState(false);
  const [nameState, setNameState] = useState({
    error: false,
    helperText: '',
  });
  const [introState, setIntroState] = useState({
    error: false,
    helperText: '',
  });

  const inputRef = useRef();
  const textRef = useRef();
  const textAreaRef = useRef();

  const toast = getToast();

  const edit = async () => {
    const nickname = textRef.current.value;
    const introduction = textAreaRef.current.value;
    if (coach.nickname === nickname && coach.introduction === introduction)
      return;
    toast.loading();
    const result = await editData({
      nickname,
      introduction,
    });
    if (!result.success) return toast.error();
    if (!result.isEdit) return toast.error('資料未修改');
    toast.success('資料修改成功');
    setCoach((prev) => ({ ...prev, nickname, introduction }));
  };

  const getCoachData = async () => {
    try {
      const res = await fetch(EDITURL, {
        headers: getAuthHeaders(),
      });
      const [data] = await res.json();
      if (data.length === 0) {
        router.push('/404');
      }
      setCoach(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!auth.isLogin) return;
    getCoachData();
  }, [auth]);

  const timer = () => setCount((prev) => prev + 1);
  useEffect(() => {
    idRef.current = window.setInterval(timer, 100);

    return () => clearInterval(idRef.current);
  }, []);

  useEffect(() => {
    if (!auth.isLogin && count < 50) return;
    if (auth.isLogin) {
      clearInterval(idRef.current);
      return;
    }
    router.push('/404');
  }, [count]);

  const uploadImg = async () => {
    toast.loading();

    const body = new FormData();
    body.append('coach-img', inputRef.current.files[0]);

    const res = await fetch(UPLOADURL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body,
    });
    const { success, filename, base64Text } = await res.json();
    success
      ? (() => {
          toast.success('上傳圖片成功');
          setCoach((prev) => ({
            ...prev,
            img: filename,
            img_base64: base64Text,
          }));
        })()
      : toast.error();
  };

  return (
    <Box>
      <BrickWallPaper scale={1.75} rotate={5} />
      <Container sx={mainContainerStyle}>
        {coach === null ? (
          <CUICard sx={editCardStyle}>
            <CUICard sx={{ ...imgBoxStyle, bgcolor: '#eee' }}>
              <Skeleton
                sx={{ transform: 'none', width: '100%', height: '100%' }}
              />
            </CUICard>
            <Box sx={editBoxStyle}>
              <Box sx={nameBoxStyle}>
                <Skeleton
                  sx={{ transform: 'none', width: '100%', height: '100%' }}
                />
              </Box>
              <Box sx={introBoxStyle}>
                <Skeleton
                  sx={{ transform: 'none', width: '100%', height: '100%' }}
                />
              </Box>
            </Box>
          </CUICard>
        ) : (
          <>
            <CUICard sx={editCardStyle}>
              <CUICard sx={imgBoxStyle}>
                <Image
                  alt="coach-img"
                  fill
                  placeholder="blur"
                  sizes="20vw"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/coach/coachs-img/${coach['img']}`}
                  blurDataURL={coach['img_base64']}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'top center',
                  }}
                />
                <Icon
                  title="上傳自我介紹圖片"
                  sx={imgIconBoxStyle}
                  onClick={() => {
                    inputRef.current.click();
                  }}
                >
                  <UploadFileIcon sx={imgIconStyle} fontSize="large" />
                </Icon>
              </CUICard>
              <input ref={inputRef} onChange={uploadImg} type="file" hidden />
              <Box sx={editBoxStyle}>
                <Box sx={nameBoxStyle}>
                  <Box>
                    {inEdit ? (
                      <TextField
                        error={nameState.error}
                        helperText={nameState.helperText}
                        onChange={(event) => {
                          const result = {
                            error: false,
                            helperText: [],
                          };
                          if (!nameReg.test(event.target.value)) {
                            result.error = true;
                            result.helperText.push('暱稱不能有數字');
                          }
                          if (event.target.value.length <= 2) {
                            result.error = true;
                            result.helperText.push('暱稱太短');
                          }
                          result.helperText = result.helperText.join(',');
                          setNameState(result);
                        }}
                        placeholder={coach['nickname']}
                        defaultValue={coach['nickname']}
                        variant="standard"
                        color="steel_grey"
                        inputProps={{
                          ref: textRef,
                          style: {
                            display: 'block',
                            padding: 0,
                            fontSize: '1.5rem',
                          },
                        }}
                      />
                    ) : (
                      <Typography variant="h5">{coach['nickname']}</Typography>
                    )}
                  </Box>
                  <Box sx={iconBoxStyle}>
                    {inEdit ? (
                      <>
                        <IconButton
                          title="儲存修改"
                          disabled={nameState.error || introState.error}
                          sx={iconStyle}
                          onClick={() => {
                            edit();
                            setInEdit((prev) => !prev);
                          }}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          title="取消"
                          sx={{ ...iconStyle, marginLeft: '1rem' }}
                          onClick={() => setInEdit((prev) => !prev)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        title="修改資料"
                        sx={iconStyle}
                        onClick={() => setInEdit((prev) => !prev)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </Box>
                </Box>
                <Box sx={introBoxStyle}>
                  {inEdit ? (
                    <TextField
                      error={introState.error}
                      helperText={introState.helperText}
                      onChange={(event) => {
                        const result = {
                          error: false,
                          helperText: '',
                        };
                        if (event.target.value.length <= 50) {
                          result.error = true;
                          result.helperText = '自我介紹內容過少';
                        }
                        setIntroState(result);
                      }}
                      inputProps={{
                        ref: textAreaRef,
                      }}
                      color="steel_grey"
                      sx={{ width: '100%' }}
                      variant="standard"
                      multiline
                      defaultValue={coach['introduction']}
                    />
                  ) : (
                    <Typography>{coach['introduction']}</Typography>
                  )}
                </Box>
              </Box>
              <Box sx={introEditModeStyle}>
                {inEdit ? (
                  <TextField
                    color="steel_grey"
                    sx={{ width: '100%' }}
                    variant="standard"
                    multiline
                    defaultValue={coach['introduction']}
                  />
                ) : (
                  <Typography>{coach['introduction']}</Typography>
                )}
              </Box>
            </CUICard>

            <CUICard sx={{ bgcolor: '#eee', marginTop: '2rem', p: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  paddingBottom: 2,
                  marginBottom: 4,
                  borderBottom: '2px solid var(--steel-grey)',
                }}
              >
                我的課表
              </Typography>
              <FullCalendar
                eventTimeFormat={{
                  hour: 'numeric',
                  minute: '2-digit',
                  meridiem: 'short',
                }}
                eventMouseEnter={(e) => console.log(e.event._def)}
                events={coach.lessons.map((lesson) => ({
                  title: lesson.name,
                  start: lesson.time,
                }))}
                plugins={[dayGridPlugin]}
              />
            </CUICard>
          </>
        )}
      </Container>
    </Box>
  );
};

// CoachEditPage.getlayout = (page) => (
//   <ProtectedRouteWrapper>
//     <Layout>{page}</Layout>
//   </ProtectedRouteWrapper>
// );

export default CoachEditPage;
