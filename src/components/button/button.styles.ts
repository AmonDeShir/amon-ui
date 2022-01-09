import styled from 'styled-components';
import { theme } from '../../themes/theme';
import { ThemeFonts } from '../../types/style';

const StyledButton = styled.button<{ size: keyof ThemeFonts }>`
  padding: 0 1.67em;
  height: 2em;
  background-color: ${({ theme }) => theme.colors.accent};
  box-shadow: ${({ theme }) => theme.shadow};

  border-color: ${({ theme }) => theme.colors[theme.border.color]};
  border-radius: ${({ theme }) => theme.border.radius};
  border-width: ${({ theme }) => theme.border.width};
  border-style: solid;

  color: ${({ theme }) => theme.colors.textInverted};
  font-size: ${({ theme, size }) => theme.font[size]};
  font-family: ${({ theme }) => theme.fontFamily};
  text-align: center;

  user-select: none;
  box-sizing: border-box;
  backface-visibility: hidden;
  transition: transform 0.25s;

  &:hover {
    cursor: pointer;
    transform: scale(1.048, 1.048) translateZ(0);
  }

  &:active {
    transform: scale(0.962, 0.962) translateZ(0);
  }
`;

StyledButton.defaultProps = { theme };
export default StyledButton;
