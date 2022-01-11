import styled, { css } from 'styled-components';
import { theme } from '../../themes/theme';
import { ThemeFonts } from '../../types/style';

export const Container = styled.div<{
  size: keyof ThemeFonts;
  textPosition: 'left' | 'right' | 'up' | 'down' | 'center';
}>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme, size }) => theme.font[size]};

  ${({ textPosition }) => {
    let direction = 'row-reverse';
    let height = '2em';

    if (textPosition === 'right') {
      direction = 'row';
    }

    if (textPosition === 'up') {
      direction = 'column-reverse';
      height = '4em';
    }

    if (textPosition === 'down') {
      direction = 'column';
      height = '4em';
    }

    return css`
      flex-direction: ${direction};
      height: ${height};
    `;
  }}
`;

Container.defaultProps = { theme };

export const StyledProgress = styled.div<{ progress: number }>`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 2em;
  padding: 0 0.5em;

  border-radius: ${({ theme }) => theme.progressBar.borderRadius};
  border-width: ${({ theme }) => theme.border.width};

  box-shadow: ${({ theme }) =>
    theme.progressBar.shadow ? `${theme.shadow}` : 'none'};

  background-color: ${({ theme }) =>
    theme.progressBar.transparent ? '#0000' : theme.colors.main};

  &::before {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    width: ${({ progress }) => progress}%;
    height: 100%;
    transition: width 0.5s ease;
    background-color: ${({ theme }) => theme.colors.accent};
    box-sizing: content-box;
  }

  &::after {
    content: ' ';
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: none;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors[theme.border.color]};
    border-radius: ${({ theme }) => theme.progressBar.borderRadius};
    border-width: ${({ theme }) => theme.border.width};
    box-shadow: ${({ theme }) => theme.progressBar.innerShadow};
  }
`;

StyledProgress.defaultProps = { theme };

export const Text = styled.div<{
  textPosition: 'left' | 'right' | 'up' | 'down' | 'center';
}>`
  z-index: 1;
  padding: 0.4em;
  text-align: center;
  text-shadow: ${({ theme }) => `${theme.textShadow} ${theme.colors.text}`};
  color: ${({ theme }) => theme.colors.textInverted};

  position: ${({ textPosition }) =>
    textPosition === 'center' ? 'absolute' : 'relative'};
`;

Text.defaultProps = { theme };
