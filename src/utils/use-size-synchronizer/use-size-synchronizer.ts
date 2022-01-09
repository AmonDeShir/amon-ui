import React, { useEffect, useRef } from 'react';
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

export const useSizeSynchronizer = (
  source: React.MutableRefObject<HTMLElement>,
  target: React.MutableRefObject<HTMLElement>,
) => {
  const observerRef = useRef(
    new (window.ResizeObserver || Polyfill)((entries) => {
      const { width, height } = entries[0].target.getBoundingClientRect();

      target.current?.style.setProperty('width', `${width}px`);
      target.current?.style.setProperty('height', `${height}px`);
    }),
  );

  useEffect(() => {
    const observer = observerRef.current;

    if (source.current) {
      observer.observe(source.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [source, observerRef]);
};
