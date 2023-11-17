const cardRatioStyle = CSS.supports('aspect-ratio', 1)
  ? { aspectRatio: '9 / 12' }
  : { height: '500px' };

export const cardGridStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  ':before': {
    content: '""',
    position: 'absolute',
    width: '78%',
    height: '82%',
    top: '9%',
    left: '11%',
    border: '3px solid white',
  },
  ...cardRatioStyle,
};

export const coachCardBoxStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '-10%',
  left: '-10%',
  transition: '.5s',
};

export const imageBoxStyle = {
  position: 'absolute',
  left: '20%',
  top: '23%',
  transform: 'rotateZ(-10deg)',
  width: '55%',
  height: '55%',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
  transition: '.5s',
  zIndex: 2,
  ':hover': {
    boxShadow: '0 0 10px 2px rgba(200, 170, 0, 0.95)',
  },
};

export const cardBehindStyle = {
  position: 'absolute',
  overflow: 'hidden',
  bottom: '2%',
  right: '5%',
  width: '80%',
  height: '85%',
  padding: '2rem',
  textAlign: 'right',
  borderRadius: '10px',
  bgcolor: 'var(--steel-grey)',
};

export const cardTitleStyle = {
  paddingBottom: '.2rem',
  paddingRight: '.7rem',
  color: 'white',
  borderBottom: '2px solid white',
};

const cardButtonStyle = {
  position: 'absolute',
  right: '5%',
  bottom: '-3%',
  borderWidth: '3px',
  overflow: 'hidden',
  ':before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '-100%',
    bgcolor: 'white',
    transition: '.5s',
    zIndex: '-1',
  },
  ':hover': {
    borderWidth: '3px',
    color: 'var(--steel-grey)',
    ':before': {
      left: 0,
    },
  },
};

export const cardFrontStyle = {
  position: 'absolute',
  right: '7%',
  bottom: '2%',
  paddingBlock: '.5rem',
  paddingInline: '1rem',
  color: 'white',
  width: '76%',
  height: '36%',
  borderBottomLeftRadius: '15px',
  borderBottomRightRadius: '15px',
  bgcolor: 'var(--steel-grey)',
  boxShadow: '0 -6px 3px -3px rgba(0, 0, 0, 0.2)',
  transition: '.5s',
  zIndex: 3,
  button: {
    ...cardButtonStyle,
    transition: 'opacity .5s',
    opacity: 0,
  },
};

export const cardInfoStyle = {
  position: 'relative',
  width: '100%',
  height: '80%',
  overflow: 'auto',
  textIndent: '2rem',
  fontSize: '.9rem',
  '::-webkit-scrollbar': {
    display: 'none',
  },

  backgroundImage: `
    linear-gradient(var(--steel-grey) 30%, hsla(0,0%,100%,0)),
    linear-gradient(hsla(0,0%,100%,0), var(--steel-grey) 70%),
    radial-gradient(at top, rgba(255,255,255,.5), transparent 70%),
    radial-gradient(at bottom, rgba(255,255,255,.5), transparent 70%)`,

  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top, bottom, top, bottom',
  backgroundSize: '100% 3rem, 100% 3rem, 100% 1rem, 100% 1rem',
  backgroundAttachment: 'local, local, scroll, scroll',
};

export const drawImgAnimation = {
  transform: 'translate3d(-4rem, -8rem, 0) rotateZ(0deg)',
};

export const cardDownAnimation = {
  transition: '.5s .2s',
  top: '3%',
  left: '5%',
};

export const showInfoAnimation = {
  transition: '.5s .5s',
  transform: 'translateY(-10%)',
  height: '42%',
  button: {
    ...cardButtonStyle,
    transition: 'opacity .5s 1s',
    opacity: 1,
  },
};
