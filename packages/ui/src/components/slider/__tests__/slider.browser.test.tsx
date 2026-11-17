import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb} from "../slider";

function TestSlider({defaultValue = 30}: {defaultValue?: number} = {}) {
  return (
    <div className="p-8">
      <Slider defaultValue={defaultValue}>
        <SliderControl data-testid="slider-control">
          <SliderTrack data-testid="slider-track">
            <SliderIndicator data-testid="slider-indicator" />
          </SliderTrack>
          <SliderThumb data-testid="slider-thumb" aria-label="Volume" />
        </SliderControl>
      </Slider>
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

  it("has no WCAG 2.2 AA violations", async () => {
    render(<TestSlider />);

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
