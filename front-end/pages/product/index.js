import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import styles from '@/styles/product.module.css';
import CUISearch from '@/components/customUI/cui-search';
import CUISelect from '@/components/customUI/cui-select';
import { useRouter } from 'next/router';

import CUISlider from '@/components/customUI/cui-slider';
import CUICarousel from '@/components/product/cui-carousel';
import PButton from '@/components/product/p-button';
import CUICard from '@/components/product/product-card';
import getBrickBackground from '@/libs/getBrickBackground';

export default function Index() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/product/main-page/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      });
  }, []);
  return (
    // <div className={`${styles.container}`}>
    //   container<div>index</div>
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
          <CUICarousel></CUICarousel>
          <PButton></PButton>
          <CUICard data={data}></CUICard>
        </div>
      </Box>
    </>
  );
}
