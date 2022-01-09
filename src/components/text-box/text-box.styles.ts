import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';
import { theme } from '../../themes/theme';
import { ThemeFonts } from '../../types/style';

/** A workaround that fixes the problem of custom props of the styled.input */
const Input = styled.input`` as StyledComponent<
  'div',
  DefaultTheme,
  {
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    autoComplete?: 'on' | 'off';
    defaultValue?: string;
  },
  never
>;

const StyledInput = styled(Input)<{
  size: keyof ThemeFonts;
  border: 'full' | 'single-line' | 'none';
}>`
  padding: 0 0.5em;
  height: 2em;

  filter: ${({ theme }) =>
    theme.textBox.shadow ? `${theme.dropShadow}` : 'none'};

  background-color: ${({ theme }) =>
    theme.textBox.transparent ? '#0000' : theme.colors.main};

  border-color: ${({ theme }) => theme.colors[theme.border.color]};
  border-radius: ${({ theme }) => theme.border.radius};
  border-width: ${({ theme }) => theme.border.width};
  border-style: solid;

  ${({ border }) => {
    switch (border) {
      case 'none': {
        return css`
          border: none;
        `;
      }

      case 'single-line': {
        return css`
          border-left: none;
          border-top: none;
          border-right: none;
          border-radius: 0;
        `;
      }

      default: {
        return css``;
      }
    }
  }}

  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme, size }) => theme.font[size]};
  font-family: ${({ theme }) => theme.fontFamily};
  text-align: center;
`;

StyledInput.defaultProps = { theme };
export default StyledInput;
