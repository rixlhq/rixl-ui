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

  it("copies the value to the clipboard on click", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {...navigator, clipboard: {writeText}});
    render(<CopyBlock title="API Key" value="sk_live_123" />);
    await act(async () => {
      screen.getByText("sk_live_123").click();
    });
    expect(writeText).toHaveBeenCalledWith("sk_live_123");
    vi.unstubAllGlobals();
  });
});
