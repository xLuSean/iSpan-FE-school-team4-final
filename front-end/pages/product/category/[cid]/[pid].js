import { useEffect, useState } from 'react';
import styles from '@/styles/product.module.css';
import CuiImgsmap from '@/components/product/cui-imgsmap';
import BasicBreadcrumbs from '@/components/product/cui-productBreadcrumbs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import RecommendProduct from '@/components/shoppingcart/firststage/recommendproduct';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import {
  Paper,
  Rating,
  Typography,
  Button,
  Stack,
  Divider,
  box,
  Box,
} from '@mui/material';
import {
  CUICardStyle,
  CardMediaStyle,
  CheckButton,
  ProductNameAndIcon,
  CardActionsStyle,
  priceStyle,
  FavorIconStyle,
} from '@/styles/shoppingcart-style/recommandproduct';
import CUIButton from '@/components/customUI/cui-button';
import CUICard from '@/components/customUI/cui-card';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth/useAuth';
import NextBreadCrumb from '@/components/breadcrumb';
import { toast } from 'react-hot-toast';
import { color } from 'd3';
import RecommendProduct from '@/components/shoppingcart/firststage/recommendproduct';
export default function Index() {
  const [productData, setProductData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const router = useRouter();
  const { auth } = useAuth();
  useEffect(() => {
    if (auth?.accessToken) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/member/member-favorite-products/${router.query.cid}/${router.query.pid}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      )
        .then((r) => r.json())
        .then((d) => {
          if (d.favorite === true) {
            setFavorite(true);
          }
        });
    }
  }, [auth]);
  useEffect(() => {
    if (router.query.cid && router.query.pid) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/product/${router.query.cid}/${router.query.pid}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            console.log(data.data);
            setProductData(data.data);
          } else {
            // 請在這裡處理沒有找到資料的情況
            console.log('找不到資料');
          }
        })
        .catch((error) => {
          // 請在這裡處理錯誤情況
          console.error('發生錯誤:', error);
        });
    }
  }, [router]);
  // useEffect(() => {
  //   // TODO fetch data then push into newData
  //   const newData = fakeDataForCart1.products.map((v, i) => {
  //     return { ...v, isFavor: false };
  //   });
  //   return setRecommandProduct(newData);
  // }, []);
  // // 收藏按鈕
  // const changeFavorState = (items, id) => {
  //   return items.map((v, i) => {
  //     if (v.id === id) {
  //       return { ...v, isFavor: !v.isFavor };
  //     } else {
  //       return { ...v };
  //     }
  //   });
  // };
  return (
    <>
      <div className={`${styles['product-detail-section1']}`}>
        {/* <BasicBreadcrumbs></BasicBreadcrumbs> */}
        <div className={`${styles['BreadCrumb1']}`}>
          <NextBreadCrumb></NextBreadCrumb>
        </div>
        <div className={`${styles['product-detail-container']}`}>
          <CuiImgsmap productData={productData}></CuiImgsmap>
          <div className={`${styles['product-detail-title']}`}>
            <Typography variant="h5">{productData.name}</Typography>
            <div className={`${styles['product-detail-price']}`}>
              <Typography variant="h3">{productData.price}</Typography>
              <div className={`${styles['product-detail-Rating']}`}>
                <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
                <Typography variant="h6">4.8(150)</Typography>
              </div>
            </div>
            {/* <div className={`${styles['color-selcetor']}`}>
              <Typography variant="h6">顏色</Typography>
              <div className={`${styles['colorbox']}`}>
                <Paper className={`${styles['color1']}`} />
                <Paper className={`${styles['color2']}`} />
                <Paper className={`${styles['color3']}`} />
                <Paper className={`${styles['color4']}`} />
              </div>
            </div> */}
            {/* <div className={`${styles['size-selector']}`}>
              <Typography variant="h6">尺寸</Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  className={`${styles['size-Button']}`}
                  variant="outlined"
                  size="small"
                >
                  S
                </Button>
                <Button
                  className={`${styles['size-Button']}`}
                  variant="outlined"
                  size="small"
                >
                  M
                </Button>
                <Button
                  className={`${styles['size-Button']}`}
                  variant="outlined"
                  size="small"
                >
                  L
                </Button>
              </Stack>
            </div> */}
            <div className={`${styles['quantity']}`}>
              <Typography variant="h6">數量:</Typography>
              <Button
                sx={{ color: 'black' }}
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                <RemoveIcon></RemoveIcon>
              </Button>
              <input
                className={`${styles['quantityBox']} ${styles['inputHideAdjustButton']}`}
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
                sx={{ color: 'black' }}
              >
                <AddIcon></AddIcon>
              </Button>
            </div>
            <div className={`${styles['product-detail-button']}`}>
              {/* <CUIButton
                sx={{ width: '249px', height: '36px' }}
                color={'main_white'}
              >
                立即購買
              </CUIButton> */}
              {auth?.isLogin ? (
                <CUIButton
                  sx={{ width: '249px', height: '36px' }}
                  color={'main_red'}
                  onClick={() => {
                    const jsonData = JSON.stringify({
                      products_type_sid: parseInt(router.query.cid),
                      item_sid: parseInt(router.query.pid),
                      quantity,
                    });
                    fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/SCadd`, {
                      method: 'POST',

                      body: jsonData,
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth?.accessToken}`,
                      },
                    });
                    toast.success('已加入購物車');
                  }}
                >
                  加入購物車
                </CUIButton>
              ) : (
                <CUIButton
                  sx={{ width: '249px', height: '36px' }}
                  color={'main_red'}
                  onClick={() => {
                    toast.success('請先登入');
                  }}
                >
                  加入購物車
                </CUIButton>
              )}
            </div>
            <div className={`${styles['product-detail-button']}`}>
              {/* <Button sx={{ color: 'black' }}>
                <ShareIcon></ShareIcon>分享
              </Button> */}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Typography
                  sx={{
                    paddingRight: '20px',
                    fontSize: '1.25rem',
                  }}
                >
                  收藏:
                </Typography>
                {auth.isLogin ? (
                  favorite ? (
                    <FavoriteIcon
                      sx={{
                        cursor: 'pointer',

                        marginTop: '3px',
                        width: '25px',
                        height: '25px',
                        color: 'red',
                        FavorIconStyle,
                      }}
                      onClick={() => {
                        const data = JSON.stringify({
                          cid: parseInt(router.query.cid),
                          pid: parseInt(router.query.pid),
                        });
                        console.log(data);
                        fetch(
                          `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/member/member-favorite-products`,
                          {
                            method: 'DELETE',

                            body: data,
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${auth?.accessToken}`,
                            },
                          }
                        ).then(() => {
                          setFavorite(false);
                          toast.success('已刪除收藏');
                        });
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      sx={{
                        cursor: 'pointer',
                        marginTop: '5px',
                        width: '25px',
                        height: '25px',
                        color: 'red',
                        FavorIconStyle,
                      }}
                      onClick={() => {
                        const data = JSON.stringify({
                          csid: parseInt(router.query.cid),
                          psid: parseInt(router.query.pid),
                        });
                        console.log(data);
                        fetch(
                          `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/member/member-favorite-products`,
                          {
                            method: 'POST',

                            body: data,
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${auth?.accessToken}`,
                            },
                          }
                        ).then(() => {
                          setFavorite(true);
                        });
                        toast.success('已加入收藏');
                      }}
                    />
                  )
                ) : (
                  <FavoriteBorderIcon
                    sx={{
                      cursor: 'pointer',
                      marginTop: '3px',
                      width: '25px',
                      height: '25px',
                      color: 'red',
                      FavorIconStyle,
                    }}
                    onClick={() => {
                      toast.success('請先登入');
                    }}
                  />
                )}
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles['product-detail-section2']}`}>
        <div className={`${styles['product-detail-Container']}`}>
          <div className={`${styles['description-title']}`}>
            <Typography variant="h5">產品說明</Typography>
          </div>
          <div className={`${styles['detail-description']}`}>
            <div className={`${styles['description-Container']}`}>
              <div className={`${styles['description-text1']}`}>
                <Typography variant="h6">
                  男士透氣 Essential Fitness 圓領 T 卹 - 黑色 |
                  我們的設計團隊全心全意為您 的第一次鍛煉設計這款健身 T
                  卹……以及之後的每一次鍛煉！
                </Typography>
                <Typography variant="p">
                  這款健身 T
                  卹是衣櫥的終極基本款！簡約的設計、柔軟的手感和透氣的面料使其成為
                  您健身服裝的必備單品。
                </Typography>
              </div>
              <div className={`${styles['description-text-big1']}`}>
                <div className={`${styles['description-text-big2']}`}>
                  <div className={`${styles['description-text2']}`}>
                    <Typography variant="h6">吸濕排汗</Typography>
                    <Typography variant="p">
                      保持乾燥！面料速乾並吸走汗水。
                    </Typography>
                  </div>
                  <div className={`${styles['description-text3']}`}>
                    <Typography variant="h6">輕的</Typography>
                    <Typography variant="p">132 克/平方米的面料。</Typography>
                  </div>
                </div>
                <div className={`${styles['description-text-big3']}`}>
                  <div className={`${styles['description-text4']}`}>
                    <Typography variant="h6">有彈性</Typography>
                    <Typography variant="p">
                      拉伸和剪裁提供極大的運動自由度。
                    </Typography>
                  </div>
                  <div className={`${styles['description-text5']}`}>
                    <Typography variant="h6">易於維護</Typography>
                    <Typography variant="p">
                      易於維護和快速乾燥的能力。
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* router.query.cid */}
      <div className={`${styles['product-detail-section3']}`}>
        <div className={`${styles['product-detail-comment']}`}>
          <div className={`${styles['comment-title']}`}>
            <Typography variant="h5">商品評論</Typography>
            <div className={`${styles['product-detail-Rating1']}`}>
              <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
              <Typography variant="p">4.8(150)</Typography>
            </div>
          </div>
          <div className={`${styles['comment-Rating-bigcontainer']}`}>
            <div className={`${styles['comment-Rating-container']}`}>
              <div className={`${styles['comment-Rating']}`}>
                <Typography variant="p">蘭攔路</Typography>
                <Rating
                  max={1}
                  name="half-rating"
                  defaultValue={1}
                  precision={0.5}
                />
                <Typography
                  variant="
              p"
                >
                  5/5
                </Typography>
                <Typography
                  variant="
              p"
                >
                  2023-06-12
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-Content']}`}>
                <Typography variant="p">
                  吸汗！透氣！不黏身！值得入手！
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-line']}`}>
                <Divider sx={{ width: '1518px', height: '1px' }} />
              </div>
            </div>
            <div className={`${styles['comment-Rating-container']}`}>
              <div className={`${styles['comment-Rating']}`}>
                <Typography variant="p">蘭攔路</Typography>
                <Rating
                  max={1}
                  name="half-rating"
                  defaultValue={1}
                  precision={0.5}
                />
                <Typography
                  variant="
              p"
                >
                  5/5
                </Typography>
                <Typography
                  variant="
              p"
                >
                  2023-06-12
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-Content']}`}>
                <Typography variant="p">
                  吸汗！透氣！不黏身！值得入手！
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-line']}`}>
                <Divider sx={{ width: '1518px', height: '1px' }} />
              </div>
            </div>
            <div className={`${styles['comment-Rating-container']}`}>
              <div className={`${styles['comment-Rating']}`}>
                <Typography variant="p">蘭攔路</Typography>
                <Rating
                  max={1}
                  name="half-rating"
                  defaultValue={1}
                  precision={0.5}
                />
                <Typography
                  variant="
              p"
                >
                  5/5
                </Typography>
                <Typography
                  variant="
              p"
                >
                  2023-06-12
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-Content']}`}>
                <Typography variant="p">
                  吸汗！透氣！不黏身！值得入手！
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-line']}`}>
                <Divider sx={{ width: '1518px', height: '1px' }} />
              </div>
            </div>
            <div className={`${styles['comment-Rating-container']}`}>
              <div className={`${styles['comment-Rating']}`}>
                <Typography variant="p">蘭攔路</Typography>
                <Rating
                  max={1}
                  name="half-rating"
                  defaultValue={1}
                  precision={0.5}
                />
                <Typography
                  variant="
              p"
                >
                  5/5
                </Typography>
                <Typography
                  variant="
              p"
                >
                  2023-06-12
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-Content']}`}>
                <Typography variant="p">
                  吸汗！透氣！不黏身！值得入手！
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-line']}`}>
                <Divider sx={{ width: '1518px', height: '1px' }} />
              </div>
            </div>
            <div className={`${styles['comment-Rating-container']}`}>
              <div className={`${styles['comment-Rating']}`}>
                <Typography variant="p">蘭攔路</Typography>
                <Rating
                  max={1}
                  name="half-rating"
                  defaultValue={1}
                  precision={0.5}
                />
                <Typography
                  variant="
              p"
                >
                  5/5
                </Typography>
                <Typography
                  variant="
              p"
                >
                  2023-06-12
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-Content']}`}>
                <Typography variant="p">
                  吸汗！透氣！不黏身！值得入手！
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-line']}`}>
                <Divider sx={{ width: '1518px', height: '1px' }} />
              </div>
            </div>
            <div className={`${styles['comment-Rating-container']}`}>
              <div className={`${styles['comment-Rating']}`}>
                <Typography variant="p">蘭攔路</Typography>
                <Rating
                  max={1}
                  name="half-rating"
                  defaultValue={1}
                  precision={0.5}
                />
                <Typography
                  variant="
              p"
                >
                  5/5
                </Typography>
                <Typography
                  variant="
              p"
                >
                  2023-06-12
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-Content']}`}>
                <Typography variant="p">
                  吸汗！透氣！不黏身！值得入手！
                </Typography>
              </div>
              <div className={`${styles['comment-Rating-line']}`}>
                <Divider sx={{ width: '100%', height: '1px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={`${styles['product-detail-section4']}`}>
        <div className={`${styles['Cardcontainer']}`}>
          <RecommendProduct />
        </div>
      </div> */}
    </>
  );
}
