import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Button } from './button';
import { theme } from '../themes/theme';

describe('Button', () => {
  it(`should render as button element`, () => {
    render(<Button />);
    expect(screen.queryByRole('button')).toBeTruthy();
  });

  it(`should render with text from props`, () => {
    render(<Button text="click me" />);
    expect(screen.queryByText('click me')).toBeTruthy();
  });

  it(`should call onClick function if was clicked`, async () => {
    const callback = jest.fn();

    render(<Button onClick={callback} />);
    fireEvent.click(await screen.findByRole('button'));

    expect(callback).toBeCalledTimes(1);
  });

  describe('font size', () => {
    it(`should set font size to the 'smaller'`, () => {
      render(<Button text="text" size="smaller" />);
      expect(screen.queryByRole('button')).toHaveStyle(
        `font-size: ${theme.font.smaller}`,
      );
    });

    it(`should set font size to the 'small'`, () => {
      render(<Button text="text" size="small" />);
      expect(screen.queryByRole('button')).toHaveStyle(
        `font-size: ${theme.font.small}`,
      );
    });

    it(`should set font size to the 'normal'`, () => {
      render(<Button text="text" size="normal" />);
      expect(screen.queryByRole('button')).toHaveStyle(
        `font-size: ${theme.font.normal}`,
      );
    });

    it(`should set font size to the 'big'`, () => {
      render(<Button text="text" size="big" />);
      expect(screen.queryByRole('button')).toHaveStyle(
        `font-size: ${theme.font.big}`,
      );
    });

    it(`should set font size to the 'bigger'`, () => {
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

    it(`should change border color to the main color`, () => {
      render(
        <ThemeProvider theme={testTheme('main')}>
          <Button />
        </ThemeProvider>,
      );

      expect(screen.queryByRole('button')).toHaveStyle(
        `border-color: ${theme.colors.main}`,
      );
    });

    it(`should change border color to the accent color`, () => {
      render(
        <ThemeProvider theme={testTheme('accent')}>
          <Button />
        </ThemeProvider>,
      );

      expect(screen.queryByRole('button')).toHaveStyle(
        `border-color: ${theme.colors.accent}`,
      );
    });

    it(`should load border, box-shadow, background-color and text color from theme`, () => {
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
        `color: ${theme.colors.textInverted}`,
      );
    });
  });
});
