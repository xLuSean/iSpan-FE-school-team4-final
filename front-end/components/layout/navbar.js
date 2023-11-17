import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Collapse, Stack, IconButton } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import LogoIcon from '@/assets/logo';
import { useAuth } from '@/context/auth/useAuth';
import { setAuthCache, getAuthHeaders } from '@/hh_global/authCache';
import User from '@/assets/user';

const paddingDistance = '.8rem';

const ml2 = {
  marginLeft: '20px',
};

const centerAll = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const navbarStyle = {
  position: 'fixed',
  overflow: 'visible',
  top: 0,
  bgcolor: 'var(--main-black)',
  height: 'var(--nav-height)',
  width: '100%',
  paddingInline: '1.5rem',
  userSelect: 'none',
  zIndex: 99,
  ...centerAll,
};

const logoBoxStyle = {
  ...centerAll,
  marginRight: 'auto',
};

const linksStyle = {
  ...centerAll,
  marginLeft: { xs: '-20px', md: 'unset' },
  flexDirection: {
    xs: 'column',
    md: 'row',
  },
  bgcolor: { xs: 'var(--main-black)', md: 'transparent' },
  color: 'white',
};

const linkItemStyle = {
  p: paddingDistance,
  width: { xs: '100vw', md: 'unset' },
  textAlign: 'center',
  borderRadius: '3px',
  transition: { xs: 0, md: '.5s' },
  ':hover': {
    bgcolor: { xs: '#777', md: 'white' },
    color: { xs: 'white', md: 'black' },
  },
  backgroundColor: 'var(--bgc)',
};

const ExpandItem = (props) => {
  return (
    <Box
      sx={{
        ...linkItemStyle,
        ':hover': !props.in
          ? {
              bgcolor: { xs: '#777', md: 'white' },
              color: { xs: 'white', md: 'black' },
            }
          : {},
        ...ml2,
        px: { xs: 0, md: paddingDistance },
        position: 'relative',
        cursor: 'pointer',
        ...props.style,
      }}
      onClick={props.onClick}
    >
      {props.children}
      <Collapse
        in={props.in}
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          width: '100%',
          top: 0,
          left: 0,
          color: 'white',
          borderRadius: 'inherit',
        }}
      >
        <Box
          sx={{
            ...linkItemStyle,
            display: { xs: 'none', md: 'block' },
            bgcolor: 'white',
            color: 'var(--main-black)',
          }}
        >
          {props.children}
        </Box>
        {props.links.map((link) => (
          <Link
            style={{
              marginLeft: 0,
              textAlign: 'center',
              backgroundColor: 'var(--main-black)',
            }}
            key={link.key}
            href={link.key === 'logout' ? '#' : link.href}
            {...(link.key === 'logout'
              ? {
                  onClick: () => {
                    //TODO LOGOUT
                    props?.logout();
                  },
                }
              : {})}
          >
            <Box
              sx={{
                ...linkItemStyle,
                ':hover': {
                  bgcolor: { xs: '#777', md: 'white' },
                  color: { xs: 'white', md: 'black' },
                },
                bgcolor: { xs: '#555', md: 'var(--main-black)' },
                marginTop: { xs: 0, md: '.2rem' },
                transform: { xs: `translateY(${paddingDistance})`, md: 'none' },
              }}
            >
              {link.linkName}
            </Box>
          </Link>
        ))}
      </Collapse>
    </Box>
  );
};

const Item = (props) => (
  <Link
    passHref
    {...props}
    style={{ ...ml2, display: 'block', ...props.style }}
  >
    <Box sx={linkItemStyle}>{props.children}</Box>
  </Link>
);

const initExpandData = {
  coachLesson: [
    {
      key: 'coach',
      linkName: '教練簡介',
      href: '/coach',
    },
    {
      key: 'lesson',
      linkName: '課程資訊',
      href: '/lesson',
    },
  ],
  member: [
    {
      key: 'login',
      linkName: '登入',
      href: '/member/login',
    },
    {
      key: 'signUp',
      linkName: '註冊',
      href: '/member/sign-up',
    },
  ],
  loginMember: [
    {
      key: 'member',
      linkName: '會員中心',
      href: '/member',
    },
    {
      key: 'logout',
      linkName: '登出',
      href: '/member',
    },
  ],
  record: [
    {
      key: 'train',
      linkName: '訓練紀錄',
      href: '/record/exercise',
    },

    {
      key: 'diet',
      linkName: '飲食建議',
      href: '/record/diet',
    },
  ],
};

const isCoachExpandData = {
  ...initExpandData,
  coachLesson: [
    ...initExpandData.coachLesson,
    { key: 'coach-edit', linkName: '我的資料', href: '/coach/edit' },
  ],
};

const initState = new Map(
  [...Object.keys(initExpandData)].map((key) => [key, false])
);

const getInitState = () => {
  return new Map(initState);
};

const coachUrl = `${process.env.NEXT_PUBLIC_BACKEND_PORT}/coach/edit`;
const checkIsCoach = async () => {
  const res = await fetch(coachUrl, {
    headers: getAuthHeaders(),
  });
  const result = await res.json();
  return result.length === 1;
};

