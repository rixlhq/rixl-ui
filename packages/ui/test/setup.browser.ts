import "./browser.css";
import "../vitest.setup.ts";

// Vitest Browser drives real Chromium input via Playwright CDP rather than synthetic
// React act() calls, while @testing-library/react's render() leaves IS_REACT_ACT_ENVIRONMENT
// enabled for jsdom. Suppress the resulting false-positive act() warning on async CDP events.
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("was not wrapped in act(...)")) {
    return;
  }
  originalConsoleError(...args);
};
