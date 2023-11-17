import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';
import styles from './member.module.css';
import { useRouter } from 'next/router';
export default function MemberPagenation({ data }) {
  const router = useRouter();

  return (
    <>
      {parseInt(data?.totalPages) === 0 ? undefined : (
        <Stack
          justifyContent="center"
          alignItems="center"
          className={`${styles['pagination-container']}`}
        >
          <Pagination
            variant="outlined"
            shape="rounded"
            count={data?.totalPages || 0}
            siblingCount={0}
            page={data.page}
            onChange={(e, page) => {
              router.push(`?page=${page}`);
            }}
          />
        </Stack>
      )}
    </>
  );
}
