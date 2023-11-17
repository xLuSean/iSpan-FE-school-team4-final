import { useState, useEffect } from 'react';
import styles from '../member.module.css';
import OrdersTable from './orders-table';
import MemberPagenation from '../member-pagenation';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function MyOrders() {
  const [data, setData] = useState({
    redirect: '',
    totalRows: 0,
    perPage: 4,
    totalPages: 0,
    page: 1,
    rows: [],
  });
  const router = useRouter();
  const getMyOrders = async (page = 1) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/member/my-orders?page=${page}`
      );
      if (res.data?.output?.rows);
      {
        setData({ ...res.data.output });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyOrders();
  }, []);
  useEffect(() => {
    if (router.query?.page) {
      getMyOrders(router.query.page);
    }
  }, [router]);
  return (
    <div className={`${styles['my-container']}`}>
      {data?.rows.length > 0 ? (
        <>
          <OrdersTable data={data} />
          <MemberPagenation data={data} />
        </>
      ) : (
        <Box className={`${styles['empty-data']}`}>
          <Typography align="center" variant="h4" sx={{ padding: '10px 15px' }}>
            目前沒有訂單喔
          </Typography>
        </Box>
      )}
    </div>
  );
}
