/* 精選商品欄位 */
import React, { useEffect, useState } from 'react';
import styles from '@/styles/shoppingcart.module.css';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import createColorTheme from '@/libs/CreateColorTheme';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import FavoriteIcon from '@mui/icons-material/Favorite';

//Import button
const WhiteTheme = createColorTheme('#FFF');
const RedTheme = createColorTheme('#FF0000');
import CUICard from '@/components/customUI/cui-card';
import { CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import {
  CUICardStyle,
  CardMediaStyle,
  CheckButton,
  ProductNameAndIcon,
  ProductName,
  CardActionsStyle,
  priceStyle,
  FavorIconStyle,
} from '@/styles/shoppingcart-style/recommandproduct';
import { useAuth } from '@/context/auth/useAuth';
export default function RecommendProduct(props) {
  const [recommandProduct, setRecommandProduct] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [recommandLesson, setRecommandLesson] = useState([]);
  const { auth } = useAuth();

  // data from database
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/SCrecommanded`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    })
      .then((r) => r.json())
      .then((results) => setRecommandProduct(results.data));
  }, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/SCpopular`)
      .then((r) => r.json())
      .then((results) => setPopularProducts(results.newData));
  }, []);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/SChotlesson`)
      .then((r) => r.json())
      .then((results) => setRecommandLesson(results.newData));
  }, []);

  // 收藏按鈕
  const changeFavorState = (items, id) => {
    return items.map((v, i) => {
      if (v.sid === id) {
        return { ...v, isFavor: !v.isFavor };
      } else {
        return { ...v };
      }
    });
  };
  const [slidesPerView, setSlidesPerView] = useState(3);
  const spaceBetween = 0;
  const handleScreenResize = () => {
    if (996 < window.innerWidth) {
      setSlidesPerView(3);
    } else if (414 <= window.innerWidth <= 996) {
      setSlidesPerView(2);
    } else if (window.innerWidth < 414) {
      setSlidesPerView(1);
    }
  };
  useEffect(() => {
    handleScreenResize();
    window.addEventListener('resize', handleScreenResize);
    return () => {
      window.removeEventListener('resize', handleScreenResize);
    };
  }, []);
  return (
    <>
      <div>
        <div className={`${styles.recommendProductTitle}`}>本季新品!!!</div>
        <div className={`${styles.recommendProductContainer}`}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true, dragSize: 300 }}
          >
            {recommandProduct.map((v, i) => {
              return (
                <SwiperSlide key={i}>
                  <div
                    className={`${styles.recommendProductComponent}`}
                    key={i}
                  >
                    <CUICard sx={CUICardStyle}>
                      <CardMedia
                        sx={CardMediaStyle}
                        image={`${
                          process.env.NEXT_PUBLIC_BACKEND_PORT
                        }/imgs/product/${v.picture.split(',')[0]}`}
                        title="商品圖片"
                      />
                      <CardContent className={`${styles.cardContent}`}>
                        <Typography gutterBottom variant="h5" component="div">
                          <Box sx={ProductNameAndIcon}>
                            <Box sx={ProductName}>{v.product_name}</Box>
                            {/* <Box
                              sx={FavorIconStyle}
                              onClick={() => {
                                setRecommandProduct(
                                  changeFavorState(recommandProduct, v.sid)
                                );
                              }}
                            >
                              {v.isFavor ? (
                                <FavoriteIcon
                                  sx={FavorIconStyle}
                                ></FavoriteIcon>
                              ) : (
                                <FavoriteBorderIcon
                                  sx={FavorIconStyle}
                                ></FavoriteBorderIcon>
                              )}
                            </Box> */}
                          </Box>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                          }}
                        >
                          {v.detail}
                        </Typography>
                      </CardContent>
                      <CardActions sx={CardActionsStyle}>
                        <Box sx={priceStyle}>{v.price.toLocaleString()}</Box>
                        <Link
                          href={`http://localhost:3000/product/category/${v.parent_id}/${v.sid}`}
                        >
                          <WhiteTheme>
                            <Button
                              size="small"
                              sx={CheckButton}
                              variant="contained"
                              onClick={() => {}}
                            >
                              查看商品
                            </Button>
                          </WhiteTheme>
                        </Link>
                      </CardActions>
                    </CUICard>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className={`${styles.recommendProductTitle}`}>推薦商品!!!</div>
        <div className={`${styles.recommendProductContainer}`}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true, dragSize: 300 }}
          >
            {' '}
            {popularProducts.map((v, i) => {
              return (
                <SwiperSlide key={i}>
                  <div
                    className={`${styles.recommendProductComponent}`}
                    key={i}
                  >
                    <CUICard sx={CUICardStyle}>
                      <CardMedia
                        sx={CardMediaStyle}
                        image={`${
                          process.env.NEXT_PUBLIC_BACKEND_PORT
                        }/imgs/product/${v.picture.split(',')[0]}`}
                        title="商品圖片"
                      />
                      <CardContent className={`${styles.cardContent}`}>
                        <Typography gutterBottom variant="h5" component="div">
                          <Box sx={ProductNameAndIcon}>
                            <Box sx={ProductName}>{v.product_name}</Box>
                            {/* <Box
                              sx={FavorIconStyle}
                              onClick={() => {
                                setPopularProducts(
                                  changeFavorState(popularProducts, v.sid)
                                );
                              }}
                            >
                              {v.isFavor ? (
                                <FavoriteIcon
                                  sx={FavorIconStyle}
                                ></FavoriteIcon>
                              ) : (
                                <FavoriteBorderIcon
                                  sx={FavorIconStyle}
                                ></FavoriteBorderIcon>
                              )}
                            </Box> */}
                          </Box>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {v.detail}
                        </Typography>
                      </CardContent>
                      <CardActions sx={CardActionsStyle}>
                        <Box sx={priceStyle}>{v.price}</Box>
                        <Link
                          href={`http://localhost:3000/product/category/${v.parent_id}/${v.sid}`}
                        >
                          <WhiteTheme>
                            <Button
                              size="small"
                              sx={CheckButton}
                              variant="contained"
                              onClick={props.onClick}
                            >
                              查看商品
                            </Button>
                          </WhiteTheme>
                        </Link>
                      </CardActions>
                    </CUICard>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className={`${styles.recommendProductTitle}`}>熱門商品!!!</div>
        <div className={`${styles.recommendProductContainer}`}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true, dragSize: 300 }}
          >
            {recommandLesson.map((v, i) => {
              return (
                <SwiperSlide key={i}>
                  <div
                    className={`${styles.recommendProductComponent}`}
                    key={i}
                  >
                    <CUICard sx={CUICardStyle}>
                      <CardMedia
                        sx={CardMediaStyle}
                        image={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/lesson/lessons-img//${v.img}`}
                        title="商品圖片"
                      />
                      <CardContent className={`${styles.cardContent}`}>
                        <Typography gutterBottom variant="h5" component="div">
                          <Box sx={ProductNameAndIcon}>
                            <Box sx={ProductName}>{v.name}</Box>
                            {/* <Box
                              sx={FavorIconStyle}
                              onClick={() => {
                                setRecommandLesson(
                                  changeFavorState(recommandLesson, v.sid)
                                );
                              }}
                            >
                              {v.isFavor ? (
                                <FavoriteIcon
                                  sx={FavorIconStyle}
                                ></FavoriteIcon>
                              ) : (
                                <FavoriteBorderIcon
                                  sx={FavorIconStyle}
                                ></FavoriteBorderIcon>
                              )}
                            </Box> */}
                          </Box>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {v.detail}
                        </Typography>
                      </CardContent>
                      <CardActions sx={CardActionsStyle}>
                        <Box sx={priceStyle}>{v.price}</Box>
                        <Link
                          href={`http://localhost:3000/lesson/${v.category_sid}`}
                        >
                          <WhiteTheme>
                            <Button
                              size="small"
                              sx={CheckButton}
                              // color={props.color}
                              variant="contained"
                              onClick={props.onClick}
                            >
                              查看商品
                            </Button>
                          </WhiteTheme>
                        </Link>
                      </CardActions>
                    </CUICard>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}
