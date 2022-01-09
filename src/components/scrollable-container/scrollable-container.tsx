import { StyledScrollbar } from './scrollable-container.styles';

interface ScrollableContainerProps {
  /**
   * If the width of component content is greater than this property then the horizontal scrollbar is displayed.
   * @default "100%"
   */
  width?: string;
  /**
   * If the height of component content is greater than this property then the vertical scrollbar is displayed.
   * @default "100%"
   */
  height?: string;
}

export const ScrollableContainer = ({
  children,
  width = '100%',
  height = '100%',
}: React.PropsWithChildren<ScrollableContainerProps>) => (
  <StyledScrollbar noDefaultStyles size={{ width, height }}>
    {children}
  </StyledScrollbar>
);
