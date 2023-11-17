import React from 'react';
import MemberSubNav from './memberSubNav';
import Navbar from './navbar';
import Footer from './footer';
import ProtectedRouteWrapper from '@/components/protected-route';
import { Box } from '@mui/material';
import getBrickBackground from '@/libs/getBrickBackground';

export default function MemberCenterLayout({ children }) {
  return (
    <ProtectedRouteWrapper>
      <Navbar />
      <div style={{ height: 'var(--nav-height)' }}></div>
      <Box
        sx={{
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
        <main>
          <div
            style={{
              position: 'relative',
              minHeight:
                'calc(100vh - var(--nav-height) - var(--footer-height))',
            }}
          >
            <MemberSubNav />
            <>{children}</>
            <Footer />
          </div>
        </main>
      </Box>
    </ProtectedRouteWrapper>
  );
}
