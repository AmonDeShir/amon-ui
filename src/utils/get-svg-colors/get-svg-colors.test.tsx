import { render, screen } from '@testing-library/react';
import { PropsWithChildren } from 'react';

import getSvgColors from './get-svg-colors';

const SVG = ({ children, fill }: PropsWithChildren<{ fill: string }>) => (
  <div title="test">
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  </div>
);

describe('getSvgColors', () => {
  it(`should return null if svg is not defined`, () => {
    expect(getSvgColors(undefined as unknown as HTMLElement)).toEqual(null);
  });

  it(`should return colors from svg elements`, () => {
    render(
      <SVG fill="red">
        <circle fill="blue" />
        <ellipse fill="black" />
        <path fill="red" />
        <polygon fill="pink" />
        <polyline fill="green" />
        <rect fill="white" />
        <text fill="yellow" />
        <tspan fill="purple" />
      </SVG>,
    );
    expect(getSvgColors(screen.getByTitle('test').children[0])).toEqual([
      'red',
      'blue',
      'black',
      'red',
      'pink',
      'green',
      'white',
      'yellow',
      'purple',
    ]);
  });

  it(`should read colors from nested items`, () => {
    render(
      <SVG fill="none">
        <path fill="white" />
        <g>
          <path fill="red" />
          <path fill="red" />
          <g>
            <path fill="blue" />
            <path fill="blue" />
          </g>
        </g>
      </SVG>,
    );

    expect(getSvgColors(screen.getByTitle('test').children[0])).toEqual([
      'none',
      'white',
      'none',
      'red',
      'red',
      'none',
      'blue',
      'blue',
    ]);
  });

  it(`should skip none colors if skip none flag is true`, () => {
    render(
      <SVG fill="none">
        <path fill="white" />
        <g>
          <path fill="red" />
          <path fill="red" />
          <g>
            <path fill="blue" />
            <path fill="blue" />
          </g>
        </g>
      </SVG>,
    );

    expect(getSvgColors(screen.getByTitle('test').children[0], true)).toEqual([
      'white',
      'red',
      'red',
      'blue',
      'blue',
    ]);
  });
});
