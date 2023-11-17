import { useState, useRef, useEffect } from 'react';

import { Box, Typography, ToggleButtonGroup, Container } from '@mui/material';

import CoachCard from '@/components/coach/coach-card';
import BrickWallPaper from '@/components/brick-wallpaper';
import UiButton from '@/components/hh/UiButton';

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_PORT}/coach/all`;

export const getStaticProps = async () => {
  const res = await fetch(baseUrl);
  const allCoachs = await res.json();

  return {
    props: {
      allCoachs,
    },
  };
};

const initLocation = 'taipei';

const CoachListPage = ({ allCoachs }) => {
  const [location, setLocation] = useState([initLocation]);
  const [coachs, setCoachs] = useState(getFilterCoachs([initLocation]));
  const topRef = useRef();

  useEffect(() => {
    topRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  });

  function getFilterCoachs(locations) {
    return allCoachs.filter(
      (coach) => locations.indexOf(coach.location) !== -1
    );
  }

  return (
    <Box ref={topRef}>
      <BrickWallPaper scale={1.6} rotate={7.5} />
      <Container sx={{ paddingBlock: { xs: '1rem', sm: '3rem' } }}>
        <Box sx={{ textAlign: 'center', marginBlock: 5 }}>
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              marginBottom: '5rem',
              paddingBottom: 2,
              borderBottom: '2px solid white',
            }}
          >
            健堡的專業師資
          </Typography>
          <ToggleButtonGroup
            value={location}
            aria-label="coachlocation"
            sx={{
              button: {
                transition: '.3s',
              },
              'button:not(:last-child)': {
                marginRight: { xs: '3rem', sm: '5rem' },
              },
            }}
            onChange={(event, value) => {
              if (value.length === 0) return;
              setLocation(value);
              setCoachs(getFilterCoachs(value));
            }}
          >
            <UiButton disableRipple value="taipei" aria-label="taipei">
              台北館
            </UiButton>
            <UiButton disableRipple value="taichung" aria-label="taichung">
              台中館
            </UiButton>
            <UiButton disableRipple value="kaohsiung" aria-label="kaohsiung">
              高雄館
            </UiButton>
          </ToggleButtonGroup>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          }}
        >
          {coachs.map((coach, index) => (
            <CoachCard key={index} coachdata={coach} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CoachListPage;
