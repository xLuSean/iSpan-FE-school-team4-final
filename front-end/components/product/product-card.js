import React from 'react';
import CUICard from '../customUI/cui-card';
import styles from '@/styles/product.module.css';
import CUIButton from '../customUI/cui-button';
import { Link, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/auth/useAuth';

export default function ProductCard(prop) {
  const { auth } = useAuth();

  return (
    <>
      <div className={`${styles['product-card-section']}`}>
        <div className={`${styles['BigCard']}`}>
          <CUICard className={`${styles['BigCard2']}`}>
            <div className={`${styles['Card']}`}>
              <img
                alt="2"
                className={`${styles['img-bigCard']}`}
                src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/product/index01.jpg`}
              />

              <div className={`${styles['BigCardText']}`}>
                穿上我們的運動衣，感受著舒適的質地與完美的剪裁。
              </div>
              {/* <CUIButton className={`${styles['CardButtons']}`}>
                了解詳情
              </CUIButton> */}
            </div>
          </CUICard>
        </div>
        <div className={`${styles['Cardcontainer']}`}>
          <div className={`${styles['Cardcontainer2']}`}>
            <Typography variant="h5" className={`${styles['mdtitle']}`}>
              運動衣物
            </Typography>
            {prop.data?.productRows?.map((v, i) => {
              return (
                <CUICard key={v.sid} className={`${styles['smallCard']}`}>
                  <Link href={`product/category/1/${v.sid}`}>
                    <div className={`${styles['product-img-container']}`}>
                      <img
                        alt="1"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/product/${v.picture}`}
                      />
                    </div>
                  </Link>
                  <div className={`${styles['product-content-container']}`}>
                    <div className={`${styles['product-title']}`}>
                      <Typography variant="h6">{v.product_name}</Typography>
                    </div>
                    <div className={`${styles['product-price']}`}>
                      <Typography variant="h6">${v.price}</Typography>
                    </div>
                  </div>
                  {/* <div>
                    <Rating
                      name="half-rating"
                      defaultValue={2.5}
                      precision={0.5}
                    />
                  </div> */}
                  <div className={`${styles['CardButtonContainer']}`}>
                    {auth?.isLogin ? (
                      <CUIButton
                        className={`${styles['smallCardButton']}`}
                        onClick={() => {
                          const jsonData = JSON.stringify({
                            products_type_sid: 1,
                            item_sid: v.sid,
                            quantity: 1,
                          });
                          fetch(
                            `${process.env.NEXT_PUBLIC_BACKEND_PORT}/SCadd`,
                            {
                              method: 'POST',
                              body: jsonData,
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${auth?.accessToken}`,
                              },
                            }
                          );
                          toast.success('已加入購物車');
                        }}
                      >
                        <Typography variant="p">加入購物車</Typography>
                      </CUIButton>
                    ) : (
                      <CUIButton
                        className={`${styles['smallCardButton']}`}
                        onClick={() => {
                          toast.success('請先登入');
                        }}
                      >
                        <Typography variant="p">加入購物車</Typography>
                      </CUIButton>
                    )}
                  </div>
                </CUICard>
              );
            })}

            {/* <CUICard className={`${styles['smallCard']}`}>
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
            </CUICard> */}
          </div>
        </div>
      </div>
      <div className={`${styles['product-card-section2']}`}>
        <div className={`${styles['BigCard']}`}>
          <CUICard className={`${styles['BigCard2']}`}>
            <div className={`${styles['Card']}`}>
              <img
                className={`${styles['img-bigCard']}`}
                src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/product/index04.jpg`}
              />

              <div className={`${styles['BigCardText']}`}>
                品味我們的健康食品，將天然的營養與美味帶入您的生活。
              </div>
              {/* <CUIButton className={`${styles['CardButtons']}`}>
                了解詳情
              </CUIButton> */}
            </div>
          </CUICard>
        </div>
        <div className={`${styles['Cardcontainer']}`}>
          <div className={`${styles['Cardcontainer2']}`}>
            <Typography variant="h5" className={`${styles['mdtitle']}`}>
              健身食品
            </Typography>
            {prop.data?.foodRows?.map((v, i) => {
              return (
                <CUICard key={v.sid} className={`${styles['smallCard']}`}>
                  <Link href={`product/category/2/${v.sid}`}>
                    <div className={`${styles['product-img-container']}`}>
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/product/${v.picture}`}
                      />
                    </div>
                  </Link>
                  <div className={`${styles['product-content-container']}`}>
                    <div className={`${styles['product-title']}`}>
                      <Typography variant="h6">{v.food_name}</Typography>
                    </div>
                    <div className={`${styles['product-price']}`}>
                      <Typography variant="h6">${v.price}</Typography>
                    </div>
                  </div>
                  {/* <div>
                    <Rating
                      name="half-rating"
                      defaultValue={2.5}
                      precision={0.5}
                    />
                  </div> */}
                  <div className={`${styles['CardButtonContainer']}`}>
                    {auth?.isLogin ? (
                      <CUIButton
                        className={`${styles['smallCardButton']}`}
                        onClick={() => {
                          const jsonData = JSON.stringify({
                            products_type_sid: 2,
                            item_sid: v.sid,
                            quantity: 1,
                          });
                          fetch(
                            `${process.env.NEXT_PUBLIC_BACKEND_PORT}/SCadd`,
                            {
                              method: 'POST',
                              body: jsonData,
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${auth?.accessToken}`,
                              },
                            }
                          );
                          toast.success('已加入購物車');
                        }}
                      >
                        <Typography variant="p">加入購物車</Typography>
                      </CUIButton>
                    ) : (
                      <CUIButton
                        className={`${styles['smallCardButton']}`}
                        onClick={() => {
                          toast.success('請先登入');
                        }}
                      >
                        <Typography variant="p">加入購物車</Typography>
                      </CUIButton>
                    )}
                  </div>
                </CUICard>
              );
            })}

            {/* <CUICard className={`${styles['smallCard']}`}>
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
            </CUICard> */}
          </div>
        </div>
      </div>
      <div className={`${styles['product-card-section']}`}>
        <div className={`${styles['BigCard']}`}>
          <CUICard className={`${styles['BigCard2']}`}>
            <div className={`${styles['Card']}`}>
              <img
                className={`${styles['img-bigCard']}`}
                src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/product/index02.jpg`}
              />

              <div className={`${styles['BigCardText']}`}>
                開啟健康之門，挑選自己的運動器材！
                <br />
                讓我們一起挑戰極限，塑造健康魅力。
              </div>
              {/* <CUIButton className={`${styles['CardButtons']}`}>
                了解詳情
              </CUIButton> */}
            </div>
          </CUICard>
        </div>
        <div className={`${styles['Cardcontainer']}`}>
          <div className={`${styles['Cardcontainer2']}`}>
            <Typography variant="h5" className={`${styles['mdtitle']}`}>
              健身器材
            </Typography>
            {prop.data?.equipmentRows?.map((v, i) => {
              return (
                <CUICard key={v.sid} className={`${styles['smallCard']}`}>
                  <Link href={`product/category/3/${v.sid}`}>
                    <div className={`${styles['product-img-container']}`}>
                      <img
                        src={`${
                          process.env.NEXT_PUBLIC_BACKEND_PORT
                        }/imgs/product/${v.picture.split(',')[0]}`}
                      />
                    </div>
                  </Link>
                  <div className={`${styles['product-content-container']}`}>
                    <div className={`${styles['product-title']}`}>
                      <Typography variant="h6">{v.equipment_name}</Typography>
                    </div>
                    <div className={`${styles['product-price']}`}>
                      <Typography variant="h6">${v.price}</Typography>
                    </div>
                  </div>
                  {/* <div>
                    <Rating
                      name="half-rating"
                      defaultValue={2.5}
                      precision={0.5}
                    />
                  </div> */}
                  <div className={`${styles['CardButtonContainer']}`}>
                    {auth?.isLogin ? (
                      <CUIButton
                        className={`${styles['smallCardButton']}`}
                        onClick={() => {
                          const jsonData = JSON.stringify({
                            products_type_sid: 3,
                            item_sid: v.sid,
                            quantity: 1,
                          });
                          fetch(
                            `${process.env.NEXT_PUBLIC_BACKEND_PORT}/SCadd`,
                            {
                              method: 'POST',
                              body: jsonData,
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${auth?.accessToken}`,
                              },
                            }
                          );
                          toast.success('已加入購物車');
                        }}
                      >
                        <Typography variant="p">加入購物車</Typography>
                      </CUIButton>
                    ) : (
                      <CUIButton
                        className={`${styles['smallCardButton']}`}
                        onClick={() => {
                          toast.success('請先登入');
                        }}
                      >
                        <Typography variant="p">加入購物車</Typography>
                      </CUIButton>
                    )}
                  </div>
                </CUICard>
              );
            })}

            {/* <CUICard className={`${styles['smallCard']}`}>
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
            </CUICard> */}
          </div>
        </div>
      </div>
    </>
  );
}
