import { DefaultTheme } from 'styled-components';
import { ThemeFonts } from '../../types/style';

export const smallerFont = (
  theme: DefaultTheme,
  originalFont?: keyof ThemeFonts,
) => {
  const fonts = Object.keys(theme.font) as (keyof ThemeFonts)[];
  const fontIndex = fonts.indexOf(originalFont);

  if (fontIndex === -1) {
    return 'small' as 'small';
  }

  return fonts[fontIndex + 1] || fonts[fonts.length - 1];
};
