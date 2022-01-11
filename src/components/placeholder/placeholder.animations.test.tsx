import { render, screen } from '@testing-library/react';
import { animations } from './placeholder.animations';
import timelineMock from '../../mocks/gsap-timeline';
import { Placeholder } from './placeholder';
import { TextBox } from '../text-box/text-box';

describe(`animations`, () => {
  const timeline = timelineMock.mock();

  beforeEach(() => {
    timeline.clear();
  });

  it(`should hide element if the 'none' animation was selected`, () => {
    animations('none', { current: null }, 4);
    expect(timeline.mockData.set).toEqual([[null, { display: 'none' }]]);
  });

  it(`should show element if the inverted 'none' animation was selected`, () => {
    animations('none', { current: null }, 4, true);
    expect(timeline.mockData.set).toEqual([[null, { display: 'block' }]]);
  });

  it(`should play the 'scale' animation for 2 seconds`, () => {
    animations('scale', { current: null }, 2);
    expect(timeline.mockData.to).toEqual([[null, { scale: 0, duration: 2 }]]);
  });

  it(`should play the inverted 'scale' animation for 2 seconds`, () => {
    animations('scale', { current: null }, 2, true);
    expect(timeline.mockData.to).toEqual([[null, { scale: 1, duration: 2 }]]);
  });

  it(`should play the 'disappear' animation for 4 seconds`, () => {
    animations('disappear', { current: null }, 4);
    expect(timeline.mockData.to).toEqual([[null, { opacity: 0, duration: 4 }]]);
  });

  it(`should play the inverted 'disappear' animation for 4 seconds`, () => {
    animations('disappear', { current: null }, 4, true);
    expect(timeline.mockData.to).toEqual([[null, { opacity: 1, duration: 4 }]]);
  });

  it(`should play the 'move-from-center' animation for 3 seconds`, () => {
    render(
      <Placeholder
        value="test"
        positionVertical="bottom"
        positionHorizontal="right"
        animation="move-from-center"
        input={<TextBox border="full" />}
      />,
    );

    const ref = { current: screen.queryByText('test') };
    animations('move-from-center', ref, 6);

    expect(timeline.mockData.to).toEqual([
      [
        ref.current,
        {
          left: 'calc(100% - max(1.2em,calc(0.2em*2)) - 0px)',
          top: 'calc(100% - 0.2em/2 - 0px/2)',
          duration: 3,
        },
      ],
    ]);
  });

  it(`should play the inverted 'move-from-center' animation for 3 seconds`, () => {
    render(
      <Placeholder
        value="test"
        positionVertical="bottom"
        positionHorizontal="right"
        animation="move-from-center"
        input={<TextBox border="full" />}
      />,
    );

    const ref = { current: screen.queryByText('test') };
    animations('move-from-center', ref, 6, true);

    expect(timeline.mockData.to).toEqual([
      [
        ref.current,
        {
          left: 'calc(50% - 0px/2)',
          top: 'calc(50% - 0px/2)',
          duration: 3,
        },
      ],
    ]);
  });
});
