import animations from './icon.animations';
import timelineMock from '../mocks/gsap-timeline';

describe(`animations`, () => {
  const timeline = timelineMock.mock();

  beforeEach(() => {
    timeline.clear();
  });

  it(`should play the shake animation for 2 seconds`, () => {
    animations('shake', { current: null }, 2);

    expect(timeline.mockData.to).toEqual([
      [null, { rotate: '30deg', duration: 0.5 }],
      [null, { rotate: '-25deg', duration: 0.8 }],
      [null, { rotate: '15deg', duration: 0.3 }],
      [null, { rotate: '-2deg', duration: 0.16 }],
      [null, { rotate: '0deg', duration: 0.24 }],
    ]);
  });

  it(`should play the spin animation for 4 seconds`, () => {
    animations('spin', { current: null }, 4);

    expect(timeline.mockData.set).toEqual([[null, { rotate: '0deg' }]]);
    expect(timeline.mockData.to).toEqual([
      [null, { rotate: '30deg', duration: 0.6 }],
      [null, { rotate: '-25deg', duration: 1.0 }],
      [null, { rotate: '360deg', duration: 2.4 }],
    ]);
  });

  it(`should play the scale animation for 0.5 seconds`, () => {
    animations('scale', { current: null }, 0.5);

    expect(timeline.mockData.to).toEqual([
      [null, { scale: 1.5, duration: 0.25 }],
      [null, { scale: 1, duration: 0.25 }],
    ]);
  });
});
