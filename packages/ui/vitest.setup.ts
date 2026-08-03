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
