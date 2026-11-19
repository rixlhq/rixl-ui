import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Slider} from "../slider";

function TestSlider({defaultValue = 30}: {defaultValue?: number} = {}) {
  return (
    <div className="p-8">
      <Slider label="Volume" defaultValue={defaultValue} />
    </div>
  );
}

describe("Slider Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the thumb and exposes the seeded value", async () => {
    render(<TestSlider />);

    const slider = page.getByRole("slider");
    await expect.element(slider).toBeVisible();
    await expect.element(slider).toHaveAttribute("aria-valuenow", "30");
  });

  it("steps the value with ArrowRight and restores it with ArrowLeft", async () => {
    render(<TestSlider defaultValue={30} />);

    const slider = page.getByRole("slider");
    // The thumb div overlays Base UI's hidden native input, so a Playwright
    // click on the input never dispatches. Focus it directly instead — the
    // input still owns keyboard handling once focused.
    (slider.element() as HTMLElement).focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect.element(slider).toHaveAttribute("aria-valuenow", "31");

    await userEvent.keyboard("{ArrowLeft}");
    await expect.element(slider).toHaveAttribute("aria-valuenow", "30");
  });

  it("scales the thumb while dragging without moving it off the pointer", async () => {
    render(<TestSlider defaultValue={30} />);

    const control = document.querySelector<HTMLElement>("[data-slot='slider-control']")!;
    const thumb = document.querySelector<HTMLElement>("[data-slot='slider-thumb']")!;
    const rect = control.getBoundingClientRect();
    const pointerX = rect.left + rect.width * 0.7;
    const pointer = {
      pointerId: 1,
      pointerType: "mouse",
      button: 0,
      buttons: 1,
      bubbles: true,
      clientX: pointerX,
      clientY: rect.top + rect.height / 2,
    };
    control.dispatchEvent(new PointerEvent("pointerdown", pointer));
    await expect.poll(() => thumb.hasAttribute("data-dragging")).toBe(true);

    // The transition on `scale` is separate from Base UI's inline `translate`, so the thumb's centre stays under the pointer even mid-transition.
    await expect.poll(() => getComputedStyle(thumb).scale).not.toBe("none");
    const thumbRect = thumb.getBoundingClientRect();
    expect(Math.abs(thumbRect.left + thumbRect.width / 2 - pointerX)).toBeLessThan(1);

    document.dispatchEvent(new PointerEvent("pointerup", {...pointer, buttons: 0}));
  });

  it("names the thumb after the visible label", async () => {
    render(<TestSlider />);

    await expect.element(page.getByRole("slider", {name: "Volume"})).toBeVisible();
  });

  it("has no WCAG 2.2 AA violations", async () => {
    render(<TestSlider />);

    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("has no WCAG 2.2 AA violations as a labelled range at size sm", async () => {
    render(
      <div className="p-8">
        <Slider
          label="Price"
          size="sm"
          defaultValue={[20, 80]}
          getAriaLabel={(index) => (index === 0 ? "Minimum price" : "Maximum price")}
        />
      </div>
    );

    await expect.element(page.getByRole("slider", {name: "Maximum price"})).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
