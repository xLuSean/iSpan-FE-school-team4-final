import { Box } from '@mui/material';
import getBrickBackground from '@/libs/getBrickBackground';

const BrickWallPaper = (props) => {
  const wallpaperStyle = {
    scale: props.scale,
    rotate: props.rotate,
    brickColor: props.brickColor,
    strokeWidth: props.strokeWidth,
    strokeColor: props.strokeColor,
    ...props.brickstyle,
  };
  return (
    <Box
      sx={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none',
        backgroundImage: getBrickBackground(wallpaperStyle),
      }}
    ></Box>
  );
};

export default BrickWallPaper;
