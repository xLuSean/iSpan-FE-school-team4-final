export const containerStyle = { py: '2rem', overflow: 'hidden' };

export const cardBoxStyle = {
  '--bigCard-height': '380px',
  '--imgBox-ratio': '80%',
  '--contentCard-width': '90%',
  '--contentCard-radius': 'clamp(5px, .5rem, 15px)',

  position: 'relative',
  height: 'var(--bigCard-height)',
};

export const imgBoxStyle = {
  position: 'absolute',
  opacity: 0,
  overflow: 'hidden',
  borderRadius: 'var(--contentCard-radius)',
  width: 'var(--contentCard-width)',
  height: 'var(--imgBox-ratio)',
  animation: '2s ease-out fade-in forwards',
  '@keyframes fade-in': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
};

export const cardBodyStyle = {
  position: 'absolute',
  width: 'var(--contentCard-width)',
  right: '-100%',
  bottom: '0',
  padding: { xs: 2, sm: 3, md: 4 },
  borderRadius: 'var(--contentCard-radius)',
  bgcolor: 'rgba(235, 235, 235, 0.97)',
  animation: '1.5s ease-out 0.5s slide-left forwards',
  '@keyframes slide-left': {
    '0%': {
      transform: 'translateX(0)',
    },
    '100%': {
      transform: 'translateX(-115%)',
    },
  },
};

export const cardBodyTitle = {
  position: 'relative',
  ':before': {
    position: 'absolute',
    content: '""',
    bottom: '-0.5rem',
    height: '2px',
    bgcolor: 'var(--steel-grey)',
    animation: '1s ease-in-out 1.75s spread forwards',
  },
  '@keyframes spread': {
    '0%': {
      width: '0%',
      left: '50%',
    },
    '100%': {
      width: '102%',
      left: '-1%',
    },
  },
};

export const cardBodyInfo = {
  marginTop: { xs: 2, sm: 3, md: 4 },
  marginBottom: { xs: 1, sm: 2 },
  paddingInline: 2,
  textIndent: '2rem',
};

export const tagStyle = {
  marginRight: { xs: '.5rem', sm: '.7rem' },
  marginBottom: { xs: '.5rem', sm: '1rem' },
  textAlign: 'center',
  letterSpacing: '.2rem',
  fontSize: '.8rem',
  fontWeight: 'bold',
  paddingBottom: '.1rem',
  paddingLeft: '.2rem',
};

export const coachNameBoxStyle = {
  width: 'fit-content',
  paddingRight: '1rem',
  marginLeft: 'auto',
  borderBottom: '2px solid var(--steel-grey)',
  'h5, h6': {
    display: 'inline-block',
  },
  h6: {
    fontWeight: 'bold',
    marginRight: '1rem',
  },
  h5: {
    fontStyle: 'italic',
    marginLeft: '1rem',
  },
};

export const lessonsBoxStyle = { marginTop: '2rem', py: 4, width: '100%' };

export const lessonsCardGridStyle = { justifyContent: 'center', gap: '2rem' };

export const locationTitleStyle = {
  color: 'white',
  width: 'fit-content',
  marginBottom: 5,
  padding: 2,
  paddingRight: '5rem',
  borderBottom: '2px solid white',
};
