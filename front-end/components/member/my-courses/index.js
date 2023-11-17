import styles from '../member.module.css';
import CoursesTable from './courses-table';
import MemberPagenation from '../member-pagenation';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import CUISearch from '@/components/customUI/cui-search';
// import useDebounce from '@/hooks/useDebounce';

export default function MyCourses() {
  const router = useRouter();
  const [data, setData] = useState({
    redirect: '',
    totalRows: 0,
    perPage: 6,
    totalPages: 0,
    page: 1,
    rows: [],
  });
  const [inputKeyword, setInputKeyword] = useState('');
  const searchChange = () => {
    console.log('work');
  };
  const getMyfavoriteProducts = async (page = 1) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/member/member-favorite-courses2?page=${page}`
    );
    /* if (res.data.output.redirect !== '') {
      const refetch = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_PORT}${res.data.output.redirect}`
      );
      if (refetch.data.output.rows > 0) {
        {
          setData(() => {
            return { ...refetch.data.output };
          });
        }
      }
      return;
    } */

    if (res.data.output?.rows?.length > 0) {
      setData({ ...res.data.output });
    }
  };
  useEffect(() => {
    getMyfavoriteProducts();
  }, []);
  useEffect(() => {
    if (router.query?.page) {
      getMyfavoriteProducts(router.query.page);
    }
  }, [router]);
  // const debounceHandleSearchChange = useDebounce(searchChange);
  /*   useEffect(() => {
    if (inputKeyword !== '') {
      debounceHandleSearchChange();
    }
  }, [inputKeyword]); */

  return (
    <div className={`${styles['my-container']}`}>
      {data?.rows.length > 0 ? (
        <>
          <Stack
            className={`${styles['CUIsearch-container']}`}
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: '20px' }}
          >
            {/* <CUISearch
              onChange={(e) => {
                setInputKeyword(e.target.value);
              }}
              sx={{
                backgroundColor: 'var(--main-white)',
                width: '250px',
                borderRadius: '3px',
              }}
            /> */}
          </Stack>
          <CoursesTable data={data} setData={setData} />
          <MemberPagenation data={data} />
        </>
      ) : (
        <Box className={`${styles['empty-data']}`}>
          <Typography align="center" variant="h4" sx={{ padding: '10px 15px' }}>
            目前沒有收藏課程喔
          </Typography>
        </Box>
      )}
    </div>
  );
}
