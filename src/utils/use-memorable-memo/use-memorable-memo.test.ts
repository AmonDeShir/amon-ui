/* eslint-disable react-hooks/exhaustive-deps */
import { renderHook, act } from '@testing-library/react-hooks';
import { useMemorableMemo } from './use-memorable-memo';

describe('useMemorableMemo', () => {
  it(`should return factory result and undefined`, () => {
    const multiplier = 2;
    const { result } = renderHook(() =>
      useMemorableMemo(() => 5 * multiplier, [multiplier]),
    );

    expect(result.current).toEqual([10, undefined]);
  });

  it(`should save the last factory result`, () => {
    let multiplier = 2;
    const { result, rerender } = renderHook(() =>
      useMemorableMemo(() => 5 * multiplier, [multiplier]),
    );

    expect(result.current).toEqual([10, undefined]);

    act(() => {
      multiplier = 5;
    });
    rerender();

    expect(result.current).toEqual([25, 10]);

    act(() => {
      multiplier = 3;
    });
    rerender();

    expect(result.current).toEqual([15, 25]);
  });
});
