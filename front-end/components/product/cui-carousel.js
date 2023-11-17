import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '@/styles/product.module.css';

// Import Swiper styles
import 'swiper/css';
import { Typography } from '@mui/material';

export default function Index() {
  return (
    <>
      {/* <div className={`${styles['mySwipermodil']}`}>
        <div className={`${styles['img-wrappermodil']}`}>
          <img
            alt="1"
            src="http://localhost:3000/p-imgs/Home_page_Banner_Desktop_not_cut_9.jpg"
          />
        </div>
        <div className={`${styles['img-wrappermodil']}`}>
          <img
            alt="2"
            src="http://localhost:3000/p-imgs/NABAIJI_Planche_natation_enfants_PE20.jpg"
          />
        </div>
        <div className={`${styles['img-wrappermodil']}`}>
          <img
            alt="3"
            src="http://localhost:3000/p-imgs/tennis-6038094_1280.jpg "
          />
        </div>
      </div> */}
      <Swiper
        autoplay={{ delay: 1000, disableOnInteraction: true }}
        className={`${styles['mySwiper']}`}
      >
        <SwiperSlide className={`${styles['img-wrapper']}`}>
          <img
            alt="1"
            src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/product/carousel01.jpg`}
          />
          <Typography className={`${styles['BigCardText']}`}>
            自由動感，讓你盡情揮灑汗水的時刻。勇敢超越極限，成就精彩人生。
          </Typography>
        </SwiperSlide>
        <SwiperSlide className={`${styles['img-wrapper']}`}>
          <img
            alt="2"
            src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/product/carousel02.jpg`}
          />
          <Typography className={`${styles['BigCardText']}`}>
            挑戰自己，活出自我!多樣器材任君挑選。
          </Typography>
        </SwiperSlide>
        <SwiperSlide className={`${styles['img-wrapper']}`}>
          <img
            alt="3"
            src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/product/carousel03.jpg`}
          />
          <Typography className={`${styles['BigCardText']}`}>
            健康均衡一步到位，民以食為天。
          </Typography>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

// const Carouselimg1 = [
//   <img src="http://localhost:3000/p-imgs/Home_page_Banner_Desktop_not_cut_9.jpg" />,
// ];
// const Carouselimg2 = [
//   <img src="http://localhost:3000/p-imgs/NABAIJI_Planche_natation_enfants_PE20.jpg" />,
// ];
// const Carouselimg3 = [
//   <img src="http://localhost:3000/p-imgs/tennis-6038094_1280.jpg" />,
// ];

// export default function CUICarousel(props) {
//   var items = [{ Carouselimg1 }, { Carouselimg2 }, { Carouselimg3 }];

//   return (
//     <Carousel>
//       {items.map((item, i) => (
//         <Item key={i} item={item} />
//       ))}
//     </Carousel>
//   );
// }

// function Item(props) {
//   return (
//     <Paper>
//       {props.item.Carouselimg1}
//       {props.item.Carouselimg2}
//       {props.item.Carouselimg3}

//       {/* <Button className="CheckButton">
//                 Check it out!
//             </Button> */}
//     </Paper>
//   );
// }
