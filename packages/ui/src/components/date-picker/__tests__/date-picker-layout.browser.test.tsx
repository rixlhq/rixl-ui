import {describe, it, expect, afterEach, vi} from "vitest";
import {useState, type ComponentProps} from "react";
import {page} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {de, el, fi, ru} from "react-day-picker/locale";
import {axeViolations} from "../../../../test/a11y";
import {DatePicker} from "../date-picker";

type Locale = NonNullable<ComponentProps<typeof DatePicker>["locale"]>;
type CaptionLayout = NonNullable<ComponentProps<typeof DatePicker>["captionLayout"]>;

const SEPTEMBER_2026 = new Date(2026, 8, 1);
const MAY_2026 = new Date(2026, 4, 1);
const START_MONTH = new Date(2020, 0);
const END_MONTH = new Date(2030, 11);
const WIDE_VIEWPORT = {width: 1100, height: 800};
const NARROW_VIEWPORT = {width: 414, height: 896};
/** Sub-pixel layout rounding is not an overlap. */
const TOLERANCE = 0.5;

type Box = {name: string; left: number; right: number; top: number; bottom: number; width: number};

function boxOf(name: string, element: Element): Box {
  const {left, right, top, bottom, width} = element.getBoundingClientRect();
  return {name, left, right, top, bottom, width};
}

/** The controls of the caption: previous, next, each dropdown (or static month/year text) and the label. */
function captionBoxes(root: Element): Box[] {
  const selectors = [
    ".rdp-button_previous",
    ".rdp-button_next",
    ".rdp-dropdown_root",
    ".rdp-dropdowns > span:not(.rdp-dropdown_root):not([role=status])",
    ".rdp-month_caption > .rdp-caption_label",
  ];
  return Array.from(root.querySelectorAll(selectors.join(","))).map((element, index) => boxOf(`${element.className}#${index}`, element));
}

function overlaps(a: Box, b: Box): boolean {
  const horizontal = Math.min(a.right, b.right) - Math.max(a.left, b.left);
  const vertical = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
  return horizontal > TOLERANCE && vertical > TOLERANCE;
}

/**
 * The horizontal extent of the columns of day cells. The month grid itself is `w-full`, so it stretches
 * with an oversized caption: measuring it, or the root (which is `w-fit`), would pass while the buttons stick out
 * of the columns. The weekday headers have a fixed `--cell-size` width and do not stretch.
 */
function gridSpan(root: Element): Box {
  const headers = Array.from(root.querySelectorAll(".rdp-weekday, .rdp-week_number_header")).map((header, index) =>
    boxOf(`header#${index}`, header)
  );
  const left = Math.min(...headers.map((header) => header.left));
  const right = Math.max(...headers.map((header) => header.right));
  return {name: "grids", left, right, top: 0, bottom: 0, width: right - left};
}

function expectCaptionInside(root: Element) {
  const span = gridSpan(root);
  const rootBox = boxOf("root", root);
  const boxes = captionBoxes(root);
  expect(boxes.length).toBeGreaterThanOrEqual(2);
  const outside = boxes.filter(
    (box) =>
      box.left < span.left - TOLERANCE ||
      box.right > span.right + TOLERANCE ||
      box.left < rootBox.left - TOLERANCE ||
      box.right > rootBox.right + TOLERANCE ||
      box.top < rootBox.top - TOLERANCE ||
      box.bottom > rootBox.bottom + TOLERANCE
  );
  expect(outside.map((box) => box.name)).toEqual([]);
  const overlapping = boxes.flatMap((a, i) =>
    boxes
      .slice(i + 1)
      .filter((b) => overlaps(a, b))
      .map((b) => `${a.name} x ${b.name}`)
  );
  expect(overlapping).toEqual([]);
}

/** The month whose long name is the widest in `locale`, which is the worst case for the month select. */
function longestMonth(locale: Locale): Date {
  const format = new Intl.DateTimeFormat(locale.code, {month: "long"});
  const months = Array.from({length: 12}, (_, month) => new Date(2026, month, 1));
  return months.reduce((longest, month) => (format.format(month).length > format.format(longest).length ? month : longest));
}

function calendarRoot(): Element {
  return document.querySelector('[data-slot="calendar"]')!;
}

