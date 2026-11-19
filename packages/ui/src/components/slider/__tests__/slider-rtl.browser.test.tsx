import {afterEach, describe, expect, it} from "vitest";
import {page, userEvent} from "vitest/browser";
import {cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {Slider} from "../index";

afterEach(() => {
  cleanup();
  resetDirection();
});

function renderSlider() {
  renderRtl(<Slider label="Volume" defaultValue={25} />);
}

const thumb = () => page.getByRole("slider", {name: "Volume"});

describe("Slider in RTL", () => {
  it("starts the track on the right, so a low value sits near the right edge", async () => {
    renderSlider();
    await expect.element(thumb()).toBeVisible();
    const control = document.querySelector("[data-slot='slider-control']")!.getBoundingClientRect();
    const mark = thumb().element().getBoundingClientRect();
    expect(control.right - mark.right).toBeLessThan(mark.left - control.left);
  });

  it("raises the value with ArrowLeft", async () => {
    renderSlider();
    thumb().element().focus();
    await userEvent.keyboard("{ArrowLeft}");
    await expect.element(thumb()).toHaveValue("26");
  });

  it("has no axe violations", async () => {
    renderSlider();
    await expect.element(thumb()).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
