import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  MAIN_RED,
  MAIN_BLACK,
  LIGHT_GRAY,
  LIGHT_GRAY2,
  MAIN_WHITE,
  FORTRESS,
  DEEPGREY,
  LIGHT_GREY,
  STEEL_LIGHT_GREY,
  STEEL_GREY,
} from '@/assets/color-code';

const theme = createTheme({
  palette: {
    main_red: { main: MAIN_RED, contrastText: MAIN_WHITE },
    main_black: { main: MAIN_BLACK, contrastText: MAIN_WHITE },
    light_gray: { main: LIGHT_GRAY },
    light_gray2: { main: LIGHT_GRAY2 },
    main_white: { main: MAIN_WHITE, contrastText: MAIN_BLACK },
    fortress: { main: FORTRESS },
    deepgrey: { main: DEEPGREY, contrastText: MAIN_WHITE },
    light_grey: { main: LIGHT_GREY },
    steel_light_grey: { main: STEEL_LIGHT_GREY },
    steel_grey: { main: STEEL_GREY, contrastText: MAIN_WHITE },
  },
});

export const useMainTheme = () => theme;

export default function MainTheme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
