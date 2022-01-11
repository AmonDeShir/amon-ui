import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../themes/theme';
import { TextBox } from './text-box';

const testTheme = (
  textbox: Partial<typeof theme.textBox> = {},
  border: Partial<typeof theme.border> = {},
) => ({
  ...theme,
  textBox: {
    ...theme.textBox,
    ...textbox,
  },
  border: {
    ...theme.border,
    ...border,
  },
});

describe('TextBox', () => {
  it(`should render with the "textbox" role`, () => {
    render(<TextBox />);
    expect(screen.queryByRole('textbox')).toBeTruthy();
  });

  describe(`placeholder`, () => {
    it(`should render the value of the placeholder property as a child`, () => {
      render(<TextBox placeholder="Text" />);
      expect(screen.queryByPlaceholderText('Text')).toBeTruthy();
    });
  });

  describe('autocompletion', () => {
    it(`should disable the autocompletion functionally if the autocomplete property is undefined`, () => {
      render(<TextBox />);
      expect(screen.queryByRole('textbox')).toHaveAttribute(
        'autoComplete',
        'off',
      );
    });

    it(`should enable the autocompletion functionally if the autocomplete property is set to true`, () => {
      render(<TextBox autocomplete />);
      expect(screen.queryByRole('textbox')).toHaveAttribute(
        'autoComplete',
        'on',
      );
    });

    it(`should disable the autocompletion functionally if the autocomplete property is set to false`, () => {
      render(<TextBox autocomplete={false} />);
      expect(screen.queryByRole('textbox')).toHaveAttribute(
        'autoComplete',
        'off',
      );
    });
  });

  describe('type', () => {
    it(`should render as input type component with type attribute set to 'text' if the type property is set to "text"`, () => {
      render(<TextBox placeholder="text" type="text" />);
      expect(screen.queryByPlaceholderText('text')).toHaveProperty(
        'type',
        'text',
      );
    });

    it(`should render as input type component with type attribute set to 'password' if the type property is set to "password"`, () => {
      render(<TextBox placeholder="password" type="password" />);
      expect(screen.queryByPlaceholderText('password')).toHaveProperty(
        'type',
        'password',
      );
    });

    it(`should render as input type component with type attribute set to 'email' if the type property is set to "email"`, () => {
      render(<TextBox placeholder="email" type="email" />);
      expect(screen.queryByPlaceholderText('email')).toHaveProperty(
        'type',
        'email',
      );
    });
  });

  describe('font size', () => {
    it(`should render the component with the 'smaller' font`, () => {
      render(<TextBox size="smaller" />);
      expect(screen.queryByRole('textbox')).toHaveStyle(
        `font-size: ${theme.font.smaller}`,
      );
    });

    it(`should render the component with the 'small' font`, () => {
      render(<TextBox size="small" />);
      expect(screen.queryByRole('textbox')).toHaveStyle(
        `font-size: ${theme.font.small}`,
      );
    });

    it(`should render the component with the 'normal' font`, () => {
      render(<TextBox size="normal" />);
      expect(screen.queryByRole('textbox')).toHaveStyle(
        `font-size: ${theme.font.normal}`,
      );
    });

    it(`should render the component with the 'big' font`, () => {
      render(<TextBox size="big" />);
      expect(screen.queryByRole('textbox')).toHaveStyle(
        `font-size: ${theme.font.big}`,
      );
    });

    it(`should render the component with the 'bigger' font`, () => {
      render(<TextBox size="bigger" />);
      expect(screen.queryByRole('textbox')).toHaveStyle(
        `font-size: ${theme.font.bigger}`,
      );
    });
  });

  describe(`border`, () => {
    it(`shouldn't display the component's border if the border property is set to 'null'`, () => {
      render(<TextBox border="none" />);
      expect(screen.queryByRole('textbox')).toHaveStyle(`border: none`);
    });

    it(`should display only the bottom border if the border property is set to 'single-line'`, () => {
      render(<TextBox border="single-line" />);

      expect(screen.queryByRole('textbox')).toHaveStyle(`border-radius: 0`);
      expect(screen.queryByRole('textbox')).toHaveStyle(`border-left: none`);
      expect(screen.queryByRole('textbox')).toHaveStyle(`border-top: none`);
      expect(screen.queryByRole('textbox')).toHaveStyle(`border-right: none`);
      expect(screen.queryByRole('textbox')).not.toHaveStyle(
        `border-bottom: none`,
      );
    });

    it(`should display the border around the component if the border property is set to 'full'`, () => {
      render(<TextBox border="full" />);

      expect(screen.queryByRole('textbox')).not.toHaveStyle(`
        border-left: none
      `);

      expect(screen.queryByRole('textbox')).not.toHaveStyle(`
        border-top: none
      `);

      expect(screen.queryByRole('textbox')).not.toHaveStyle(`
        border-bottom: none
      `);

      expect(screen.queryByRole('textbox')).not.toHaveStyle(`
        border-right: none
      `);
    });
  });

  describe('onEdit', () => {
    it(`should call the onEdit property if the register property is undefined`, async () => {
      const callback = jest.fn();
      render(<TextBox placeholder="text" onEdit={callback} />);

      fireEvent.focus(await screen.findByPlaceholderText('text'));
      fireEvent.input(await screen.findByPlaceholderText('text'), {
        target: { value: 'Test' },
      });

      expect(callback).toBeCalledWith('Test');
    });

    it(`shouldn't call onEdit property if the register prop is defined`, async () => {
      const callback = jest.fn();
      render(
        <TextBox placeholder="text" onEdit={callback} register={{} as any} />,
      );

      fireEvent.focus(await screen.findByPlaceholderText('text'));
      fireEvent.input(await screen.findByPlaceholderText('text'), {
        target: { value: 'Test' },
      });

      expect(callback).not.toBeCalled();
    });
  });

  describe(`theming`, () => {
    describe(`filter`, () => {
      it(`should be and and set to none if theme.textBox.shadow is falsy`, () => {
        render(
          <ThemeProvider theme={testTheme({ shadow: false })}>
            <TextBox />
          </ThemeProvider>,
        );

        expect(screen.queryByRole('textbox')).toHaveStyle(`filter: none`);
      });

      it(`should be set to the theme.drop-shadow if theme.textBox.shadow is truthy`, () => {
        render(
          <ThemeProvider theme={testTheme({ shadow: true })}>
            <TextBox />
          </ThemeProvider>,
        );

        expect(screen.queryByRole('textbox')).toHaveStyle(
          `filter: ${theme.dropShadow}`,
        );
      });
    });

    describe(`background-color`, () => {
      it(`should be set to transparent color if theme.textBox.transparent is truthy`, () => {
        render(
          <ThemeProvider theme={testTheme({ transparent: true })}>
            <TextBox />
          </ThemeProvider>,
        );

        expect(screen.queryByRole('textbox')).toHaveStyle(
          `background-color: #0000`,
        );
      });

      it(`should be set to theme.colors.main if theme.textBox.transparent is falsy`, () => {
        render(
          <ThemeProvider theme={testTheme({ transparent: false })}>
            <TextBox />
          </ThemeProvider>,
        );

        expect(screen.queryByRole('textbox')).toHaveStyle(
          `background-color: ${theme.colors.main}`,
        );
      });
    });

    describe(`border-color`, () => {
      it(`should change border color to the main color`, () => {
        render(
          <ThemeProvider theme={testTheme({}, { color: 'main' })}>
            <TextBox />
          </ThemeProvider>,
        );

        expect(screen.queryByRole('textbox')).toHaveStyle(
          `border-color: ${theme.colors.main}`,
        );
      });

      it(`should change border color to the accent color`, () => {
        render(
          <ThemeProvider theme={testTheme({}, { color: 'accent' })}>
            <TextBox />
          </ThemeProvider>,
        );

        expect(screen.queryByRole('textbox')).toHaveStyle(
          `border-color: ${theme.colors.accent}`,
        );
      });
    });

    it(`should load border, color and font-family from theme`, () => {
      render(<TextBox />);

      expect(screen.queryByRole('textbox')).toHaveStyle(
        `color: ${theme.colors.text}`,
      );
      expect(screen.queryByRole('textbox')).toHaveStyle(
        `border-radius: ${theme.border.radius}`,
      );
      expect(screen.queryByRole('textbox')).toHaveStyle(
        `border-width: ${theme.border.width}`,
      );
      expect(screen.queryByRole('textbox')).toHaveStyle(
        `font-family: ${theme.fontFamily}`,
      );
    });
  });
});
