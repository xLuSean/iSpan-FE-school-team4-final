import { useEffect } from 'react';
import styles from '@/styles/product.module.css';
import CuiImgsmap from '@/components/product/cui-imgsmap';
import BasicBreadcrumbs from '@/components/product/cui-productBreadcrumbs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Paper,
  Rating,
  Typography,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import CUIButton from '@/components/customUI/cui-button';
import CUICard from '@/components/customUI/cui-card';
import { useRouter } from 'next/router';
export default function EquipmentDetail() {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    if (router.query.pid) {
      console.log(router.query);
    }
  }

  return (
    <>
      <div className={`${styles['product-detail-section1']}`}>
        <BasicBreadcrumbs></BasicBreadcrumbs>
        <div className={`${styles['product-detail-container']}`}>
          <CuiImgsmap></CuiImgsmap>
          <div className={`${styles['product-detail-title']}`}>
            <Typography variant="h5">
              男士透氣 Essential Fitness 圓領T恤 - 藍色
            </Typography>
            <div className={`${styles['product-detail-price']}`}>
              <Typography variant="h3">NT$390</Typography>
              <div className={`${styles['product-detail-Rating']}`}>
                <Rating name="half-rating" defaultValue={4.5} precision={0.5} />
                <Typography variant="h6">4.8(150)</Typography>
              </div>
            </div>
            <div className={`${styles['product-detail-button']}`}>
              <CUIButton
                sx={{ width: '249px', height: '36px' }}
                color={'main_white'}
              >
                立即購買
              </CUIButton>
              <CUIButton
                sx={{ width: '249px', height: '36px' }}
                color={'main_red'}
              >
                加入購物車
              </CUIButton>
            </div>
            <div className={`${styles['product-detail-button']}`}>
              <Button sx={{ color: 'black' }}>
                <ShareIcon></ShareIcon>分享
              </Button>
              <Button sx={{ color: 'black' }}>
                <FavoriteBorderIcon></FavoriteBorderIcon>收藏
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles['product-detail-section2']}`}>
        <div className={`${styles['product-detail-Container']}`}>
          <div className={`${styles['description-title']}`}>
            <Typography variant="h4">產品說明</Typography>
          </div>
          <div className={`${styles['detail-description']}`}>
            <div className={`${styles['description-img']}`}>
              <img src="http://localhost:3000/p-imgs/st0010102.jpg" />
            </div>
            <div className={`${styles['description-Container']}`}>
              <div className={`${styles['description-text1']}`}>
                <Typography variant="h5">
                  男士透氣 Essential Fitness 圓領 T 卹 - 黑色 |
                  我們的設計團隊全心全意為您 的第一次鍛煉設計這款健身 T
                  卹……以及之後的每一次鍛煉！
                </Typography>
                <Typography variant="h6">
                  這款健身 T
                  卹是衣櫥的終極基本款！簡約的設計、柔軟的手感和透氣的面料使其成為
                  您健身服裝的必備單品。
                </Typography>
              </div>
              <div className={`${styles['description-text-big1']}`}>
                <div className={`${styles['description-text-big2']}`}>
                  <div className={`${styles['description-text2']}`}>
                    <Typography variant="h5">吸濕排汗</Typography>
                    <Typography variant="h6">
                      保持乾燥！面料速乾並吸走汗水。
                    </Typography>
                  </div>
                  <div className={`${styles['description-text3']}`}>
                    <Typography variant="h5">輕的</Typography>
                    <Typography variant="h6">132 克/平方米的面料。</Typography>
                  </div>
                </div>
                <div className={`${styles['description-text-big3']}`}>
                  <div className={`${styles['description-text4']}`}>
                    <Typography variant="h5">有彈性</Typography>
                    <Typography variant="h6">
                      拉伸和剪裁提供極大的運動自由度。
                    </Typography>
                  </div>
                  <div className={`${styles['description-text5']}`}>
                    <Typography variant="h5">易於維護</Typography>
                    <Typography variant="h6">
                      易於維護和快速乾燥的能力。
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles['product-detail-section3']}`}>
        <div className={`${styles['product-detail-comment']}`}>
          <div className={`${styles['comment-title']}`}>
            <Typography variant="h5">商品評論</Typography>
            <div className={`${styles['product-detail-Rating']}`}>
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
                <Divider sx={{ width: '1518px', height: '1px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles['product-detail-section4']}`}>
        <div className={`${styles['Cardcontainer']}`}>
          <div className={`${styles['Cardcontainer2']}`}>
            <CUICard className={`${styles['smallCard']}`}>
              <div className={`${styles['product-img-container']}`}>
                <img src="http://localhost:3000/p-imgs/st0010102.jpg" />
              </div>
              <div className={`${styles['product-content-container']}`}>
                <div className={`${styles['product-title']}`}>
                  <Typography variant="h6">
                    男士透氣快乾跑步短袖上衣 RUN DRY
                  </Typography>
                </div>
                <div className={`${styles['product-price']}`}>
                  <Typography variant="h6">450</Typography>
                </div>
              </div>
              <div>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </div>
              <div className={`${styles['CardButtonContainer']}`}>
                <CUIButton className={`${styles['smallCardButton']}`}>
                  加入購物車
                </CUIButton>
              </div>
            </CUICard>
            <CUICard className={`${styles['smallCard']}`}>
              <div className={`${styles['product-img-container']}`}>
                <img src="http://localhost:3000/p-imgs/st0010102.jpg" />
              </div>
              <div className={`${styles['product-content-container']}`}>
                <div className={`${styles['product-title']}`}>
                  <Typography variant="h6">
                    男士透氣快乾跑步短袖上衣 RUN DRY
                  </Typography>
                </div>
                <div className={`${styles['product-price']}`}>
                  <Typography variant="h6">450</Typography>
                </div>
              </div>
              <div>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </div>
              <div className={`${styles['CardButtonContainer']}`}>
                <CUIButton className={`${styles['smallCardButton']}`}>
                  加入購物車
                </CUIButton>
              </div>
            </CUICard>
            <CUICard className={`${styles['smallCard']}`}>
              <div className={`${styles['product-img-container']}`}>
                <img src="http://localhost:3000/p-imgs/st0010102.jpg" />
              </div>
              <div className={`${styles['product-content-container']}`}>
                <div className={`${styles['product-title']}`}>
                  <Typography variant="h6">
                    男士透氣快乾跑步短袖上衣 RUN DRY
                  </Typography>
                </div>
                <div className={`${styles['product-price']}`}>
                  <Typography variant="h6">450</Typography>
                </div>
              </div>
              <div>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </div>
              <div className={`${styles['CardButtonContainer']}`}>
                <CUIButton className={`${styles['smallCardButton']}`}>
                  加入購物車
                </CUIButton>
              </div>
            </CUICard>
          </div>
          <div className={`${styles['Cardcontainer2']}`}>
            <CUICard className={`${styles['smallCard']}`}>
              <div className={`${styles['product-img-container']}`}>
                <img src="http://localhost:3000/p-imgs/st0010102.jpg" />
              </div>
              <div className={`${styles['product-content-container']}`}>
                <div className={`${styles['product-title']}`}>
                  <Typography variant="h6">
                    男士透氣快乾跑步短袖上衣 RUN DRY
                  </Typography>
                </div>
                <div className={`${styles['product-price']}`}>
                  <Typography variant="h6">450</Typography>
                </div>
              </div>
              <div>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </div>
              <div className={`${styles['CardButtonContainer']}`}>
                <CUIButton className={`${styles['smallCardButton']}`}>
                  加入購物車
                </CUIButton>
              </div>
            </CUICard>
            <CUICard className={`${styles['smallCard']}`}>
              <div className={`${styles['product-img-container']}`}>
                <img src="http://localhost:3000/p-imgs/st0010102.jpg" />
              </div>
              <div className={`${styles['product-content-container']}`}>
                <div className={`${styles['product-title']}`}>
                  <Typography variant="h6">
                    男士透氣快乾跑步短袖上衣 RUN DRY
                  </Typography>
                </div>
                <div className={`${styles['product-price']}`}>
                  <Typography variant="h6">450</Typography>
                </div>
              </div>
              <div>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </div>
              <div className={`${styles['CardButtonContainer']}`}>
                <CUIButton className={`${styles['smallCardButton']}`}>
                  加入購物車
                </CUIButton>
              </div>
            </CUICard>
            <CUICard className={`${styles['smallCard']}`}>
              <div className={`${styles['product-img-container']}`}>
                <img src="http://localhost:3000/p-imgs/st0010102.jpg" />
              </div>
              <div className={`${styles['product-content-container']}`}>
                <div className={`${styles['product-title']}`}>
                  <Typography variant="h6">
                    男士透氣快乾跑步短袖上衣 RUN DRY
                  </Typography>
                </div>
                <div className={`${styles['product-price']}`}>
                  <Typography variant="h6">450</Typography>
                </div>
              </div>
              <div>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              </div>
              <div className={`${styles['CardButtonContainer']}`}>
                <CUIButton className={`${styles['smallCardButton']}`}>
                  加入購物車
                </CUIButton>
              </div>
            </CUICard>
          </div>
        </div>
      </div>
    </>
  );
}
