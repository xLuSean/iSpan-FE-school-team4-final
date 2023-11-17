import React from 'react';
import SpaceFindComponent from '@/components/space-find-component';
import Layout from '@/components/layout/layout';
import { Box } from '@mui/material';
import getBrickBackground from '@/libs/getBrickBackground';

export default function SpaceFind() {
  return <SpaceFindComponent />;
}
SpaceFind.getLayout = (page) => (
  <Layout>
    <Box
      className="45454545"
      sx={{
        height: '100vh',
        bgcolor: 'var(--deepgrey)',
        backgroundImage: getBrickBackground({
          scale: 2,
          rotate: 7,
          brickColor: 'hsl(100, 0%, 30%)',
          strokeColor: 'hsl(100, 0%, 20%)',
        }),
        backgroundAttachment: 'fixed',
      }}
    >
      {page}
    </Box>
  </Layout>
);
