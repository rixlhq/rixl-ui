import {afterEach, describe, expect, it} from "vitest";
import {page} from "vitest/browser";
import {cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {DatePicker} from "../date-picker";

afterEach(() => {
  cleanup();
  resetDirection();
});

async function renderCalendar() {
  renderRtl(<DatePicker mode="single" defaultMonth={new Date(2026, 5, 1)} />);
  await expect.element(page.getByRole("button", {name: /next month/i})).toBeVisible();
}

describe("DatePicker in RTL", () => {
  it("lists previous month to the right of next month", async () => {
    await renderCalendar();
    expect(
      page
        .getByRole("button", {name: /previous month/i})
        .element()
        .getBoundingClientRect().left
    ).toBeGreaterThan(
      page
        .getByRole("button", {name: /next month/i})
        .element()
        .getBoundingClientRect().left
    );
  });

  it.each([/previous month/i, /next month/i])("mirrors the chevron of %s", async (name) => {
    await renderCalendar();
    const icon = page.getByRole("button", {name}).element().querySelector("svg")!;
    expect(getComputedStyle(icon).scale).toBe("-1 1");
  });

  it("has no axe violations", async () => {
    await renderCalendar();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
