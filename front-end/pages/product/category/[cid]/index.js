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
import ProductPage from '@/components/product/page';

export default function Index() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [output, setOutput] = useState({
    redirect: '',
    totalRows: 0,
    perPage: 0,
    totalPages: 0,
    page: 1,
  });
  useEffect(() => {
    if (router.query.cid) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/product/${
          router.query.cid
        }?page=${router.query?.page ? router.query?.page : 1}`
      )
        // &keyword=${
        //router.query?.keyword ? router.query?.keyword : ''}

        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data.data);
          setOutput(data.output);
        });
    }
  }, [router.query]);
  return (
    <>
      {/* <div>有芬頁</div> */}
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
            <Box sx={{ width: '300px', Height: '400px' }}>
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
        {/* <div>
          <label>
            關鍵字:
            <input
              type="text"
              name="keyword"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </label>
        </div>
        <div>
          <button
            onClick={(e) => {
              setKeyword(e.target.value);
            }}
          >
            從伺服器載入資料
          </button>
        </div> */}
        <ProductPage data={output} cid={router.query.cid} />
      </Box>
    </>
  );
}
