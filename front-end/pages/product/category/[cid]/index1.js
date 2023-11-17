import CUIFilter from '@/components/customUI/cui-filter';
import CUISearch from '@/components/customUI/cui-search';
import CUISlider from '@/components/customUI/cui-slider';
import BasicBreadcrumbs from '@/components/product/cui-productBreadcrumbs';
import ListCard from '@/components/product/list-card';
import { Height, WidthFull } from '@mui/icons-material';
import { AccordionActions, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/product.module.css';
import { useRouter } from 'next/router';
import BasicAccordion from '@/components/product/Accordion';
import getBrickBackground from '@/libs/getBrickBackground';
import NextBreadCrumb from '@/components/breadcrumb';

export default function Index() {
  const [data, setData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (router.query.cid) {
      fetch(`http://localhost:3001/api/product/no-page/${router.query.cid}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          setData(data.data);
        });
    }
  }, [router.query]);
  // console.log(data.data);
  return (
    <>
      <Box
        sx={{
          bgcolor: 'var(--deepgrey)',
          backgroundImage: getBrickBackground({
            scale: 2,
            rotate: 7,
            brickColor: 'hsl(100, 0%, 30%)',
            strokeColor: 'hsl(100, 0%, 20%)',
          }),
          backgroundAttachment: 'fixed',
        }}
      >
        <div
          style={{
            position: 'relative',
            minHeight: 'calc(100vh - var(--nav-height) - var(--footer-height))',
          }}
        >
          <div className={`${styles['list']}`}>
            <Box className={`${styles['list-box']}`}>
              <BasicAccordion
                page={router.query.cid}
                className={`${styles['BasicAccordion']}`}
              ></BasicAccordion>
            </Box>
            {/* <CUIFilter
              sx={{ width: '300px', Height: '400px' }}
              label="商品篩選"
              items={[
                <CUISearch
                  key={1}
                  color={'steel_grey'}
                  label="商品關鍵字"
                  placeholder="請輸入關鍵字"
                  onclick
                />,
                <CUISlider
                  key={[1, 2]}
                  label="價格區間"
                  max={2000}
                  min={200}
                  value={[200, 250]}
                  distance={1}
                />,
              ]}
            /> */}
            <div className={`${styles['list-Card']}`}>
              <div className={`${styles['BreadCrumb']}`}>
                <NextBreadCrumb></NextBreadCrumb>
              </div>
              <ListCard data={data} cid={router.query.cid}></ListCard>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
