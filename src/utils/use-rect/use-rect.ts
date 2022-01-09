import React, { useCallback, useEffect, useRef, useState } from 'react';
import isEqual from 'lodash.isequal';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

export const useRect = (ref: React.RefObject<HTMLElement>) => {
  const [rect, setRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const callback = useCallback(
    (entries: ResizeObserverEntry[]) => {
      const value = entries[0].target.getBoundingClientRect();

      if (!isEqual(rect, value)) {
        setRect(value);
      }
    },
    [rect],
  );

  const observerRef = useRef(new (window.ResizeObserver || Polyfill)(callback));

  useEffect(() => {
    const observer = observerRef.current;
    const target = ref.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [observerRef, ref]);

  return rect;
};
