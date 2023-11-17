import { useState, useEffect, useRef } from 'react';
import styles from '../member.module.css';
import ProductsTable from './products-table';
import MemberPagenation from '../member-pagenation';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import CUICard from '@/components/customUI/cui-card';
import axios from 'axios';
import CUIFilter from '@/components/customUI/cui-filter';
import CUISlider from '@/components/customUI/cui-slider';
import CUISearch from '@/components/customUI/cui-search';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth/useAuth';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import CUISelect from '@/components/customUI/cui-select';
import CUIButton from '@/components/customUI/cui-button';

const initialData = {
  redirect: '',
  totalRows: 0,
  perPage: 6,
  totalPages: 0,
  page: 1,
  rows: [],
};
export default function MyProducts() {
  const [data, setData] = useState(initialData);
  const keywordRef = useRef();
  const [price, setPrice] = useState([50, 4000]);
  const [category, setCategory] = useState('全部');
  const router = useRouter();
  const getMyfavoriteProducts = async (page = 1) => {
    const query = router.query;
    const queryCopy = { ...query };
    if (query?.page) {
      delete queryCopy['page'];
    }
    let serchParamsStr = new URLSearchParams(queryCopy).toString();
    if (serchParamsStr) {
      serchParamsStr = `&${serchParamsStr}`;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/member/member-favorite-products2?page=${page}${serchParamsStr}`
      );
      if (res.data.output.redirect !== '') {
        console.log(res.data.output.totalPages);
        router.push(`?page=${res.data.output.totalPages}`);
        return;
      }

      if (res.data?.output);
      {
        setData(res.data?.output);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getMyfavoriteProducts();
  }, []);
  useEffect(() => {
    if (router.query?.page) {
      getMyfavoriteProducts(router.query.page);
    }
  }, [router.query?.page]);
  const container = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  const item = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className={`${styles['my-container']}`}
      >
        <div className={`${styles['my-products-section']}`}>
          <CUIFilter
            sx={{
              bgcolor: '#eee',
              width: '20%',
              minWidth: '250px',
              flexShrink: 0,
              '@media (max-width: 768px)': {
                display: 'none',
              },
            }}
            filterIcon={
              <IconButton sx={{ display: 'none' }} onClick={() => {}}>
                <CancelIcon />
              </IconButton>
            }
            label="篩選器"
            onClick={async () => {
              console.log({
                keyword: keywordRef.current?.value,
                price,
                category,
              });
              // setQueryObject()
              const categoryMap = {
                運動衣物: 1,
                健身食品: 2,
                健身器材: 3,
                全部: '',
              };
              const serchParmas = new URLSearchParams({});
              const keywordParam = keywordRef.current?.value;
              const categoryParam = category ? categoryMap[category] : '';
              if (keywordParam) {
                serchParmas.append('keyword', keywordParam);
              }
              if (categoryParam) {
                serchParmas.append('category', categoryParam);
              }
              serchParmas.append('price', price[0]);
              serchParmas.append('price', price[1]);
              try {
                const res = await axios.get(
                  `${
                    process.env.NEXT_PUBLIC_BACKEND_PORT
                  }/api/member/member-favorite-products2?page=1&${serchParmas.toString()}`
                );
                if (res.data?.output?.rows) {
                  setData({ ...res.data?.output });
                } else {
                  setData(initialData);
                }
              } catch (err) {
                console.log(err);
              }

              router.replace({
                query: {
                  ...router.query,
                  keyword: keywordRef.current?.value,
                },
              });
            }}
            items={[
              <CUISearch
                key={'keyword'}
                color={'steel_grey'}
                label="商品名稱"
                inputRef={keywordRef}
              />,
              <CUISelect
                key={'category'}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                color={'steel_grey'}
                options={['全部', '運動衣物', '健身食品', '健身器材']}
                value={category}
              />,
              <CUISlider
                key={'slider'}
                label="價格範圍"
                value={price}
                min={50}
                max={4000}
                step={50}
                onChange={(price) => {
                  setPrice(price);
                }}
              />,
              <CUIButton
                fullWidth
                key={'reset'}
                onClick={() => {
                  setData(initialData);
                  setPrice([50, 4000]);
                  setCategory('全部');
                  keywordRef.current.value = '';
                  // router.push('/member/my-products');
                  router.replace({
                    query: {},
                  });
                  if (router.query['keyword']) {
                    delete router.query['keyword'];
                  }

                  getMyfavoriteProducts();
                }}
                color="steel_grey"
              >
                重置
              </CUIButton>,
            ]}
          />
          {data?.rows.length > 0 ? (
            <Box
              sx={{
                width: '100%',
                '@media (max-width: 768px)': {
                  width: '100%',
                },

                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CUICard
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                  backgroundColor: 'var(--steel-light-grey)',
                  gap: '5%',
                  padding: '2% 2.5% 6% 2.5%',
                  '@media (max-width: 1024px)': {
                    gap: '5%',
                    padding: '2% 0% 20.5% 4.5%',
                  },
                  '@media (max-width: 768px)': {
                    justifyContent: 'center',
                    gap: '0%',
                    padding: '30px 0',
                  },
                }}
              >
                {data.rows.map((el, i) => (
                  <Box
                    component={motion.div}
                    variants={item}
                    key={el.sid}
                    sx={{
                      width: '30%',
                      flexShrink: '0',
                      alignSelf: 'stretch',
                      '@media (max-width: 1024px)': {
                        width: '45%',
                      },
                      '@media (max-width: 768px)': {
                        width: '90%',
                        marginBottom: '20px',
                      },
                    }}
                  >
                    <CUICard sx={{ padding: '15px', height: '100%' }}>
                      <Box
                        sx={{
                          width: '100%',
                          aspectRatio: '1 / 1',
                          display: 'flex',
                          overflow: 'hidden',
                          marginBottom: '10px',
                        }}
                      >
                        <Link
                          href={`${process.env.NEXT_PUBLIC_FRONTEND_PORT}/product/category/${el?.category_sid}/${el?.product_sid}`}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            maxHeight: '100%',
                          }}
                        >
                          <img
                            src={`${el?.picture}`}
                            alt="商品圖片"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              borderRadius: '3px',
                            }}
                          />
                        </Link>
                      </Box>
                      <Typography
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {el?.name}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        ${el?.price.toLocaleString()}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: '5px',
                        }}
                      >
                        <CUIButton
                          sx={{
                            '@media (max-width: 768px)': { width: '50%' },
                          }}
                          onClick={() => {
                            axios.post(
                              `${process.env.NEXT_PUBLIC_BACKEND_PORT}/SCadd`,
                              {
                                products_type_sid: el.category_sid,
                                item_sid: el.product_sid,
                                quantity: 1,
                              }
                            );
                            toast.success('已加入購物車');
                          }}
                        >
                          加入購物車
                        </CUIButton>
                        <CUIButton
                          sx={{
                            '@media (max-width: 768px)': { width: '50%' },
                          }}
                          color="steel_grey"
                          onClick={() => {
                            const deleteFavoriteProducts = async () => {
                              const res = await axios.delete(
                                `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/member/member-favorite-products`,
                                {
                                  data: {
                                    pid: el.product_sid,
                                    cid: el.category_sid,
                                  },
                                }
                              );
                              toast.success('刪除商品成功');
                              setData((prev) => {
                                const newRows = prev.rows.filter((el2, i2) => {
                                  return i2 !== i;
                                });

                                return { ...prev, rows: newRows };
                              });
                              if (data.rows.length === 1) {
                                if (router.query?.page > 1) {
                                  router.push(
                                    `${router.pathname}?page=${
                                      router.query?.page - 1
                                    }`
                                  );
                                } else {
                                  router.push(`${router.pathname}`);
                                }
                              }
                            };
                            deleteFavoriteProducts();
                          }}
                        >
                          取消收藏
                        </CUIButton>
                      </Box>
                    </CUICard>
                  </Box>
                ))}
              </CUICard>
              <MemberPagenation data={data} />
            </Box>
          ) : (
            <>
              <div
                className={`${styles['empty-data']}`}
                style={{ width: '100%' }}
              >
                <Typography
                  align="center"
                  variant="h4"
                  sx={{ padding: '10px 15px' }}
                >
                  目前沒有收藏商品喔
                </Typography>
                <Link
                  href={`/product`}
                  style={{ textDecoration: 'underline', color: 'blue' }}
                >
                  來去逛逛
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
