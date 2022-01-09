import gsap from 'gsap';

const getProp = (element: Element, value: string) =>
  getComputedStyle(element).getPropertyValue(value);

export const animations = (
  name: 'move-from-center' | 'disappear' | 'scale' | 'none',
  ref: React.MutableRefObject<Element>,
  animationTime: number,
  invert = false,
) =>
  ({
    scale: () =>
      gsap
        .timeline()
        .to(ref.current, { scale: invert ? 1 : 0, duration: animationTime }),

    disappear: () =>
      gsap
        .timeline()
        .to(ref.current, { opacity: invert ? 1 : 0, duration: animationTime }),

    'move-from-center': () =>
      gsap.timeline().to(ref.current, {
        left: invert
          ? getProp(ref.current, '--animation-left-invert')
          : getProp(ref.current, '--animation-left'),
        top: invert
          ? getProp(ref.current, '--animation-top-invert')
          : getProp(ref.current, '--animation-top'),
        duration: animationTime * 0.5,
      }),

    none: () =>
      gsap.timeline().set(ref.current, {
        display: invert ? 'block' : 'none',
      }),
  }[name]());
