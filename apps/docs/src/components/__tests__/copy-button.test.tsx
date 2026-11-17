import {act} from "react";
import {createRoot} from "react-dom/client";
import {afterEach, beforeEach, describe, expect, it, vi} from "vite-plus/test";
import {CopyButton} from "../copy-button";

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
const writeText = vi.fn();
beforeEach(async () => {
  vi.useFakeTimers();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  vi.stubGlobal("navigator", {clipboard: {writeText}});
  writeText.mockReset().mockResolvedValue(undefined);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root.render(<CopyButton text="example code" />));
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
describe("inline copy feedback", () => {
  it("copies the snippet and restores its label after feedback", async () => {
    await act(async () => container.querySelector("button")!.click());
    expect(writeText).toHaveBeenCalledWith("example code");
    expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("Copied");
    await act(async () => vi.advanceTimersByTime(1500));
    expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("Copy code");
  });
  it("reports clipboard failure inline", async () => {
    writeText.mockRejectedValueOnce(new Error("Clipboard unavailable"));
    await act(async () => container.querySelector("button")!.click());
    expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("Copy failed");
  });
  it("extends feedback when the button is pressed again", async () => {
    await act(async () => container.querySelector("button")!.click());
    await act(async () => vi.advanceTimersByTime(1000));
    await act(async () => container.querySelector("button")!.click());
    await act(async () => vi.advanceTimersByTime(1000));
    expect(container.querySelector('[aria-live="polite"]')?.textContent).toBe("Copied");
  });
});
