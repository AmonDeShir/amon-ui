import { ThemeFonts } from '../../types/style';
import StyledButton from './button.styles';

interface ButtonProps {
  /**
   * The text thats will be rendered as a button's child.
   */
  text?: string;
  /**
   * The size property controls button's width and height.
   * @values smaller, small, normal, big, bigger
   */
  size?: keyof ThemeFonts;
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
