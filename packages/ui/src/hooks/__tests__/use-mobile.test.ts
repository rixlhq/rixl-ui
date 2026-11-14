import {act, renderHook} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";
import {useIsMobile} from "../use-mobile";

const originalWidth = window.innerWidth;

function stubViewport(width: number) {
  const listeners = new Set<() => void>();
  Object.defineProperty(window, "innerWidth", {configurable: true, value: width});
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: width < 768,
    media: query,
    addEventListener: (_type: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_type: string, listener: () => void) => listeners.delete(listener),
  }));
  return {
    resize(next: number) {
      Object.defineProperty(window, "innerWidth", {configurable: true, value: next});
      listeners.forEach((listener) => listener());
    },
  };
}

describe("useIsMobile", () => {
  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {configurable: true, value: originalWidth});
  });

  it("is true below the 768px breakpoint", () => {
    stubViewport(767);
    expect(renderHook(() => useIsMobile()).result.current).toBe(true);
  });

  it("is false at the breakpoint and above", () => {
    stubViewport(768);
    expect(renderHook(() => useIsMobile()).result.current).toBe(false);
  });

  it("updates when the viewport crosses the breakpoint", () => {
    const viewport = stubViewport(1024);
    const {result} = renderHook(() => useIsMobile());

    act(() => viewport.resize(500));

    expect(result.current).toBe(true);
  });
});