export default function Navbar({ boxStyle }) {
  const router = useRouter();
  const { auth, logout } = useAuth();
  setAuthCache(auth);

  const [expandData, setExpandData] = useState(() => initExpandData);
  const [linksState, setLinksState] = useState(() => getInitState());
  const [listTimeout, setListTimeout] = useState('auto');
  const [expand, setExpand] = useState(true);
  const [currentPage, setCurrentPage] = useState();

  const toggleLink = (name) => {
    setLinksState((pre) => {
      const newState = new Map(pre);
      newState.forEach((state, key) => {
        newState.set(key, key === name ? !newState.get(name) : false);
      });
      return newState;
    });
  };

  const toggleList = () => {
    setListTimeout('auto');
    setExpand((prev) => !prev);
  };
  const mobileCloseList = () => {
    if (window.innerWidth > 900) return;
    setExpand(false);
  };
  const closeLinks = () => setLinksState(getInitState());

  useEffect(() => {
    const handleResize = () => {
      setListTimeout(window.innerWidth > 900 ? 'auto' : 0);
      setExpand(window.innerWidth > 900);
    };
    window.addEventListener('resize', handleResize);

    return () => removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    mobileCloseList();
    setCurrentPage(router.asPath.split(/[/?]+/)[1]);
  }, [router]);

  useEffect(() => {
    if (!auth.isLogin) {
      setExpandData(initExpandData);
      return;
    }
    (async () => {
      const result = await checkIsCoach();
      setExpandData(result ? isCoachExpandData : initExpandData);
    })();
  }, [auth]);

  return (
    <Stack sx={{ ...navbarStyle, ...boxStyle }} direction={'row'}>
      <Box sx={logoBoxStyle} onClick={closeLinks}>
        <Link href="/" style={{ height: '50px' }}>
          <LogoIcon width={150} height={50} />
        </Link>
      </Box>
      <Collapse
        in={expand}
        timeout={listTimeout}
        sx={{
          '@media (max-width: 900px)': {
            position: 'absolute',
            top: '100%',
            left: 0,
          },
        }}
      >
        <ClickAwayListener onClickAway={closeLinks}>
          <Box sx={linksStyle}>
            <ExpandItem
              in={linksState.get('coachLesson')}
              style={
                ['coach', 'lesson'].includes(currentPage)
                  ? { '--bgc': 'var(--deepgrey)' }
                  : {}
              }
              onClick={() => toggleLink('coachLesson')}
              links={expandData['coachLesson']}
            >
              課程與教練 ⏷
            </ExpandItem>
            <Item
              href="/product"
              style={
                currentPage === 'product' ? { '--bgc': 'var(--deepgrey)' } : {}
              }
              onClick={() => {
                mobileCloseList();
                closeLinks();
              }}
            >
              進入商城
            </Item>
            <ExpandItem
              in={linksState.get('record')}
              onClick={() => toggleLink('record')}
              links={expandData['record']}
              style={
                currentPage === 'record' ? { '--bgc': 'var(--deepgrey)' } : {}
              }
            >
              個人紀錄 ⏷
            </ExpandItem>
            <Item
              href="/space-find"
              style={
                currentPage === 'space-find'
                  ? { '--bgc': 'var(--deepgrey)' }
                  : {}
              }
              onClick={() => {
                mobileCloseList();
                closeLinks();
              }}
            >
              場地找找
            </Item>
            <Link
              href="/shoppingcart"
              onClick={closeLinks}
              style={{ ...ml2, display: 'block' }}
            >
              <ShoppingCartIcon
                sx={{
                  display: { xs: 'none', md: 'block' },
                  ':hover': {
                    color: 'var(--fortress)',
                  },
                  color:
                    currentPage === 'shoppingcart'
                      ? 'var(--fortress)'
                      : 'white',
                }}
              />
            </Link>
            {auth.isLogin ? (
              <>
                {auth.user?.icon ? (
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Link href={'/member'} style={{ ...ml2, display: 'block' }}>
                      <div
                        style={{
                          width: '45px',
                          height: '45px',
                        }}
                      >
                        <img
                          src={auth.user.icon}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '999%',
                          }}
                        />
                      </div>
                    </Link>
                  </Box>
                ) : (
                  <Link href={'/member'} style={{ ...ml2, display: 'block' }}>
                    <User />
                  </Link>
                )}

                <Item
                  href="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  登出
                </Item>
              </>
            ) : (
              <ExpandItem
                in={linksState.get('member')}
                onClick={() => toggleLink('member')}
                links={expandData['member']}
              >
                登入/註冊
              </ExpandItem>
            )}
          </Box>
        </ClickAwayListener>
      </Collapse>
      <Stack
        sx={{
          ...centerAll,
          display: {
            xs: 'flex',
            md: 'none',
          },
          flexDirection: 'row',
        }}
      >
        <Link href="/shoppingcart" onClick={closeLinks}>
          <ShoppingCartIcon
            sx={{
              color: 'white',
              ':hover': {
                color: 'var(--fortress)',
              },
            }}
          />
        </Link>
        {auth.isLogin && (
          <>
            {auth.user?.icon && (
              <Link href={'/member'} style={{ ...ml2, display: 'block' }}>
                <div
                  style={{
                    width: '45px',
                    height: '45px',
                  }}
                >
                  <img
                    src={auth.user.icon}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '999%',
                    }}
                  />
                </div>
              </Link>
            )}
          </>
        )}
        <IconButton
          onClick={toggleList}
          sx={{ color: 'white', paddingTop: '.2rem', marginLeft: '1rem' }}
        >
          <MenuIcon sx={{ fontSize: '1.8rem' }} />
        </IconButton>
      </Stack>
    </Stack>
  );
}
