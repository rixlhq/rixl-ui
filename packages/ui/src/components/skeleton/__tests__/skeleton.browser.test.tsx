import {describe, it, expect, afterEach} from "vitest";
import {render, cleanup} from "@testing-library/react";
import {Skeleton} from "../skeleton";

describe("Skeleton Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("sweeps a highlight band on the pseudo-element and leaves the root unanimated", () => {
    render(<Skeleton data-testid="s" className="h-4 w-32" />);
    const el = document.querySelector<HTMLElement>("[data-testid='s']")!;
    expect(getComputedStyle(el).animationName).toBe("none");
    expect(getComputedStyle(el, "::after").animationName).toBe("rixl-shimmer");
  });

  it("clips the band to the placeholder bounds", () => {
    render(<Skeleton data-testid="s" className="h-4 w-32" />);
    const el = document.querySelector<HTMLElement>("[data-testid='s']")!;
    expect(getComputedStyle(el).overflow).toBe("hidden");
  });
});
