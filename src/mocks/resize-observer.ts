import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

class MockedResizeObserver {
  private entries: ResizeObserverEntry[] = [];

  private instance: ResizeObserver;

  private callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.instance = new Polyfill(callback);
    this.callback = callback;

    resizeObserverMock.instances.push(this);
  }

  observe(element: HTMLElement) {
    if (element) {
      this.instance.observe(element);
      this.entries.push({
        borderBoxSize: [],
        contentBoxSize: [],
        contentRect: element.getBoundingClientRect(),
        target: element,
      });
    }
  }

  disconnect() {
    this.instance.disconnect();
  }

  unobserve(element: HTMLElement) {
    this.instance.unobserve(element);
    this.entries = this.entries.filter(({ target }) => target !== element);
  }

  simulateResize(rects: Partial<DOMRect>[]) {
    for (let i = 0; i < Math.min(rects.length, this.entries.length); i += 1) {
      const { target } = this.entries[i];
      const rect = target.getBoundingClientRect();

      target.getBoundingClientRect = () => ({ ...rect, ...rects[i] });
    }

    this.callback(this.entries, this.instance);
  }
}

export const resizeObserverMock = {
  original: window.ResizeObserver,
  instances: new Array<MockedResizeObserver>(),

  mock: () => {
    window.ResizeObserver = MockedResizeObserver as any;
  },

  restore: () => {
    resizeObserverMock.instances = [];
    window.ResizeObserver = resizeObserverMock.original;
  },

  clearInstances: () => {
    resizeObserverMock.instances = [];
  },

  getMocked: (observer: ResizeObserver | MockedResizeObserver) =>
    observer as MockedResizeObserver,
};
