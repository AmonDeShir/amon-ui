import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../themes/theme';
import { ProgressBar } from './progress-bar';

const testTheme = (
  progressBar: Partial<typeof theme.progressBar> = {},
  border: Partial<typeof theme.border> = {},
) => ({
  ...theme,
  progressBar: {
    ...theme.progressBar,
    ...progressBar,
  },
  border: {
    ...theme.border,
    ...border,
  },
});

const getPseudoElement = (type: 'before' | 'after') => {
  const element = screen.queryByRole('progressbar')?.children[0];
  const classNames = element?.className.replace(/ /g, '|');

  if (!classNames) {
    return [];
  }

  const rules = [...document.styleSheets]
    .flatMap(({ cssRules }) => [...cssRules])
    .map(({ cssText }) => cssText);

  const predicate = (text: string) =>
    [...text.matchAll(new RegExp(`\\.(${classNames})::${type}`, 'g'))].length >
    0;

  return rules
    .filter(predicate)
    .at(-1)
    .split(';')
    .map((s) => s.replace(' ', ''))
    .map((s) => s.replace(/.*content:/, 'content:'))
    .slice(0, -1);
};

describe('ProgressBar', () => {
  describe('size', () => {
    it(`should set the font size to the one selected from the theme via the size property`, () => {
      render(<ProgressBar size="bigger" />);

      expect(screen.queryByRole('progressbar')).toHaveStyle(
        `font-size: ${theme.font.bigger}`,
      );
    });

    it(`should load the 'normal' font-size if the size property is undefined`, () => {
      render(<ProgressBar />);

      expect(screen.queryByRole('progressbar')).toHaveStyle(
        `font-size: ${theme.font.normal}`,
      );
    });
  });

  describe('aria', () => {
    it(`should load aria properties for the progress-bar`, () => {
      render(<ProgressBar max={200} value={150} />);
      const progress = screen.queryByRole('progressbar');

      expect(progress).toHaveAttribute('role', 'progressbar');
      expect(progress).toHaveAttribute('aria-valuemin', '0');
      expect(progress).toHaveAttribute('aria-valuemax', '200');
      expect(progress).toHaveAttribute('aria-valuenow', '150');
    });
  });

  describe('max', () => {
    it(`should set the progress to 100% percent if max is equal to zero`, () => {
      render(<ProgressBar max={0} value={150} />);

      expect(getPseudoElement('before').includes('width: 100%')).toBeTruthy();
      expect(screen.queryByText('100%')).toBeTruthy();
    });

    it(`should set the progress to 100% percent if max is lesser than zero`, () => {
      render(<ProgressBar max={-23} value={150} />);

      expect(getPseudoElement('before').includes('width: 100%')).toBeTruthy();
      expect(screen.queryByText('100%')).toBeTruthy();
    });
  });

  describe('value', () => {
    it(`should set the progress-bar to 0% if the value property is lesser than max`, () => {
      render(<ProgressBar max={100} value={-150.25} />);

      expect(getPseudoElement('before').includes('width: 0%')).toBeTruthy();
      expect(screen.queryByText('-150.25%')).toBeTruthy();
    });

    it(`should set the progress to 20%`, () => {
      render(<ProgressBar max={200} value={40} />);

      expect(getPseudoElement('before').includes('width: 20%')).toBeTruthy();
      expect(screen.queryByText('20%')).toBeTruthy();
    });
  });

  describe('text', () => {
    it(`should display text`, () => {
      render(<ProgressBar text="value:" />);

      expect(screen.queryByText(`value: 0%`)).toBeDefined();
    });

    it(`shouldn't display text if the text property is an empty string`, () => {
      render(<ProgressBar text="" />);

      expect(screen.queryByText(`0%`)).toBeDefined();
    });

    it(`shouldn't display text if the text property is undefined`, () => {
      render(<ProgressBar />);

      expect(screen.queryByText(`0%`)).toBeDefined();
    });
  });

  describe('textPosition', () => {
    it(`should move the text to left if the textPosition parameter is set to 'left'`, () => {
      render(<ProgressBar textPosition="left" text="text" format="none" />);

      expect(screen.queryByText('text')).toHaveStyle(`
        position: relative;
      `);

      expect(screen.queryByRole('progressbar')).toHaveStyle(`
        flex-direction: row-reverse;
        height: 2em;
      `);
    });

    it(`should move the text to right if the textPosition parameter is set to 'right'`, () => {
      render(<ProgressBar textPosition="right" text="text" format="none" />);

      expect(screen.queryByText('text')).toHaveStyle(`
        position: relative;
      `);

      expect(screen.queryByRole('progressbar')).toHaveStyle(`
        flex-direction: row;
        height: 2em;
      `);
    });

    it(`should move the text to up if the textPosition parameter is set to 'up'`, () => {
      render(<ProgressBar textPosition="up" text="text" format="none" />);

      expect(screen.queryByText('text')).toHaveStyle(`
        position: relative;
      `);

      expect(screen.queryByRole('progressbar')).toHaveStyle(`
        flex-direction: column-reverse;
        height: 4em;
      `);
    });

    it(`should move the text to down if the textPosition parameter is set to 'down'`, () => {
      render(<ProgressBar textPosition="down" text="text" format="none" />);

      expect(screen.queryByText('text')).toHaveStyle(`
        position: relative;
      `);

      expect(screen.queryByRole('progressbar')).toHaveStyle(`
        flex-direction: column;
        height: 4em;
      `);
    });

    it(`should move the text to center if the textPosition parameter is set to 'center'`, () => {
      render(<ProgressBar textPosition="center" text="text" format="none" />);

      expect(screen.queryByText('text')).toHaveStyle(`
        position: absolute;
      `);

      expect(screen.queryByRole('progressbar')).toHaveStyle(`
        flex-direction: row-reverse;
        height: 2em;
      `);
    });

    it(`should move the text to center if the textPosition parameter is undefined`, () => {
      render(<ProgressBar text="text" format="none" />);

      expect(screen.queryByText('text')).toHaveStyle(`
        position: absolute;
      `);

      expect(screen.queryByRole('progressbar')).toHaveStyle(`
        flex-direction: row-reverse;
        height: 2em;
      `);
    });
  });

  describe('format', () => {
    it(`should display the progress as a percentage if the format parameter is set to 'percent'`, () => {
      render(<ProgressBar value={99.5} format="percent" />);

      expect(screen.queryByText('99.5%')).toBeTruthy();
    });

    it(`should display the progress as a friction if the format parameter is set to 'fraction'`, () => {
      render(<ProgressBar value={99.5} format="fraction" />);

      expect(screen.queryByText('99.5 / 100')).toBeTruthy();
    });

    it(`shouldn't display the progress if the format parameter is set to 'none'`, () => {
      render(<ProgressBar value={99.5} format="none" />);

      expect(screen.queryByText('99.5%')).toBeFalsy();
      expect(screen.queryByText('99.5 / 100')).toBeFalsy();
    });
  });

  describe('reverse', () => {
    it(`should reverse the fill value of the component if the reverse property is defined`, () => {
      render(<ProgressBar value={99.5} reverse />);

      expect(getPseudoElement('before').includes('width: 99.5%')).toBeFalsy();
      expect(getPseudoElement('before').includes('width: 0.5%')).toBeTruthy();
    });

    it(`shouldn't reverse the displayed value if the reverse property is defined`, () => {
      render(<ProgressBar value={99.5} reverse />);

      expect(screen.queryByText('0.5%')).toBeFalsy();
      expect(screen.queryByText('99.5%')).toBeTruthy();
    });

    it(`shouldn't reverse the fill value of the component if the reverse property is undefined`, () => {
      render(<ProgressBar value={99.5} />);

      expect(getPseudoElement('before').includes('width: 0.5%')).toBeFalsy();
      expect(getPseudoElement('before').includes('width: 99.5%')).toBeTruthy();
    });
  });

  describe(`theming`, () => {
    describe(`box-shadow`, () => {
      it(`should be set to none if the theme.progressBar.shadow is falsy`, () => {
        render(
          <ThemeProvider theme={testTheme({ shadow: false })}>
            <ProgressBar />
          </ThemeProvider>,
        );

        expect(screen.queryByRole('progressbar').children[0]).toHaveStyle(
          `box-shadow: none`,
        );
      });

      it(`should be set to the theme.drop-shadow if theme.textBox.shadow is truthy`, () => {
        render(
          <ThemeProvider theme={testTheme({ shadow: true })}>
            <ProgressBar />
          </ThemeProvider>,
        );

        expect(screen.queryByRole('progressbar').children[0]).toHaveStyle(
          `box-shadow: ${theme.shadow}`,
        );
      });
    });

    describe(`background-color`, () => {
      it(`should be set to transparent color if the theme.textBox.transparent is truthy`, () => {
        render(
          <ThemeProvider theme={testTheme({ transparent: true })}>
            <ProgressBar />
          </ThemeProvider>,
        );

        expect(screen.queryByRole('progressbar').children[0]).toHaveStyle(
          `background-color: #0000`,
        );
      });

      it(`should be set to the theme.colors.main color if the theme.textBox.transparent is falsy`, () => {
        render(
          <ThemeProvider theme={testTheme({ transparent: false })}>
            <ProgressBar />
          </ThemeProvider>,
        );

        expect(screen.queryByRole('progressbar').children[0]).toHaveStyle(
          `background-color: ${theme.colors.main}`,
        );
      });
    });
  });
});
