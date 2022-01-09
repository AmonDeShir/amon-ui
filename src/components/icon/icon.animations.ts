import gsap from 'gsap';

export const animations = (
  name: 'shake' | 'spin' | 'scale',
  ref: React.MutableRefObject<Element>,
  animationTime: number,
) =>
  ({
    shake: () =>
      gsap
        .timeline()
        .to(ref.current, { rotate: '30deg', duration: animationTime * 0.25 })
        .to(ref.current, { rotate: '-25deg', duration: animationTime * 0.4 })
        .to(ref.current, { rotate: '15deg', duration: animationTime * 0.15 })
        .to(ref.current, { rotate: '-2deg', duration: animationTime * 0.08 })
        .to(ref.current, { rotate: '0deg', duration: animationTime * 0.12 }),

    spin: () =>
      gsap
        .timeline()
        .to(ref.current, { rotate: '30deg', duration: animationTime * 0.15 })
        .to(ref.current, { rotate: '-25deg', duration: animationTime * 0.25 })
        .to(ref.current, { rotate: '360deg', duration: animationTime * 0.6 })
        .set(ref.current, { rotate: '0deg' }),

    scale: () =>
      gsap
        .timeline()
        .to(ref.current, { scale: 1.5, duration: animationTime * 0.5 })
        .to(ref.current, { scale: 1, duration: animationTime * 0.5 }),
  }[name]());
