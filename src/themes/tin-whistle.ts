import { DefaultTheme } from 'styled-components';

export const tinWhistle: DefaultTheme = {
  fontFamily: 'Josefin Sans',
  colors: {
    main: '#1A2623',
    accent: '#3F6991',
    text: 'white',
    textInverted: 'black',
  },
  border: {
    radius: '0em',
    width: '0.17em',
    color: 'main',
  },
  shadow: 'none',
  dropShadow: 'none',
  textShadow: '0.02em 0.02em 0.04em',
  textBox: {
    transparent: true,
    shadow: false,
  },
  progressBar: {
    transparent: true,
    shadow: false,
    innerShadow: 'inset 0em 0em 0.23em 0em rgba(0,0,0,0.25)',
    borderRadius: '0em',
  },
  font: {
    bigger: '40px',
    big: '30px',
    normal: '25px',
    small: '15px',
    smaller: '10px',
  },
};
