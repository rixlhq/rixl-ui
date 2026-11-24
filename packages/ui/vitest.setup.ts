import "@testing-library/jest-dom/vitest";
import {cleanup} from "@testing-library/react";
import {afterEach} from "vitest";

// Ensure clean DOM between tests in both happy-dom and browser mode
afterEach(() => {
  cleanup();
});
