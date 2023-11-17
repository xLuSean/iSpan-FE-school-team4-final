import { MAIN_WHITE } from '@/assets/color-code';
import createColorTheme from '@/libs/CreateColorTheme';

const ColorTheme = createColorTheme(MAIN_WHITE);

export default function WhiteTheme({ children }) {
  return <ColorTheme>{children}</ColorTheme>;
}
