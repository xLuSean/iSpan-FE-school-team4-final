import { Skeleton } from '@mui/material';
import CUICard from '@/components/customUI/cui-card';

const LessonCardSkeleton = () => (
  <CUICard
    sx={{
      marginInline: 'auto',
      marginBlock: 3,
      bgcolor: '#777',
      width: '90%',
      height: '14rem',
    }}
  >
    <Skeleton
      sx={{ bgcolor: '#ddd', width: '100%', height: '100%', transform: 'none' }}
    ></Skeleton>
  </CUICard>
);

export default LessonCardSkeleton;
