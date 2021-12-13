import { renderHook } from '@testing-library/react-hooks';
import useTimelineEffect from './use-timeline-effect';
import timelineMock from '../../mocks/gsap-timeline';

describe(`useTimelineEffect`, () => {
  const data = timelineMock.mock();

  afterAll(() => {
    timelineMock.restore();
  });

  beforeEach(() => {
    data.clear();
  });

  it(`should run animation`, async () => {
    const spy = jest.fn();

    renderHook(() => useTimelineEffect(spy));
    expect(spy).toBeCalledTimes(1);
  });

  it(`should call timeline.clear before the component is unmounted`, () => {
    const { unmount } = renderHook(() => useTimelineEffect(() => {}));

    unmount();
    expect(data.mockData.clear).toEqual(1);
  });
});
