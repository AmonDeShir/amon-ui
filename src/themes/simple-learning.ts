import { DefaultTheme } from 'styled-components';

export const simpleLearningTheme: DefaultTheme = {
  fontFamily: 'Roboto',
  colors: {
    main: 'white',
    accent: '#BA6642',
    text: 'black',
    textInverted: 'white',
  },
  border: {
    radius: '1.2em',
    width: '0.2em',
    color: 'accent',
  },
  textBox: {
    transparent: true,
    shadow: true,
  },
  progressBar: {
    transparent: true,
    shadow: false,
    borderRadius: '0.72em',
    innerShadow: 'inset 0em 0em 0.23em 0em rgba(0,0,0,0.25)',
  },
  shadow: '0.06em 0.06em 0.23em 0.06em rgba(0,0,0,0.5)',
  dropShadow: `drop-shadow(0em 0.16em 0.12em rgba(0,0,0,0.3))`,
  textShadow: '0.01em 0.01em 0.125em',
  font: {
    bigger: '38px',
    big: '25px',
    normal: '18px',
    small: '15px',
    smaller: '10px',
  },
};
