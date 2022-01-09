import { renderHook, act } from '@testing-library/react-hooks';
import * as PolyfillModule from '@juggle/resize-observer';
import { resizeObserverMock } from '../../mocks/resize-observer';
import { useSizeSynchronizer } from './use-size-synchronizer';

describe('useSizeSynchronizer', () => {
  it(`should update source component to the target size`, () => {
    resizeObserverMock.mock();

    const source = { current: document.createElement('div') };
    const target = { current: document.createElement('div') };

    renderHook(() => useSizeSynchronizer(source, target));

    target.current.style.width = '10px';
    target.current.style.height = '5px';

    act(() => {
      resizeObserverMock.instances[0].simulateResize([
        {
          height: 300,
          width: 250,
        },
      ]);
    });

    expect(target.current.style.width).toEqual('250px');
    expect(target.current.style.height).toEqual('300px');

    resizeObserverMock.restore();
  });

  it(`should use window.ResizeObserver`, () => {
    window.ResizeObserver = jest.fn();

    renderHook(() =>
      useSizeSynchronizer({ current: undefined }, { current: undefined }),
    );

    expect(window.ResizeObserver).toBeCalledTimes(1);

    window.ResizeObserver = undefined;
  });

  it(`should use Polyfill if window.ResizeObserver is undefined`, () => {
    const spy = jest.spyOn(PolyfillModule, 'ResizeObserver');

    renderHook(() =>
      useSizeSynchronizer({ current: undefined }, { current: undefined }),
    );

    expect(spy).toBeCalledTimes(1);

    spy.mockRestore();
  });
});
