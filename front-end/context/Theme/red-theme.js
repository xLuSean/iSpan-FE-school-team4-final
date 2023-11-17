import { MAIN_RED } from '@/assets/color-code';
import createColorTheme from '@/libs/CreateColorTheme';

const ColorTheme = createColorTheme(MAIN_RED);

export default function RedTheme({ children }) {
  return <ColorTheme>{children}</ColorTheme>;
}
