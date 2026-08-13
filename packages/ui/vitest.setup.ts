import "@testing-library/jest-dom/vitest";
import {cleanup} from "@testing-library/react";
import {vi, afterEach} from "vitest";

// Use fake timers so async effects from components like input-otp can be
// flushed before the test environment is torn down.
vi.useFakeTimers({shouldAdvanceTime: true});

// Clean up rendered React trees after each test and flush any pending timers
// so they don't leak into the next test environment.
afterEach(() => {
  cleanup();
  vi.runOnlyPendingTimers();
});

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
