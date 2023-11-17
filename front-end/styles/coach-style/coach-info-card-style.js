const ANIMATIME = '1s';

export const cardGridStyle = {
  position: 'relative',
  left: { xs: 'calc(50vw - 60%)', sm: 'calc(50vw - 50%)', th: 0 },
  width: { xs: '100%', sm: '100%', th: '90%' },
  height: { xs: '70%', sm: '75%', th: '75%', lg: '80%' },
  ':before': {
    content: '""',
    position: 'absolute',
    width: '70%',
    height: '85%',
    top: '10%',
    transition: ANIMATIME,
    transform: { xs: 'rotate(0)', sm: 'rotate(30deg)', lg: 'rotate(0)' },
    left: '15%',
    border: '3px solid white',
  },
};

export const coachCardBoxStyle = {
  position: 'absolute',
  width: { xs: '100%', th: '90%' },
  height: '100%',
  top: { xs: '15%', sm: '20%', th: '20%', lg: '-10%' },
  left: { xs: '-70%', sm: '-50%', th: '-55%', lg: '-18%' },
  transition: '.5s',
  animation: `${ANIMATIME} move-card forwards`,
  '@keyframes move-card': {
    '100%': {
      transform: 'translate3d(245px, 0, 0)',
    },
  },
};

export const imageBoxStyle = {
  position: 'absolute',
  left: { xs: '40%', sm: '25%', th: '30%', lg: '22%' },
  top: { xs: '0%', sm: '5%', th: '7.5%', lg: '30%' },
  transform: 'rotateZ(-10deg)',
  width: { xs: '50%', sm: '55%', th: '45%', lg: '50%' },
  height: { xs: '50%', sm: '50%', th: '50%', lg: '55%' },
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  transition: '.5s',
  zIndex: 1,
  animation: `${ANIMATIME} draw-card forwards`,
  '@keyframes draw-card': {
    to: {
      transform: 'translate3d(-8rem, -4rem, 0) rotateZ(0deg)',
    },
  },
};

export const cardBehindStyle = {
  position: 'absolute',
  bottom: '2%',
  right: '5%',
  width: '80%',
  height: '85%',
  padding: { xs: '1.2rem', md: '1.5rem', lg: '1.75rem' },
  textAlign: 'right',
  borderRadius: '12px',
  bgcolor: 'slategrey',
};

export const cardTitleStyle = {
  paddingBottom: '.2rem',
  paddingRight: '.7rem',
  color: 'white',
  borderBottom: '2px solid white',
};

export const cardFrontStyle = {
  position: 'absolute',
  right: '7%',
  bottom: '5%',
  paddingInline: { xs: '1.2rem', md: '1.5rem', lg: '1.75rem' },
  color: 'white',
  width: '76%',
  height: '30%',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  overflowY: 'scroll',
  borderBottomLeftRadius: '15px',
  borderBottomRightRadius: '15px',
  bgcolor: 'var(--steel-grey)',
  boxShadow: '0 -6px 3px -3px rgba(0, 0, 0, 0.2)',
  transition: '.5s',
  animation: `${ANIMATIME} grow-up forwards`,
  '@keyframes grow-up': {
    '100%': {
      height: '65%',
      boxShadow: 'none',
    },
  },
};

export const locationStyle = {
  position: 'absolute',
  bottom: 0,
  right: '50%',
  transform: 'translateX(50%)',
};
