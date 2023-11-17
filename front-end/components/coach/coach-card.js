import dynamic from 'next/dynamic';
import { Skeleton } from '@mui/material';

const CoachCard = dynamic(() => import('./dynamic-coach-card'), {
  ssr: false,
  loading: () => (
    <Skeleton
      sx={{ m: 5, bgcolor: 'slategrey' }}
      variant="rectabgular"
      width={300}
      height={400}
    />
  ),
});

export default CoachCard;
