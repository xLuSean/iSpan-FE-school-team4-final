import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import styles from '@/styles/member.module.css';
import CUIButton from '../customUI/cui-button';
import { Box } from '@mui/material';
const linkDetail = [
  { href: '/member', title: '會員資料' },
  { href: '/member/my-products', title: '收藏商品' },
  { href: '/member/my-courses', title: '收藏課程' },
  { href: '/member/my-orders', title: '我的訂單' },
];
export default function MemberSubNav() {
  const [route, setRoute] = useState();
  const [expand, setExpand] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRoute(router?.route?.split('/member/')[1]);
    }
  }, [router]);
  const handleExpand = () => {
    setExpand((prev) => !prev);
  };
  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
        className={`${styles['expand-button']}`}
      >
        <CUIButton onClick={handleExpand} sx={{ px: '100px' }}>
          {
            linkDetail.find((el) => route === el?.href?.split('/member/')[1])
              ?.title
          }
        </CUIButton>
      </Box>
      <section
        className={`${styles['sub-nav-section']} ${
          expand ? styles['expand'] : ''
        }`}
      >
        <div className={`${styles['sub-nav-container']}`}>
          {linkDetail.map((el, i) => (
            <Link
              href={`${el.href}`}
              key={i}
              className={`${styles['sub-nav-link']}`}
              onClick={() => {
                setExpand(false);
              }}
            >
              {route === el?.href?.split('/member/')[1] && (
                <motion.div
                  layoutId="sub-nav-active"
                  className={`${styles['sub-nav-active']}`}
                />
              )}
              <h6 className={`${styles['sub-nav-title']}`}>{el.title}</h6>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
