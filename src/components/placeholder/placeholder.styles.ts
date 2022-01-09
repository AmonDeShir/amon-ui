import styled, { css } from 'styled-components';
import { theme } from '../../themes/theme';
import { Colors, ThemeFonts } from '../../types/style';

/*

  prevent (webkit) input:-internal-autofill-selected from overwriting background-color
  transition: background-color 2147483647s
    ${({ styledPlaceholder }) =>
      styledPlaceholder &&
      css`
        &::placeholder {
          opacity: 0;
        }
      `};
      
 */

export const Container = styled.div`
  position: relative;
`;

type Props = {
  animation: 'none' | 'move-from-center' | 'disappear' | 'scale';
  color: Colors;
  size: keyof ThemeFonts;
  inputSize: keyof ThemeFonts;
  weight: 'normal' | 'bold' | 'bolder' | 'lighter';

  position: {
    x: 'left' | 'center' | 'right';
    y: 'top' | 'center' | 'bottom';
  };

  inputBorder: 'full' | 'single-line' | 'none';
  placeholderSize: {
    w: string;
    h: string;
  };
};

export const StyledPlaceholder = styled.div<Props>`
  position: absolute;
  z-index: 1;
  color: ${({ theme, color }) => theme.colors[color]};
  font-size: ${({ theme, size }) => theme.font[size]};
  font-weight: ${({ weight }) => weight};
  font-family: ${({ theme }) => theme.fontFamily};

  &:before {
    content: ' ';
    position: absolute;
    z-index: -1;
    background-color: ${({ theme }) => theme.colors.main};
    width: ${({ placeholderSize }) => placeholderSize.w};
    font-size: ${({ theme, inputSize }) => theme.font[inputSize]};

    height: ${({ theme }) => theme.border.width};
    top: ${({ theme }) => `calc(50% - ${theme.border.width} / 2)`};
    left: -2%;
    padding: 0% 2%;
    box-sizing: content-box;

    ${({ inputBorder, position }) => {
      if (inputBorder === 'full' && position.y !== 'center') {
        return css`
          display: block;
        `;
      }

      if (inputBorder === 'single-line' && position.y === 'bottom') {
        return css`
          display: block;
        `;
      }

      return css`
        display: none;
      `;
    }}
  }

  ${({ position, inputBorder, theme, placeholderSize, animation }) => {
    let left = '0';
    const border = `max(${theme.border.radius}, calc(${theme.border.width}*2))`;

    if (position.x === 'left' && inputBorder === 'full') {
      left = border;
    }

    if (position.x === 'center') {
      left = `calc(50% - ${placeholderSize.w}/2)`;
    }

    if (position.x === 'right') {
      left = `calc(100% - ${border} - ${placeholderSize.w})`;
    }

    if (animation === 'move-from-center' && position.x !== 'center') {
      return css`
        --animation-left-invert: ${`calc(50% - ${placeholderSize.w}/2)`};
        --animation-left: ${left};
        left: var(--animation-left-invert);
      `;
    }

    return css`
      left: ${left};
    `;
  }}

  ${({ position, inputBorder, theme, placeholderSize, animation }) => {
    let top = '0';

    if (position.y === 'top' && inputBorder === 'full') {
      top = `calc(${theme.border.width}/2 - ${placeholderSize.h}/2)`;
    }

    if (position.y === 'center') {
      top = `calc(50% - ${placeholderSize.h}/2)`;
    }

    if (position.y === 'bottom') {
      top = `calc(100% - ${theme.border.width}/2 - ${placeholderSize.h}/2)`;
    }

    if (animation === 'move-from-center' && position.y !== 'center') {
      return css`
        --animation-top: ${top};
        --animation-top-invert: ${`calc(50% - ${placeholderSize.h}/2)`};
        top: var(--animation-top-invert);
      `;
    }

    return css`
      top: ${top};
    `;
  }}
`;

StyledPlaceholder.defaultProps = {
  theme,
};
