import {afterEach, describe, expect, it} from "vitest";
import {page} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {DatePicker} from "../date-picker";

const SEPTEMBER_2026 = new Date(2026, 8, 1);
// Tuesday the 8th to Thursday the 17th crosses one week boundary, on Saturday the 12th and Sunday the 13th.
const RANGE = {from: new Date(2026, 8, 8), to: new Date(2026, 8, 17)};
const MONDAY = 1;
const CORNER = {
  topLeft: "borderTopLeftRadius",
  topRight: "borderTopRightRadius",
  bottomLeft: "borderBottomLeftRadius",
  bottomRight: "borderBottomRightRadius",
} as const;

function cellFor(day: number) {
  const button = Array.from(document.querySelectorAll<HTMLButtonElement>("button[data-day]")).find(
    (candidate) => candidate.textContent?.startsWith(String(day)) && !candidate.closest("td")?.hasAttribute("data-outside")
  );
  if (!button) throw new Error(`no day button for ${day}`);
  return button.closest("td")!;
}

/** Which of the cell's four corners are rounded, as computed. */
function roundedCorners(day: number) {
  const style = getComputedStyle(cellFor(day));
  return {
    left: parseFloat(style[CORNER.topLeft]) > 0 && parseFloat(style[CORNER.bottomLeft]) > 0,
    right: parseFloat(style[CORNER.topRight]) > 0 && parseFloat(style[CORNER.bottomRight]) > 0,
    squareLeft: parseFloat(style[CORNER.topLeft]) === 0 && parseFloat(style[CORNER.bottomLeft]) === 0,
    squareRight: parseFloat(style[CORNER.topRight]) === 0 && parseFloat(style[CORNER.bottomRight]) === 0,
  };
}

async function renderRange(props: Partial<Parameters<typeof DatePicker>[0]> = {}, rtl = false) {
  const ui = <DatePicker mode="range" defaultMonth={SEPTEMBER_2026} selected={RANGE} {...(props as object)} />;
  if (rtl) renderRtl(ui);
  else render(ui);
  await expect.element(page.getByRole("grid")).toBeVisible();
}

afterEach(() => {
  cleanup();
  resetDirection();
});

describe("DatePicker range band at the edge of a week", () => {
  it("rounds the end of the band on the last day of the week and the start on the first day, left to right", async () => {
    await renderRange();
    expect(roundedCorners(12)).toMatchObject({right: true, squareLeft: true});
    expect(roundedCorners(13)).toMatchObject({left: true, squareRight: true});
  });

  it("rounds them on the opposite physical sides in a right-to-left page", async () => {
    await renderRange({}, true);
    expect(roundedCorners(12)).toMatchObject({left: true, squareRight: true});
    expect(roundedCorners(13)).toMatchObject({right: true, squareLeft: true});
  });

  it("follows the locale's first day of the week", async () => {
    await renderRange({weekStartsOn: MONDAY});
    expect(roundedCorners(13)).toMatchObject({right: true, squareLeft: true});
    expect(roundedCorners(14)).toMatchObject({left: true, squareRight: true});
    expect(roundedCorners(12)).toMatchObject({squareLeft: true, squareRight: true});
  });

  it("finds the first day of the week when a week-number cell comes before it", async () => {
    await renderRange({showWeekNumber: true});
    expect(roundedCorners(13)).toMatchObject({left: true, squareRight: true});
  });

  it("rounds both sides of a range end that is the first day of a week, and of a start that is the last", async () => {
    await renderRange({selected: {from: new Date(2026, 8, 12), to: new Date(2026, 8, 13)}});
    expect(roundedCorners(12)).toMatchObject({left: true, right: true});
    expect(roundedCorners(13)).toMatchObject({left: true, right: true});
  });

  it("keeps the days inside a week square on both sides", async () => {
    await renderRange();
    expect(roundedCorners(10)).toMatchObject({squareLeft: true, squareRight: true});
  });
});
