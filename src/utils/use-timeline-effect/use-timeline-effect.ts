/* eslint-disable react-hooks/exhaustive-deps */
import gsap from 'gsap';
import { DependencyList, useEffect } from 'react';

/** useTimelineEffect creates a useEffect that runs gsap animation, and clears the timeline if the component is unmounted */
const useTimelineEffect = (
  animation: (tl: gsap.core.Timeline) => void,
  deps?: DependencyList,
) => {
  useEffect(() => {
    const tl = gsap.timeline();
    animation(tl);

    return () => {
      tl.clear();
    };
  }, deps);
};

export default useTimelineEffect;
