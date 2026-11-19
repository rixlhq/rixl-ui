import {afterEach, describe, expect, it} from "vitest";
import {cleanup, render} from "@testing-library/react";
import {Checkbox} from "../checkbox";

describe("Checkbox Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a 16px box with its check centred when nothing styles its parent", () => {
    render(
      <p>
        <Checkbox aria-label="Accept" defaultChecked />
      </p>
    );
    const box = document.querySelector('[data-slot="checkbox"]')!.getBoundingClientRect();
    const icon = document.querySelector('[data-slot="checkbox-icon"]')!.getBoundingClientRect();
    expect({
      width: box.width,
      height: box.height,
      dx: Math.round(icon.left + icon.width / 2 - (box.left + box.width / 2)),
      dy: Math.round(icon.top + icon.height / 2 - (box.top + box.height / 2)),
    }).toEqual({width: 16, height: 16, dx: 0, dy: 0});
  });

  it("rounds its corners to 4px, the radius `rounded-xs` resolves to", () => {
    render(<Checkbox aria-label="Accept" />);
    expect(getComputedStyle(document.querySelector('[data-slot="checkbox"]')!).borderTopLeftRadius).toBe("4px");
  });
});
