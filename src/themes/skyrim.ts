import { DefaultTheme } from 'styled-components';

export const skyrimTheme: DefaultTheme = {
  fontFamily: 'Atomic Age',
  colors: {
    main: '#202924',
    accent: '#F1F2F4',
    text: 'white',
    textInverted: 'black',
  },
  shadow: 'inset 0em 0em 0.67em 0.17em rgba(0,0,0,0.5)',
  dropShadow: `drop-shadow(0em 0em 0.17em rgba(0,0,0,0.5))`,
  textBox: {
    transparent: true,
    shadow: false,
  },
  border: {
    radius: '0em',
    width: '0.12em',
    color: 'accent',
  },
  font: {
    bigger: '40px',
    big: '30px',
    normal: '25px',
    small: '15px',
    smaller: '10px',
  },
};
