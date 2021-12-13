import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import getSvgColors from '../utils/get-svg-colors/get-svg-colors';
import { Icon } from './icon';
import * as animationsModule from './icon.animations';

describe('Icon', () => {
  it(`should display button`, () => {
    render(<Icon type="Text" />);

    expect(screen.queryByRole('button')).toBeTruthy();
  });

  describe('errors', () => {
    const consoleSpy = jest.spyOn(global.console, 'error');

    beforeAll(() => {
      consoleSpy.mockImplementation(() => {});
    });

    afterAll(() => {
      consoleSpy.mockRestore();
    });

    it(`should throw error if the type property is setted to unsupported value`, () => {
      expect(() => render(<Icon type={'Unsupported' as any} />)).toThrowError(
        'The type parameter is setted to unsupported value',
      );
    });

    it(`should throw error if the size property is setted to unsupported value`, () => {
      expect(() =>
        render(<Icon type="Text" size={'Unsupported' as any} />),
      ).toThrowError('The size parameter is setted to unsupported value');
    });
  });

  describe('type', () => {
    it(`should display bin icon`, () => {
      render(<Icon type="Bin" />);

      expect(getSvgColors(screen.queryByRole('button'), true)).toEqual([
        'black',
        'black',
        'black',
        'black',
      ]);
    });

    it(`should display eye icon`, () => {
      render(<Icon type="Eye" />);

      expect(getSvgColors(screen.queryByRole('button'), true)).toEqual([
        'black',
        'black',
      ]);
    });

    it(`should display pencil icon`, () => {
      render(<Icon type="Pencil" />);

      expect(getSvgColors(screen.queryByRole('button'), true)).toEqual([
        'black',
        'black',
        'black',
      ]);
    });

    it(`should display text icon`, () => {
      render(<Icon type="Text" />);

      expect(getSvgColors(screen.queryByRole('button'), true)).toEqual([
        'black',
      ]);
    });

    it(`should display plus icon`, () => {
      render(<Icon type="Plus" />);

      expect(getSvgColors(screen.queryByRole('button'), true)).toEqual([
        'black',
      ]);
    });
  });

  describe('backgroundColor', () => {
    it(`should display black button if the backgroundColor property isn't defined`, () => {
      render(<Icon type="Text" />);

      expect(getSvgColors(screen.queryByRole('button'), true)).toEqual([
        'black',
      ]);
    });

    it(`should display black button`, () => {
      render(<Icon type="Text" backgroundColor="white" />);

      expect(getSvgColors(screen.queryByRole('button'), true)).toEqual([
        'white',
      ]);
    });
  });

  describe('size', () => {
    it(`should display small button if the size property isn't defined`, () => {
      render(<Icon type="Text" />);

      expect(screen.queryByRole('button')).toHaveAttribute('width', '25');
      expect(screen.queryByRole('button')).toHaveAttribute('height', '25');
    });

    it(`should display small button`, () => {
      render(<Icon type="Text" size="small" />);

      expect(screen.queryByRole('button')).toHaveAttribute('width', '25');
      expect(screen.queryByRole('button')).toHaveAttribute('height', '25');
    });

    it(`should display medium button`, () => {
      render(<Icon type="Text" size="medium" />);

      expect(screen.queryByRole('button')).toHaveAttribute('width', '35');
      expect(screen.queryByRole('button')).toHaveAttribute('height', '35');
    });

    it(`should display large button`, () => {
      render(<Icon type="Text" size="large" />);

      expect(screen.queryByRole('button')).toHaveAttribute('width', '256');
      expect(screen.queryByRole('button')).toHaveAttribute('height', '256');
    });
  });

  describe(`hoverAnimation`, () => {
    const animations = jest.spyOn(animationsModule, 'default');

    beforeEach(() => {
      animations.mockClear();
    });

    it(`should play shake animation after mouse hover`, async () => {
      render(<Icon type="Text" hoverAnimation="shake" />);

      fireEvent.mouseEnter(await screen.findByRole('button'));
      expect(animations).toBeCalledWith('shake', expect.anything(), 1);
    });

    it(`should play spin animation after mouse hover`, async () => {
      render(<Icon type="Text" hoverAnimation="spin" />);

      fireEvent.mouseEnter(await screen.findByRole('button'));
      expect(animations).toBeCalledWith('spin', expect.anything(), 1);
    });

    it(`should play scale animation after mouse hover`, async () => {
      render(<Icon type="Text" hoverAnimation="scale" />);

      fireEvent.mouseEnter(await screen.findByRole('button'));
      expect(animations).toBeCalledWith('scale', expect.anything(), 1);
    });

    it(`shouldn't play any animation after mouse hover`, async () => {
      render(<Icon type="Text" hoverAnimation="none" />);

      fireEvent.mouseEnter(await screen.findByRole('button'));
      expect(animations).toBeCalledTimes(0);
    });
  });

  describe(`clickAnimation`, () => {
    const animations = jest.spyOn(animationsModule, 'default');

    beforeEach(() => {
      animations.mockClear();
    });

    it(`should play shake animation after mouse click`, async () => {
      render(<Icon type="Text" clickAnimation="shake" />);

      fireEvent.click(await screen.findByRole('button'));
      expect(animations).toBeCalledWith('shake', expect.anything(), 0.5);
    });

    it(`should play spin animation after mouse click`, async () => {
      render(<Icon type="Text" clickAnimation="spin" />);

      fireEvent.click(await screen.findByRole('button'));
      expect(animations).toBeCalledWith('spin', expect.anything(), 0.5);
    });

    it(`should play scale animation after mouse click`, async () => {
      render(<Icon type="Text" clickAnimation="scale" />);

      fireEvent.click(await screen.findByRole('button'));
      expect(animations).toBeCalledWith('scale', expect.anything(), 0.5);
    });

    it(`shouldn't play any animation after mouse click`, async () => {
      render(<Icon type="Text" clickAnimation="none" />);

      fireEvent.click(await screen.findByRole('button'));
      expect(animations).toBeCalledTimes(0);
    });
  });

  describe(`onClick`, () => {
    it(`should call onClick if user click on the icon`, async () => {
      const spy = jest.fn();
      render(<Icon type="Text" onClick={spy} />);

      fireEvent.click(await screen.findByRole('button'));
      expect(spy).toBeCalledTimes(1);
    });
  });
});
