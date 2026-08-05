import "@testing-library/jest-dom/vitest";

// jsdom doesn't implement ResizeObserver, which some primitives (e.g.
// input-otp) rely on. Polyfill with a no-op so tests don't crash.
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// jsdom doesn't implement matchMedia, which useIsMobile (Sidebar) relies
// on. Polyfill as desktop-first so Sidebar renders its desktop shell.
if (typeof globalThis.matchMedia === "undefined") {
  globalThis.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent() {
        return false;
      },
      onchange: null,
    }) as MediaQueryList;
}
