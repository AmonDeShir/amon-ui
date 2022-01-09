import { ThemeFonts } from '../../types/style';
import StyledButton from './button.styles';

interface ButtonProps {
  /**
   * Text that will be display on button
   * @default ""
   */
  text?: string;
  /**
   * How big should be button?
   * @default "normal"
   */
  size?: keyof ThemeFonts;
  /**
   * Optional click handler
   * @default undefined
   */
  onClick?: () => void;
}

export const Button = ({
  text = '',
  size = 'normal',
  onClick,
}: ButtonProps) => (
  <StyledButton size={size} onClick={onClick}>
    {text}
  </StyledButton>
);
