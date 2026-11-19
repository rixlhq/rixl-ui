import {act, fireEvent, render, screen} from "@testing-library/react";
import {afterEach, describe, expect, it, vi} from "vitest";
import {CopyBlock, type CopyBlockProps} from "../copy-block";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

async function hover() {
  const button = screen.getByRole("button");
  fireEvent.mouseEnter(button);
  fireEvent.mouseMove(button);
  await act(async () => {
    vi.advanceTimersByTime(700);
  });
}

function setup(props: Partial<CopyBlockProps> = {}) {
  vi.useFakeTimers();
  vi.stubGlobal("navigator", {...navigator, clipboard: {writeText: () => Promise.resolve()}});
  render(<CopyBlock title="Token" value="abc" {...props} />);
}

describe("CopyBlock tooltip", () => {
  it("shows no tooltip unless asked for", async () => {
    setup();
    await hover();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows the copy action as the tooltip text by default", async () => {
    setup({tooltip: {}});
    await hover();
    expect(screen.getByText("Copy to clipboard", {selector: "[data-slot='tooltip-content']"})).toBeInTheDocument();
  });

  it("shows tooltip.text on hover", async () => {
    setup({tooltip: {text: "Copy"}});
    await hover();
    expect(screen.getByText("Copy", {selector: "[data-slot='tooltip-content']"})).toBeInTheDocument();
  });

  it("swaps to tooltip.copiedText after a copy, and stays open", async () => {
    setup({tooltip: {text: "Copy", copiedText: "Copied!"}});
    await hover();
    await act(async () => screen.getByRole("button").click());
    expect(screen.getByText("Copied!", {selector: "[data-slot='tooltip-content']"})).toBeInTheDocument();
  });

  it("places the tooltip on the requested side", async () => {
    setup({tooltip: {text: "Copy", side: "bottom"}});
    await hover();
    expect(document.querySelector("[data-slot='tooltip-content']")).toHaveAttribute("data-side", "bottom");
  });
});