describe("DatePicker caption layout (Browser Mode)", () => {
  afterEach(() => {
    cleanup();
  });

  const layouts: CaptionLayout[] = ["label", "dropdown", "dropdown-months", "dropdown-years"];

  describe.each(layouts)("captionLayout=%s", (captionLayout) => {
    it.each([
      {name: "one month", props: {}},
      {name: "week numbers", props: {showWeekNumber: true}},
      {name: "two months side by side", props: {numberOfMonths: 2}, viewport: WIDE_VIEWPORT},
      {name: "two months stacked", props: {numberOfMonths: 2}, viewport: NARROW_VIEWPORT},
      {name: "two months and week numbers", props: {numberOfMonths: 2, showWeekNumber: true}, viewport: WIDE_VIEWPORT},
    ])("keeps every caption control inside the calendar: $name", async ({props, viewport}) => {
      await page.viewport(viewport?.width ?? NARROW_VIEWPORT.width, viewport?.height ?? NARROW_VIEWPORT.height);
      render(
        <DatePicker
          mode="single"
          defaultMonth={SEPTEMBER_2026}
          captionLayout={captionLayout}
          startMonth={START_MONTH}
          endMonth={END_MONTH}
          {...props}
        />
      );
      await expect.element(page.getByRole("grid").first()).toBeVisible();
      expectCaptionInside(calendarRoot());
    });

    it.each([
      {name: "de", locale: de},
      {name: "ru", locale: ru},
      {name: "el", locale: el},
      {name: "fi", locale: fi},
    ])("keeps every caption control inside the calendar in its longest month: $name", async ({locale}) => {
      await page.viewport(NARROW_VIEWPORT.width, NARROW_VIEWPORT.height);
      render(
        <DatePicker
          mode="single"
          locale={locale}
          defaultMonth={longestMonth(locale)}
          captionLayout={captionLayout}
          startMonth={START_MONTH}
          endMonth={END_MONTH}
        />
      );
      await expect.element(page.getByRole("grid")).toBeVisible();
      expectCaptionInside(calendarRoot());
    });

    it("has no WCAG 2.2 AA violations", async () => {
      render(
        <DatePicker
          mode="single"
          defaultMonth={SEPTEMBER_2026}
          captionLayout={captionLayout}
          startMonth={START_MONTH}
          endMonth={END_MONTH}
          footer="Footer"
        />
      );
      await expect.element(page.getByRole("grid")).toBeVisible();
      expect(await axeViolations(document.body)).toEqual([]);
    });
  });

  it("keeps previous, next and the year dropdown in place when the month changes", async () => {
    function Harness() {
      const [month, setMonth] = useState(MAY_2026);
      return (
        <div>
          <button type="button" onClick={() => setMonth(SEPTEMBER_2026)}>
            Show September
          </button>
          <DatePicker
            mode="single"
            locale={de}
            month={month}
            onMonthChange={setMonth}
            captionLayout="dropdown"
            startMonth={START_MONTH}
            endMonth={END_MONTH}
          />
        </div>
      );
    }
    render(<Harness />);
    await expect.element(page.getByRole("grid")).toBeVisible();
    const before = captionBoxes(calendarRoot());
    await page.getByRole("button", {name: "Show September"}).click();
    await expect.element(page.getByRole("combobox").first()).toHaveValue("8");
    // The cross-slide keeps the outgoing month (aria-hidden) in the DOM until its exit animation ends.
    await vi.waitFor(() => {
      expect(document.querySelector('.rdp-month[aria-hidden="true"]')).toBeNull();
    });
    const after = captionBoxes(calendarRoot());
    expect(after.map(({left, width}) => [Math.round(left), Math.round(width)])).toEqual(
      before.map(({left, width}) => [Math.round(left), Math.round(width)])
    );
  });

  it.each([
    {name: "English", locale: undefined},
    {name: "German", locale: de},
  ])("shows the whole month name 'September' in $name without truncating", async ({locale}) => {
    render(
      <DatePicker
        mode="single"
        locale={locale}
        defaultMonth={SEPTEMBER_2026}
        captionLayout="dropdown"
        startMonth={START_MONTH}
        endMonth={END_MONTH}
      />
    );
    await expect.element(page.getByRole("grid")).toBeVisible();
    const labels = Array.from(document.querySelectorAll<HTMLElement>(".rdp-dropdown_root .rdp-caption_label"));
    expect(labels).toHaveLength(2);
    expect(labels.filter((label) => label.scrollWidth > label.clientWidth)).toEqual([]);
  });

  it("lets pointer events through the nav row to the month dropdown beside the buttons", async () => {
    render(
      <DatePicker mode="single" defaultMonth={SEPTEMBER_2026} captionLayout="dropdown" startMonth={START_MONTH} endMonth={END_MONTH} />
    );
    await expect.element(page.getByRole("grid")).toBeVisible();
    const {left, top, width, height} = document.querySelector(".rdp-dropdown_root")!.getBoundingClientRect();
    const hit = document.elementFromPoint(left + width / 2, top + height / 2);
    expect(hit?.closest(".rdp-dropdown_root")).not.toBeNull();
  });

  it("moves to the next month from the nav button beside the caption", async () => {
    render(<DatePicker mode="single" defaultMonth={SEPTEMBER_2026} />);
    await page.getByRole("button", {name: "Go to the Next Month"}).click();
    await expect.element(page.getByRole("status").first()).toHaveTextContent("October 2026");
  });
});
