import {afterEach, describe, expect, it} from "vitest";
import {cleanup, render} from "@testing-library/react";
import {page, userEvent} from "vitest/browser";
import {axeViolations} from "../../../../test/a11y";
import {Checkbox} from "../checkbox";

afterEach(cleanup);

describe("labelled Checkbox in a browser", () => {
  it("has no axe violations in each arrangement", async () => {
    render(
      <main>
        <Checkbox label="Accept the terms" />
        <Checkbox label="Remember me" controlFirst={false} defaultChecked />
        <Checkbox label="Newsletter" required={false} labelTooltip="We send one a month" labelTooltipAriaLabel="About the newsletter" />
        <Checkbox label="Locked" disabled />
        <Checkbox label="Agree" variant="error" />
      </main>
    );
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("toggles when the label text is clicked", async () => {
    render(<Checkbox label="Accept the terms" />);
    await userEvent.click(page.getByText("Accept the terms"));
    expect(page.getByRole("checkbox", {name: "Accept the terms"}).element()).toBeChecked();
  });

  it("centres the box on the label text", () => {
    render(<Checkbox label="Accept the terms" />);
    const box = document.querySelector('[data-slot="checkbox"]')!.getBoundingClientRect();
    const text = page.getByText("Accept the terms").element().getBoundingClientRect();
    expect(Math.abs(box.top + box.height / 2 - (text.top + text.height / 2))).toBeLessThanOrEqual(1);
  });

  it("draws the danger border for variant=error", () => {
    render(<Checkbox label="Agree" variant="error" />);
    const el = document.querySelector('[data-slot="checkbox"]')!;
    const plain = document.createElement("span");
    expect(getComputedStyle(el).borderColor).not.toBe(getComputedStyle(plain).borderColor);
  });
});
