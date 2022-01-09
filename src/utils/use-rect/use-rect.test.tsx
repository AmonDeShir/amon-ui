import { act, renderHook } from '@testing-library/react-hooks';
import * as PolyfillModule from '@juggle/resize-observer';
import { useRect } from './use-rect';
import { resizeObserverMock } from '../../mocks/resize-observer';

describe(`use-rect`, () => {
  it(`should load zeros if ref is undefined`, () => {
    const { result } = renderHook(() => useRect({ current: undefined }));

    expect(result.current).toEqual({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
  });

  it(`should use window.ResizeObserver`, () => {
    window.ResizeObserver = jest.fn();

    renderHook(() => useRect({ current: undefined }));
    expect(window.ResizeObserver).toBeCalledTimes(1);

    window.ResizeObserver = undefined;
  });

  it(`should use Polyfill if window.ResizeObserver is undefined`, () => {
    const spy = jest.spyOn(PolyfillModule, 'ResizeObserver');

    renderHook(() => useRect({ current: undefined }));
    expect(spy).toBeCalledTimes(1);

    spy.mockRestore();
  });

  it(`should update rect if target resized`, () => {
    resizeObserverMock.mock();

    const current = document.createElement('div');
    const { result } = renderHook(() => useRect({ current }));

    expect(result.current).toEqual({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });

    act(() => {
      resizeObserverMock.instances[0].simulateResize([
        { width: 300, height: 200, x: 10, y: -15 },
      ]);
    });

    expect(result.current).toEqual({
      x: 10,
      y: -15,
      width: 300,
      height: 200,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });

    resizeObserverMock.restore();
  });

  it(`shouldn't update rect if target is the same after resize`, () => {
    resizeObserverMock.mock();

    const current = document.createElement('div');
    const { result } = renderHook(() => useRect({ current }));

    const beforeAct = result.current;

    act(() => {
      resizeObserverMock.instances[0].simulateResize([
        { width: 0, height: 0, x: 0, y: 0 },
      ]);
    });

    const afterAct = result.current;

    expect(beforeAct === afterAct).toBeTruthy();

    resizeObserverMock.restore();
  });
});
