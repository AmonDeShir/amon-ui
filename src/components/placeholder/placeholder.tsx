import React, { useEffect, useRef, useState } from 'react';
import { DefaultTheme } from 'styled-components';
import { theme as defaultTheme } from '../../themes/theme';
import { Colors } from '../../types/style';
import { smallerFont } from '../../utils/smaller-font.ts/smaller-font';
import { useRect } from '../../utils/use-rect/use-rect';
import { useSizeSynchronizer } from '../../utils/use-size-synchronizer/use-size-synchronizer';
import { animations } from './placeholder.animations';
import { StyledPlaceholder, Container } from './placeholder.styles';

interface PlaceholderProps {
  /**
   * Placeholder will render this input and display itself on it.
   * Input's placeholder property will be overwritten.
   */
  input: JSX.Element;
  /**
   * Placeholder text
   * @default ""
   */
  value?: string;
  /**
   * Color of the placeholder's text.
   * @default "text"
   */
  color?: Colors;
  /**
   * Style of the placeholder's text.
   * @default "normal"
   */
  weight?: 'normal' | 'bold' | 'bolder' | 'lighter';
  /**
   * Where (in the Y axis) should be placed placeholder inside the wrapped component?
   * @default "center"
   */
  positionVertical?: 'top' | 'center' | 'bottom';
  /**
   * Where (in the X axis) should be placed placeholder inside the wrapped component?
   * @default "center"
   */
  positionHorizontal?: 'left' | 'center' | 'right';
  /**
   * Animation that will be played if user edit wrapped component.
   * Animation will be played reversed if user delete the wrapped component's value.
   *
   * If 'move-from-center' is selected, then the starting position of the placeholder will be center,
   * Then, when the user edits the wrapped component, the placeholder will move to its original vertical and horizontal position.
   *
   * @default "none"
   */
  animation?: 'none' | 'move-from-center' | 'disappear' | 'scale';
  /**
   * Style of the placeholder, provided by the StyledComponents's ThemeProvider
   */
  theme?: DefaultTheme;
}

/** Advantage placeholder for the text box component.
 * It can be positioned around wrapped component and also provide show and hide animations
 *
 * Placeholder's font-size will be set to the font smaller than input's size or equal if input's size is the smallest one.
 * If input's size property is undefined then placeholder's font-size will be set to "small".
 */
export const Placeholder = ({
  input,
  value = '',
  color = 'text',
  weight = 'normal',
  positionVertical = 'center',
  positionHorizontal = 'center',
  animation = 'none',
  theme = defaultTheme,
}: PlaceholderProps) => {
  const placeholder = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLElement>(null);
  const placeholderRect = useRect(placeholder);

  const [lastInputValue, setLastInputValue] = useState(input.props.value || '');

  useEffect(() => {
    inputRef.current = container.current.children[1] as HTMLElement;
  }, []);

  useSizeSynchronizer(inputRef, container);

  const playAnimation = (newValue: string) => {
    const wasEmpty = lastInputValue.length === 0;
    const isEmpty = newValue.length === 0;

    if (wasEmpty !== isEmpty) {
      animations(animation, placeholder, 0.25, newValue.length === 0);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (input.props.register.onChange) {
      input.props.register.onChange(e);
    }

    playAnimation(e.target.value);
    setLastInputValue(e.target.value);
  };

  const editHandler = (value: string) => {
    if (input.props.onEdit) {
      input.props.onEdit(value);
    }

    playAnimation(value);
    setLastInputValue(value);
  };

  return (
    <Container ref={container}>
      <StyledPlaceholder
        ref={placeholder}
        color={color}
        size={smallerFont(theme, input.props.size)}
        inputSize={input.props.size || 'normal'}
        weight={weight}
        animation={animation}
        inputBorder={input.props.border || 'full'}
        position={{
          x: positionHorizontal,
          y: positionVertical,
        }}
        placeholderSize={{
          w: `${placeholderRect.width}px`,
          h: `${placeholderRect.height}px`,
        }}
      >
        {value}
      </StyledPlaceholder>
      {React.cloneElement(input, {
        ...input.props,
        placeholder: '',
        onEdit: editHandler,
        register: input.props.register
          ? { ...input.props.register, onChange: changeHandler }
          : undefined,
      })}
    </Container>
  );
};
