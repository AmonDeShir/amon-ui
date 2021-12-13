import 'styled-components';

export type ThemeColors = {
  main: string;
  accent: string;
  text: string;
  textInverted: string;
};

export type ThemeFonts = {
  bigger: string;
  big: string;
  normal: string;
  small: string;
  smaller: string;
};
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeColors;
    font: ThemeFonts;
    shadow: string;
    border: {
      radius: string;
      width: string;
      color: 'main' | 'accent';
    };
  }
}

export type Colors =
  | 'first'
  | 'second'
  | 'background'
  | 'text'
  | 'text-inverted';
