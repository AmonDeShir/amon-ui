import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Button } from './button';
import { theme } from '../../themes/theme';

describe('Button', () => {
  it(`should be rendered as a button element`, () => {
    render(<Button />);
    expect(screen.queryByRole('button')).toBeTruthy();
  });

  it(`should be rendered with the text from the properties`, () => {
    render(<Button text="click me" />);
    expect(screen.queryByText('click me')).toBeTruthy();
  });

  it(`should call the onClick function if it was clicked`, async () => {
    const callback = jest.fn();

    render(<Button onClick={callback} />);
    fireEvent.click(await screen.findByRole('button'));

    expect(callback).toBeCalledTimes(1);
  });

  describe('font size', () => {
    it(`should set the font's size to 'smaller'`, () => {
      render(<Button text="text" size="smaller" />);
      expect(screen.queryByRole('button')).toHaveStyle(
        `font-size: ${theme.font.smaller}`,
      );
    });

    it(`should set the font's size to 'small'`, () => {
      render(<Button text="text" size="small" />);
      expect(screen.queryByRole('button')).toHaveStyle(
        `font-size: ${theme.font.small}`,
      );
    });

    it(`should set the font's size to 'normal'`, () => {
      render(<Button text="text" size="normal" />);
      expect(screen.queryByRole('button')).toHaveStyle(
        `font-size: ${theme.font.normal}`,
      );
    });

    it(`should set the font's size to 'big'`, () => {
      render(<Button text="text" size="big" />);
      expect(screen.queryByRole('button')).toHaveStyle(
        `font-size: ${theme.font.big}`,
      );
    });

    it(`should set the font's size to 'bigger'`, () => {
      render(<Button text="text" size="bigger" />);
      expect(screen.queryByRole('button')).toHaveStyle(
        `font-size: ${theme.font.bigger}`,
      );
    });
  });

  describe(`theming`, () => {
    const testTheme = (color: 'main' | 'accent') => {
      const result = { ...theme };
      result.border.color = color;

      return result;
    };

    it(`should change the border's color to the theme's main color`, () => {
      render(
        <ThemeProvider theme={testTheme('main')}>
          <Button />
        </ThemeProvider>,
      );

      expect(screen.queryByRole('button')).toHaveStyle(
        `border-color: ${theme.colors.main}`,
      );
    });

    it(`should change the border's color to the theme's accent color`, () => {
      render(
        <ThemeProvider theme={testTheme('accent')}>
          <Button />
        </ThemeProvider>,
      );

      expect(screen.queryByRole('button')).toHaveStyle(
        `border-color: ${theme.colors.accent}`,
      );
    });

    it(`should load css properties (border, box-shadow, background-color, font-family, color) from the theme`, () => {
      render(<Button />);

      expect(screen.queryByRole('button')).toHaveStyle(
        `background-color: ${theme.colors.accent}`,
      );
      expect(screen.queryByRole('button')).toHaveStyle(
        `box-shadow: ${theme.shadow}`,
      );
      expect(screen.queryByRole('button')).toHaveStyle(
        `border-radius: ${theme.border.radius}`,
      );
      expect(screen.queryByRole('button')).toHaveStyle(
        `border-width: ${theme.border.width}`,
      );
      expect(screen.queryByRole('button')).toHaveStyle(
        `font-family: ${theme.fontFamily}`,
      );
      expect(screen.queryByRole('button')).toHaveStyle(
        `color: ${theme.colors.textInverted}`,
      );
    });
  });
});
