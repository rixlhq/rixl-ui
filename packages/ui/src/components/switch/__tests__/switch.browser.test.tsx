import {describe, it, expect, afterEach} from "vitest";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Switch} from "../switch";

function thumbAndTrack(container: HTMLElement) {
  const track = container.querySelector<HTMLElement>("[data-slot='switch']")!.getBoundingClientRect();
  const thumb = container.querySelector<HTMLElement>("[data-slot='switch-thumb']")!.getBoundingClientRect();
  return {track, thumb};
}

describe("Switch Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it.each(["ltr", "rtl"] as const)("keeps the checked thumb inside the track in %s", (dir) => {
    const {container} = render(
      <div dir={dir}>
        <Switch defaultChecked aria-label="Notifications" />
      </div>
    );

    const {track, thumb} = thumbAndTrack(container);
    expect(thumb.left).toBeGreaterThanOrEqual(track.left);
    expect(thumb.right).toBeLessThanOrEqual(track.right);
  });

  it.each(["ltr", "rtl"] as const)("keeps the unchecked thumb inside the track in %s", (dir) => {
    const {container} = render(
      <div dir={dir}>
        <Switch aria-label="Notifications" />
      </div>
    );

    const {track, thumb} = thumbAndTrack(container);
    expect(thumb.left).toBeGreaterThanOrEqual(track.left);
    expect(thumb.right).toBeLessThanOrEqual(track.right);
  });

  it("has no WCAG 2.2 AA violations", async () => {
    render(<Switch aria-label="Notifications" />);

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
