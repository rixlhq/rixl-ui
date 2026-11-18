import {describe, it, expect, afterEach} from "vitest";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Progress} from "../progress";

function measure(container: HTMLElement) {
  const track = container.querySelector<HTMLElement>("[data-slot='progress']")!;
  const indicator = container.querySelector<HTMLElement>("[data-slot='progress-indicator']")!;
  return {track: track.getBoundingClientRect(), indicator: indicator.getBoundingClientRect(), style: getComputedStyle(indicator)};
}

describe("Progress Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders an indeterminate indicator narrower than the track", () => {
    const {container} = render(<Progress value={null} aria-label="Loading" className="w-48" />);

    const {track, indicator} = measure(container);
    expect(indicator.width).toBeLessThan(track.width);
  });

  it("animates the indeterminate indicator", () => {
    const {container} = render(<Progress value={null} aria-label="Loading" className="w-48" />);

    expect(measure(container).style.animationName).not.toBe("none");
  });

  it("loops the indeterminate animation linearly", () => {
    const {container} = render(<Progress value={null} aria-label="Loading" className="w-48" />);

    const {style} = measure(container);
    expect(style.animationTimingFunction).toBe("linear");
    expect(style.animationIterationCount).toBe("infinite");
  });

  it.each([
    ["ltr", "right"],
    ["rtl", "left"],
  ] as const)("in %s, the band is in the track's %s half three quarters through the sweep", (dir, half) => {
    const {container} = render(
      <div dir={dir}>
        <Progress value={null} aria-label="Loading" className="w-48" />
      </div>
    );
    const indicator = container.querySelector<HTMLElement>("[data-slot='progress-indicator']")!;
    const [animation] = indicator.getAnimations();
    const iterationDuration = Number(animation!.effect!.getComputedTiming().duration);
    animation!.pause();
    animation!.currentTime = iterationDuration * 0.75;

    const {track, indicator: band} = measure(container);
    const trackMiddle = track.left + track.width / 2;
    if (half === "right") {
      expect(band.left).toBeGreaterThan(trackMiddle);
    } else {
      expect(band.right).toBeLessThan(trackMiddle);
    }
  });

  it("keeps a complete bar full width and still", () => {
    const {container} = render(<Progress value={100} aria-label="Upload" className="w-48" />);

    const {track, indicator, style} = measure(container);
    expect(indicator.width).toBe(track.width);
    expect(style.animationName).toBe("none");
  });

  it("has no WCAG 2.2 AA violations when indeterminate", async () => {
    render(<Progress value={null} aria-label="Loading" />);
    // axeViolations waits for animations to finish, which an infinite loop never does.
    document.getAnimations().forEach((animation) => animation.cancel());

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
