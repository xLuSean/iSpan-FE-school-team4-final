import getBrickBackground from '@/libs/getBrickBackground';

export const bannerStyle = {
  position: 'sticky',
  overflow: 'hidden',
  top: 0,
  height: '80vmin',
  minHeight: '300px',
  minWidth: '380px',
  zIndex: 0,
};

export const arrowStyle = {
  '--gap': { xs: '.2rem', md: '2rem' },
  position: 'absolute',
  top: 'calc( 47.5% - .5em )',
  color: 'lightgrey',
  fontSize: { xs: '6rem', sm: '10rem' },
  zIndex: 2,
  transition: '.2s',
  cursor: 'pointer',
  ':hover': {
    color: 'white',
    transform: 'scale(1.25)',
    filter: 'drop-shadow(calc(var(--od) * 7px) 0px 3px grey)',
  },
};

export const carouselStyle = {
  display: 'flex',
  position: 'relative',
  height: '100%',
};

const pesudoElementStyle = {
  content: { xs: 'none', md: '""' },
  position: 'absolute',
  backdropFilter: 'blur(10px)',
  width: '40%',
  height: '24%',
  border: '3px solid white',
  transition: '1s',
  pointerEvents: 'none',
  backgroundImage: getBrickBackground({
    scale: 1.5,
    strokeColor: 'hsla(38, 0%, 100%, 1)',
  }),
};

const pesudoHoverStyle = {
  transitionDelay: '.5s',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  backdropFilter: 'blur(0px)',
  opacity: '0.1',
};

export const lessonInfoBoxStyle = {
  position: 'absolute',
  inset: { xs: '10% 5%', sm: '15% 10%', md: '20% 15%' },
  padding: { xs: '1% 2%', sm: '2% 3%', md: '5vw', lg: '3vw' },
  border: { xs: 'none', sm: '2px solid white' },
  zIndex: 1,
  ':before': {
    top: '-20%',
    left: '-7.5%',
    ...pesudoElementStyle,
  },
  ':after': {
    top: '90%',
    left: '67%',
    ...pesudoElementStyle,
  },
  ':hover:after, :hover:before': pesudoHoverStyle,
};

export const lessonTitleStyle = {
  color: 'white',
  zIndex: 1,
};

export const lessonDescriptStyle = {
  color: 'white',
  marginTop: '0.5rem',
  maxHeight: '60%',
  height: 'fit-content',
  overflow: 'hidden',
  padding: '3vw',
  zIndex: 1,
};

export const buttonStyle = {
  position: 'absolute',
  left: { xs: '3%', sm: '7%' },
  bottom: { xs: '3%', sm: '7%' },
  boxShadow: 'none',
  borderWidth: '3px',
  borderRadius: '30px',
  paddingInline: '1rem',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  paddingRight: '3rem',
  paddingLeft: '3rem',
  overflow: 'hidden',
  ':hover': {
    borderWidth: '3px',
    color: 'black',
  },
  ':before': {
    content: '""',
    position: 'absolute',
    left: '-100%',
    width: '100%',
    height: '100%',
    bgcolor: 'white',
    transition: '.5s',
    zIndex: '-1',
  },
  ':hover:before': {
    left: 0,
  },
};
