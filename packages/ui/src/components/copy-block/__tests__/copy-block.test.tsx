import {describe, it, expect, vi} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {CopyBlock} from "../copy-block";

describe("CopyBlock", () => {
  it("renders the title and value", () => {
    render(<CopyBlock title="API Key" value="sk_live_123" />);
    expect(screen.getByText("API Key:")).toBeInTheDocument();
    expect(screen.getByText("sk_live_123")).toBeInTheDocument();
  });

  it("renders the copy button with the icon", () => {
    render(<CopyBlock title="API Key" value="sk_live_123" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toContainHTML("svg");
  });

  it("marks the copy button for slot targeting", () => {
    render(<CopyBlock title="API Key" value="sk_live_123" />);
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "copy-block-button");
  });

  it("copies the value to the clipboard on click and morphs into the copied state", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {...navigator, clipboard: {writeText}});
    render(<CopyBlock title="API Key" value="sk_live_123" />);
    const btn = screen.getByRole("button");
    expect(btn).not.toHaveAttribute("data-copied");
    await act(async () => {
      screen.getByRole("button").click();
    });
    expect(writeText).toHaveBeenCalledWith("sk_live_123");
    expect(btn).toHaveAttribute("data-copied", "true");
    expect(document.querySelector("[data-slot='copy-icon']")?.getAttribute("class")).toContain("blur-[2px]");
    expect(document.querySelector("[data-slot='check-icon']")?.getAttribute("class")).toContain("opacity-100");
    expect(document.querySelector("[data-slot='check-icon']")?.getAttribute("class")).toContain("blur-0");
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(btn).not.toHaveAttribute("data-copied");
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("applies token-based press feedback and focus-visible ring without legacy shadcn classes", () => {
    render(<CopyBlock title="API Key" value="sk_live_123" />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("active:scale-[var(--rixl-press-scale)]");
    expect(btn.className).toContain("motion-reduce:active:scale-100");
    expect(btn.className).toContain("focus-visible:ring-[3px]");
    expect(btn.innerHTML).not.toContain("muted-foreground");
  });
});
