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
    fontFamily: string;
    shadow: string;
    dropShadow: string;
    textShadow: string;
    border: {
      radius: string;
      width: string;
      color: 'main' | 'accent';
    };
    textBox: {
      transparent: boolean;
      shadow: boolean;
    };
    progressBar: {
      transparent: boolean;
      shadow: boolean;
      innerShadow: string;
      borderRadius: string;
    };
  }
}

export type Colors = 'main' | 'accent' | 'text' | 'textInverted';
