import * as useRectModule from '../utils/use-rect/use-rect';

export const useRectMock = {
  original: useRectModule.useRect,

  mock: (value: Partial<DOMRect>) => {
    (useRectModule as any).useRect = () => ({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...value,
    });
  },

  restore: () => {
    (useRectModule as any).useRect = useRectMock.original;
  },
};
