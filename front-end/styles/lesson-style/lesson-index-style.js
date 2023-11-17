import getBrickBackground from '@/libs/getBrickBackground';

export const mainContentStyle = {
  width: '100%',
  position: 'relative',
  color: 'white',
  bgcolor: 'rgb(85, 85, 85)',
  backgroundImage: getBrickBackground(),
  backgroundAttachment: 'fixed',
};

export const flexRowSpaceBetween = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: { xs: 'space-evenly', lg: 'space-between' },
};

export const containerStyle = {
  p: '2rem',
};

const filterMediaQueryStyle = {
  position: 'fixed',
  width: { xs: '100%', sm: '50%' },
  maxHeight: 'unset',
  transition: { xs: '.5s', sm: '1s' },
  height: 'calc(100vh - var(--nav-height))',
  top: 'var(--nav-height)',
  left: '-100%',
  zIndex: 10,
};

export const filterStyle = {
  width: '30%',
  maxHeight: 'calc(100vh - var(--nav-height) - 4rem)',
  overflowY: 'auto',
  position: 'sticky',
  top: '1rem',
  bgcolor: '#eee',
  '@media (max-width: 1000px)': filterMediaQueryStyle,
};

export const showFilterStyle = {
  '@media (max-width: 1000px)': {
    ...filterMediaQueryStyle,
    left: 0,
  },
};

export const filterIconStyle = {
  visibility: 'hidden',
  '@media (max-width: 1000px)': {
    visibility: 'visible',
    transition: '.2s',
    ':hover': {
      transform: 'scale(1.2)',
    },
  },
};
