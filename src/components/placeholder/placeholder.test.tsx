import { render, screen, fireEvent } from '@testing-library/react';
import { Placeholder } from './placeholder';
import { TextBox, UseFormRegisterReturn } from '../text-box/text-box';
import { theme } from '../../themes/theme';
import { useRectMock } from '../../mocks/use-rect';
import * as animationsModule from './placeholder.animations';

const getBeforeByText = (text: string) => {
  const element = screen.queryByText(text);
  const classNames = element?.className.replace(/ /g, '|');

  if (!classNames) {
    return [];
  }

  const rules = [...document.styleSheets]
    .flatMap(({ cssRules }) => [...cssRules])
    .map(({ cssText }) => cssText);

  const predicate = (text: string) =>
    [...text.matchAll(new RegExp(`\\.(${classNames}):before`, 'g'))].length > 0;

  return rules
    .filter(predicate)
    .at(-1)
    .split(';')
    .map((s) => s.replace(' ', ''))
    .map((s) => s.replace(/.*content:/, 'content:'))
    .slice(0, -1);
};

describe(`Placeholder`, () => {
  it(`should display the textbox from the input property`, () => {
    render(<Placeholder input={<TextBox />} />);

    expect(screen.queryByRole('textbox')).toBeTruthy();
  });

  describe(`theming`, () => {
    it(`should load the placeholder's font family from the theme`, () => {
      render(<Placeholder value="test" input={<TextBox />} />);

      expect(screen.queryByText('test')).toHaveStyle(
        `font-family: ${theme.fontFamily}`,
      );
    });
  });

  describe(`value`, () => {
    it(`should set the placeholder's text to the value property`, () => {
      render(<Placeholder value="text" input={<TextBox />} />);

      expect(screen.queryByText('text')).toBeTruthy();
    });

    it(`should set the input's placeholder to an empty string`, () => {
      render(
        <Placeholder
          value="placeholder"
          input={<TextBox placeholder="inputPlaceholder" />}
        />,
      );

      expect(screen.queryByPlaceholderText('inputPlaceholder')).toBeFalsy();
      expect(screen.queryByText('placeholder')).toBeTruthy();
    });
  });

  describe(`color`, () => {
    it(`should set the color of the placeholder's text to the main color`, () => {
      render(<Placeholder value="test" color="main" input={<TextBox />} />);

      expect(screen.queryByText('test')).toHaveStyle(
        `color: ${theme.colors.main}`,
      );
    });

    it(`should set the color of the placeholder's text to the accent color`, () => {
      render(<Placeholder value="test" color="accent" input={<TextBox />} />);

      expect(screen.queryByText('test')).toHaveStyle(
        `color: ${theme.colors.accent}`,
      );
    });

    it(`should set the color of the placeholder's text to the text color`, () => {
      render(<Placeholder value="test" color="text" input={<TextBox />} />);

      expect(screen.queryByText('test')).toHaveStyle(
        `color: ${theme.colors.text}`,
      );
    });

    it(`should set the color of the placeholder's text to the textInverted color`, () => {
      render(
        <Placeholder value="test" color="textInverted" input={<TextBox />} />,
      );

      expect(screen.queryByText('test')).toHaveStyle(
        `color: ${theme.colors.textInverted}`,
      );
    });
  });

  describe(`weight`, () => {
    it(`should set the weight of the placeholder's text to the 'normal'`, () => {
      render(<Placeholder value="test" weight="normal" input={<TextBox />} />);

      expect(screen.queryByText('test')).toHaveStyle(`font-weight: normal`);
    });

    it(`should set the weight of the placeholder's text to the 'bold'`, () => {
      render(<Placeholder value="test" weight="bold" input={<TextBox />} />);

      expect(screen.queryByText('test')).toHaveStyle(`font-weight: bold`);
    });

    it(`should set the weight of the placeholder's text to the 'bolder'`, () => {
      render(<Placeholder value="test" weight="bolder" input={<TextBox />} />);

      expect(screen.queryByText('test')).toHaveStyle(`font-weight: bolder`);
    });

    it(`should set the weight of the placeholder's text to the 'lighter'`, () => {
      render(<Placeholder value="test" weight="lighter" input={<TextBox />} />);

      expect(screen.queryByText('test')).toHaveStyle(`font-weight: lighter`);
    });
  });

  describe(`positionVertical`, () => {
    beforeAll(() => {
      useRectMock.mock({ width: 100, height: 50 });
    });

    afterAll(() => {
      useRectMock.restore();
    });

    it(`should move the placeholder to the top part of the input`, () => {
      render(
        <Placeholder
          value="test"
          positionVertical="top"
          input={<TextBox border="single-line" />}
        />,
      );

      expect(screen.queryByText('test')).toHaveStyle('top: 0px');
    });

    it(`should move the placeholder to the center part of the input's top border if input's border property is set to 'full'`, () => {
      render(
        <Placeholder
          value="test"
          positionVertical="top"
          input={<TextBox border="full" />}
        />,
      );

      expect(screen.queryByText('test')).toHaveStyle(
        `top: calc(${theme.border.width}/2 - 50px/2)`,
      );
    });

    it(`should move the placeholder to the center of the input`, () => {
      render(
        <Placeholder
          value="test"
          positionVertical="center"
          input={<TextBox border="single-line" />}
        />,
      );

      expect(screen.queryByText('test')).toHaveStyle(`top: calc(50% - 50px/2)`);
    });

    it(`should move the placeholder to the bottom part of the input`, () => {
      render(
        <Placeholder
          value="test"
          positionVertical="bottom"
          input={<TextBox border="single-line" />}
        />,
      );

      expect(screen.queryByText('test')).toHaveStyle(
        `top: calc(100% - ${theme.border.width}/2 - 50px/2)`,
      );
    });

    it(`should save top and center positions to css variables if the animation property is set to 'move-from-center'`, () => {
      render(
        <Placeholder
          value="test"
          positionVertical="bottom"
          animation="move-from-center"
          input={<TextBox border="single-line" />}
        />,
      );

      expect(screen.queryByText('test')).toHaveStyle(
        `top: var(--animation-top-invert);
        --animation-top: calc(100% - ${theme.border.width}/2 - 50px/2);
        --animation-top-invert: calc(50% - 50px/2);`,
      );
    });
  });

  describe(`positionHorizontal`, () => {
    beforeAll(() => {
      useRectMock.mock({ width: 100, height: 50 });
    });

    afterAll(() => {
      useRectMock.restore();
    });

    it(`should move the placeholder to the left part of the input`, () => {
      render(
        <Placeholder
          value="test"
          positionHorizontal="left"
          input={<TextBox border="single-line" />}
        />,
      );

      expect(screen.queryByText('test')).toHaveStyle(`left: 0px`);
    });

    it(`should move the placeholder to the left part of the input border, respecting the border-radius property if input's border property is set to 'full'`, () => {
      render(
        <Placeholder
          value="test"
          positionHorizontal="left"
          input={<TextBox border="full" />}
        />,
      );

      expect(screen.queryByText('test')).toHaveStyle(
        `left: max(${theme.border.radius}, calc(${theme.border.width}*2))`,
      );
    });

    it(`should move the placeholder to the center of the input`, () => {
      render(
        <Placeholder
          value="test"
          positionHorizontal="center"
          input={<TextBox border="single-line" />}
        />,
      );

      expect(screen.queryByText('test')).toHaveStyle(
        `left: calc(50% - 100px/2)`,
      );
    });

    it(`should move the placeholder to the right part of the input`, () => {
      render(
        <Placeholder
          value="test"
          positionHorizontal="right"
          animation="none"
          input={<TextBox border="single-line" />}
        />,
      );

      expect(screen.queryByText('test')).toHaveStyle(
        `left: calc(100% - max(${theme.border.radius}, calc(${theme.border.width}*2)) - 100px)`,
      );
    });

    it(`should save top and center positions to css variables if the animation property is set to 'move-from-center'`, () => {
      render(
        <Placeholder
          value="test"
          positionHorizontal="right"
          animation="move-from-center"
          input={<TextBox border="single-line" />}
        />,
      );

      expect(screen.queryByText('test')).toHaveStyle(
        `left: var(--animation-left-invert);
        --animation-left-invert: calc(50% - 100px/2);
        --animation-left: calc(100% - max(${theme.border.radius},calc(${theme.border.width}*2)) - 100px);`,
      );
    });
  });

  describe('data loaded from input', () => {
    it(`should load a smaller font than the input's font`, () => {
      render(<Placeholder value="test" input={<TextBox size="small" />} />);

      expect(screen.queryByText('test')).toHaveStyle(
        `font-size: ${theme.font.smaller}`,
      );
    });

    it(`should set the font size of the placeholder's :before element to the font size of the input`, () => {
      render(<Placeholder value="test" input={<TextBox size="big" />} />);

      expect(
        getBeforeByText('test').indexOf(`font-size: ${theme.font.big}`),
      ).toBeGreaterThan(-1);
    });

    it(`should set the font size of the placeholder's :before element to the 'normal' size if input's size property is undefined`, () => {
      render(<Placeholder value="test" input={<TextBox />} />);

      expect(
        getBeforeByText('test').indexOf(`font-size: ${theme.font.normal}`),
      ).toBeGreaterThan(-1);
    });
  });

  describe(':before display', () => {
    it(`should set the display mode of the placeholder's :before element to 'block' if the input's border property is set to 'full' and the placeholder's positionVertical property is other than 'center'`, () => {
      render(
        <Placeholder
          value="test"
          positionVertical="bottom"
          input={<TextBox border="full" />}
        />,
      );

      expect(getBeforeByText('test').indexOf(`display: block`)).toBeGreaterThan(
        -1,
      );
    });

    it(`should set the display mode of the placeholder's :before element to 'none' if the input's border property is set to 'full' and the placeholder's positionVertical property is set to 'center'`, () => {
      render(
        <Placeholder
          value="test"
          positionVertical="center"
          input={<TextBox border="full" />}
        />,
      );

      expect(getBeforeByText('test').indexOf(`display: none`)).toBeGreaterThan(
        -1,
      );
    });

    it(`should set the display mode of the placeholder's :before element to 'block' if the input's border property is set to 'single-line' and the placeholder's positionVertical property is set to 'bottom'`, () => {
      render(
        <Placeholder
          value="test"
          positionVertical="bottom"
          input={<TextBox border="single-line" />}
        />,
      );

      expect(getBeforeByText('test').indexOf(`display: block`)).toBeGreaterThan(
        -1,
      );
    });

    it(`should set the display mode of the placeholder's :before element to 'none' if the input's border property is set to 'single-line' and the placeholder's positionVertical property is other than 'bottom'`, () => {
      render(
        <Placeholder
          value="test"
          positionVertical="top"
          input={<TextBox border="single-line" />}
        />,
      );

      expect(getBeforeByText('test').indexOf(`display: none`)).toBeGreaterThan(
        -1,
      );
    });
  });

  describe(`animation`, () => {
    const spy = jest.spyOn(animationsModule, 'animations');

    beforeEach(() => spy.mockClear());
    afterAll(() => spy.mockReset());

    it(`should play the animation in the normal mode if the input's value was empty before the edit`, async () => {
      render(
        <Placeholder
          value="test"
          animation="none"
          input={<TextBox border="single-line" value="" />}
        />,
      );

      fireEvent.focus(await screen.findByRole('textbox'));
      fireEvent.input(await screen.findByRole('textbox'), {
        target: { value: 'text' },
      });

      expect(spy).toBeCalledWith(
        'none',
        expect.anything(),
        expect.anything(),
        false,
      );
    });

    it(`should play the animation in the reverse mode if the input's value is empty as the result of the edit`, async () => {
      render(
        <Placeholder
          value="test"
          animation="none"
          input={<TextBox border="single-line" value="text" />}
        />,
      );

      fireEvent.focus(await screen.findByRole('textbox'));
      fireEvent.input(await screen.findByRole('textbox'), {
        target: { value: '' },
      });

      expect(spy).toBeCalledWith(
        'none',
        expect.anything(),
        expect.anything(),
        true,
      );
    });

    it(`shouldn't play the animation if the input's value isn't empty as the result of the edit and also input's value wasn't empty before the edit`, async () => {
      render(
        <Placeholder
          value="test"
          animation="none"
          input={<TextBox border="single-line" value="text" />}
        />,
      );

      fireEvent.focus(await screen.findByRole('textbox'));
      fireEvent.input(await screen.findByRole('textbox'), {
        target: { value: 'edited text' },
      });

      expect(spy).toBeCalledTimes(0);
    });

    it(`shouldn't play the animation if the input's value is empty as the result of the edit and also input's value was empty before the edit`, async () => {
      render(
        <Placeholder
          value="test"
          animation="none"
          input={<TextBox border="single-line" value="" />}
        />,
      );

      fireEvent.focus(await screen.findByRole('textbox'));
      fireEvent.input(await screen.findByRole('textbox'), {
        target: { value: '' },
      });

      expect(spy).toBeCalledTimes(0);
    });

    it(`should play the 'none' animation if the animation property is undefined`, async () => {
      render(
        <Placeholder
          value="test"
          animation="none"
          input={<TextBox border="single-line" />}
        />,
      );

      fireEvent.focus(await screen.findByRole('textbox'));
      fireEvent.input(await screen.findByRole('textbox'), {
        target: { value: 'text' },
      });

      expect(spy).toBeCalledWith(
        'none',
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });

    it(`should play the 'scale' animation if the animation property is undefined`, async () => {
      render(
        <Placeholder
          value="test"
          animation="scale"
          input={<TextBox border="single-line" />}
        />,
      );

      fireEvent.focus(await screen.findByRole('textbox'));
      fireEvent.input(await screen.findByRole('textbox'), {
        target: { value: 'text' },
      });

      expect(spy).toBeCalledWith(
        'scale',
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });

    it(`should play the 'move-from-center' animation if the animation property is undefined`, async () => {
      render(
        <Placeholder
          value="test"
          animation="move-from-center"
          input={<TextBox border="single-line" />}
        />,
      );

      fireEvent.focus(await screen.findByRole('textbox'));
      fireEvent.input(await screen.findByRole('textbox'), {
        target: { value: 'text' },
      });

      expect(spy).toBeCalledWith(
        'move-from-center',
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });

    it(`should play the 'disappear' animation if the animation property is undefined`, async () => {
      render(
        <Placeholder
          value="test"
          animation="disappear"
          input={<TextBox border="single-line" />}
        />,
      );

      fireEvent.focus(await screen.findByRole('textbox'));
      fireEvent.input(await screen.findByRole('textbox'), {
        target: { value: 'text' },
      });

      expect(spy).toBeCalledWith(
        'disappear',
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });
  });

  describe(`when the input is edited`, () => {
    const animationSpy = jest.spyOn(animationsModule, 'animations');

    beforeEach(() => animationSpy.mockClear());
    afterAll(() => animationSpy.mockReset());

    it(`should try to call the input's onEdit property and play an animation`, async () => {
      const onEditSpy = jest.fn();

      render(
        <Placeholder
          value="test"
          animation="none"
          input={<TextBox onEdit={onEditSpy} />}
        />,
      );

      fireEvent.focus(await screen.findByRole('textbox'));
      fireEvent.input(await screen.findByRole('textbox'), {
        target: { value: 'edited text' },
      });

      expect(onEditSpy).toBeCalledWith('edited text');
      expect(animationSpy).toBeCalledWith(
        'none',
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });

    it(`should try to call the onChange method from the input's register property and play an animation`, async () => {
      const register = {
        onChange: jest.fn(),
      } as unknown as UseFormRegisterReturn;

      render(
        <Placeholder
          value="test"
          animation="none"
          input={<TextBox register={register} />}
        />,
      );

      fireEvent.focus(await screen.findByRole('textbox'));
      fireEvent.input(await screen.findByRole('textbox'), {
        target: { value: 'edited text' },
      });

      expect(register.onChange).toBeCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'edited text' }),
        }),
      );

      expect(animationSpy).toBeCalledWith(
        'none',
        expect.anything(),
        expect.anything(),
        expect.anything(),
      );
    });
  });
});
