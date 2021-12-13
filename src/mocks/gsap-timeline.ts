/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import gsap from 'gsap';

class Timeline {
  public static to(ref: HTMLElement | HTMLElement[], style: any) {
    [ref].flatMap((ref) => ref).map(this.handleCss(style));
    return Timeline;
  }

  public static set(ref: HTMLElement | HTMLElement[], style: any) {
    [ref].flatMap((ref) => ref).map(this.handleCss(style));
    return Timeline;
  }

  public static clear() {
    return Timeline;
  }

  public static call(callback: () => void) {
    callback();
    return Timeline;
  }

  private static replaceTransform(
    transform: string,
    name: string,
    value: string,
  ) {
    transform = `${transform}`;
    const reg = new RegExp(`${name}\\((.*?)\\)`, 'g');

    if (transform.search(reg) !== -1) {
      transform = transform.replace(reg, value);
    } else if (transform.length === 0) {
      transform = value;
    } else {
      transform = `${transform} ${value}`;
    }

    return transform;
  }

  private static handleCss(style: any) {
    return (ref: HTMLElement) => {
      for (const key in style) {
        const value = style[key];
        switch (key) {
          case 'scale':
            ref.style.transform = Timeline.replaceTransform(
              ref.style.transform,
              'scale',
              `scale(${value})`,
            );
            break;

          case 'rotationX':
            ref.style.transform = Timeline.replaceTransform(
              ref.style.transform,
              'rotateX',
              `rotateX(${value}deg)`,
            );
            break;

          case 'translateX':
            ref.style.transform = Timeline.replaceTransform(
              ref.style.transform,
              'translate',
              `translate(${value}px, 0px, 0px)`,
            );
            break;

          case 'translateY':
            ref.style.transform = Timeline.replaceTransform(
              ref.style.transform,
              'translate',
              `translate(0px, ${value}px, 0px)`,
            );
            break;

          case 'duration':
            break;

          default:
            ref.style[key as any] = value;
            break;
        }
      }
    };
  }
}

const timelineMock = {
  original: gsap.timeline,

  advanceMock: () => {
    gsap.timeline = () => Timeline as any;
  },

  mock: () => {
    const data = {
      to: [],
      set: [],
      clear: 0,
    };

    const clear = () => {
      data.set = [];
      data.to = [];
      data.clear = 0;
    };

    gsap.timeline = () =>
      ({
        to: (...args: any[]) => {
          data.to.push(args);
          return gsap.timeline();
        },

        set: (...args: any[]) => {
          data.set.push(args);
          return gsap.timeline();
        },

        clear: () => {
          data.clear += 1;
        },
      } as any);

    return {
      mockData: data,
      clear,
    };
  },

  restore: () => {
    gsap.timeline = timelineMock.original;
  },
};

export default timelineMock;
