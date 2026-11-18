import {describe, it, expect, afterEach, vi} from "vitest";
import {useState, type ComponentProps} from "react";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {de, el, fi, ru} from "react-day-picker/locale";
import {axeViolations} from "../../../../test/a11y";
import {DatePicker} from "../date-picker";
import {Popover, PopoverContent, PopoverTrigger} from "../../popover/popover";
import {Card, CardContent} from "../../card";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "../../dialog/dialog";

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
/** `--spacing(9)`: the cell is the size of a default Button, and seven of them fit a default `PopoverContent` (`w-72 p-4`). */
const CELL_SIZE = 36;

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
      {name: "right to left", props: {dir: "rtl" as const}},
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

type SurfaceStyle = {border: string; background: string; shadowed: boolean; padding: string; radius: string};

/** `shadow-none` computes to Tailwind's stack of transparent zero-size shadows, not to `none`. */
function isShadowed(boxShadow: string): boolean {
  return boxShadow.replaceAll("rgba(0, 0, 0, 0) 0px 0px 0px 0px", "").replaceAll(/[\s,]/g, "") !== "" && boxShadow !== "none";
}

function surfaceOf(root: Element): SurfaceStyle {
  const style = getComputedStyle(root);
  return {
    border: style.borderTopWidth,
    background: style.backgroundColor,
    shadowed: isShadowed(style.boxShadow),
    padding: style.paddingTop,
    radius: style.borderTopLeftRadius,
  };
}

const NO_SURFACE: SurfaceStyle = {border: "0px", background: "rgba(0, 0, 0, 0)", shadowed: false, padding: "0px", radius: "0px"};

describe("DatePicker surface (Browser Mode)", () => {
  afterEach(() => {
    cleanup();
  });

  it("draws a bordered, padded surface when it stands alone", async () => {
    render(<DatePicker mode="single" defaultMonth={SEPTEMBER_2026} />);
    await expect.element(page.getByRole("grid")).toBeVisible();
    const surface = surfaceOf(calendarRoot());
    expect(surface.border).toBe("1px");
    expect(surface.padding).toBe("12px");
    expect(surface.background).not.toBe(NO_SURFACE.background);
    expect(surface.shadowed).toBe(true);
    expect(surface.radius).not.toBe("0px");
  });

  it("lets a consumer className remove the standalone surface", async () => {
    render(<DatePicker mode="single" defaultMonth={SEPTEMBER_2026} className="border-0 bg-transparent p-0 shadow-none" />);
    await expect.element(page.getByRole("grid")).toBeVisible();
    expect(surfaceOf(calendarRoot())).toMatchObject({border: "0px", background: NO_SURFACE.background, padding: "0px", shadowed: false});
  });

  it("draws nothing of its own inside a popover, which owns the surface and padding", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Pick</PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <DatePicker mode="single" defaultMonth={SEPTEMBER_2026} />
        </PopoverContent>
      </Popover>
    );
    await expect.element(page.getByRole("grid")).toBeVisible();
    expect(surfaceOf(calendarRoot())).toEqual(NO_SURFACE);
    expect(calendarRoot().getBoundingClientRect().width).toBe(7 * CELL_SIZE);
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("fits the default popover width without padding of its own", async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Pick</PopoverTrigger>
        <PopoverContent>
          <DatePicker mode="single" defaultMonth={SEPTEMBER_2026} />
        </PopoverContent>
      </Popover>
    );
    await expect.element(page.getByRole("grid")).toBeVisible();
    const popup = document.querySelector('[data-slot="popover-content"]')!;
    const popupStyle = getComputedStyle(popup);
    const inner = popup.clientWidth - parseFloat(popupStyle.paddingLeft) - parseFloat(popupStyle.paddingRight);
    expect(calendarRoot().getBoundingClientRect().width).toBeLessThanOrEqual(inner);
  });

  it("draws nothing of its own inside a card", async () => {
    render(
      <Card>
        <CardContent>
          <DatePicker mode="single" defaultMonth={SEPTEMBER_2026} />
        </CardContent>
      </Card>
    );
    await expect.element(page.getByRole("grid")).toBeVisible();
    expect(surfaceOf(calendarRoot())).toEqual(NO_SURFACE);
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("draws nothing of its own inside a dialog", async () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Pick a date</DialogTitle>
          <DatePicker mode="single" defaultMonth={SEPTEMBER_2026} />
        </DialogContent>
      </Dialog>
    );
    await expect.element(page.getByRole("grid")).toBeVisible();
    expect(surfaceOf(calendarRoot())).toEqual(NO_SURFACE);
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("has no WCAG 2.2 AA violations standalone", async () => {
    render(<DatePicker mode="single" defaultMonth={SEPTEMBER_2026} />);
    await expect.element(page.getByRole("grid")).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});

/** The colour a token utility such as `bg-rixl-primary` resolves to in the current theme, read from a probe element. */
function tokenColor(utility: string, property: "backgroundColor" | "borderTopColor" | "color" = "backgroundColor"): string {
  const probe = document.createElement("div");
  probe.className = utility;
  document.body.append(probe);
  const value = getComputedStyle(probe)[property];
  probe.remove();
  return value;
}

function dayButtonFor(day: number): HTMLButtonElement {
  const button = Array.from(document.querySelectorAll<HTMLButtonElement>("button[data-day]")).find(
    (candidate) => candidate.textContent?.startsWith(String(day)) && !candidate.closest("td")?.hasAttribute("data-outside")
  );
  if (!button) throw new Error(`no day button for ${day}`);
  return button;
}

describe("DatePicker cells (Browser Mode)", () => {
  afterEach(() => {
    cleanup();
  });

  const TODAY = new Date(2026, 8, 15);

  it("fills each cell with its day button", async () => {
    render(<DatePicker mode="single" defaultMonth={SEPTEMBER_2026} today={TODAY} />);
    await expect.element(page.getByRole("grid")).toBeVisible();
    const button = dayButtonFor(10);
    const cell = button.closest("td")!;
    expect(button.getBoundingClientRect().width).toBe(cell.getBoundingClientRect().width);
    expect(button.getBoundingClientRect().height).toBe(cell.getBoundingClientRect().height);
  });

  it("marks today with an outline, not a fill", async () => {
    render(<DatePicker mode="single" defaultMonth={SEPTEMBER_2026} today={TODAY} />);
    await expect.element(page.getByRole("grid")).toBeVisible();
    const style = getComputedStyle(dayButtonFor(15));
    expect(style.borderTopWidth).toBe("1px");
    expect(style.borderTopColor).toBe(tokenColor("border-rixl-fg-muted", "borderTopColor"));
    expect(style.backgroundColor).toBe("rgba(0, 0, 0, 0)");
    expect(getComputedStyle(dayButtonFor(16)).borderTopColor).toBe("rgba(0, 0, 0, 0)");
  });

  it("shows no outline halo around a selected today", async () => {
    render(<DatePicker mode="single" defaultMonth={SEPTEMBER_2026} today={TODAY} selected={TODAY} />);
    await expect.element(page.getByRole("grid")).toBeVisible();
    const style = getComputedStyle(dayButtonFor(15));
    expect(style.backgroundColor).toBe(tokenColor("bg-rixl-primary"));
    expect(style.borderTopColor).toBe("rgba(0, 0, 0, 0)");
  });

  it("draws a continuous muted band behind the days between a range's caps", async () => {
    render(<DatePicker mode="range" defaultMonth={SEPTEMBER_2026} selected={{from: new Date(2026, 8, 8), to: new Date(2026, 8, 12)}} />);
    await expect.element(page.getByRole("grid")).toBeVisible();
    const muted = tokenColor("bg-rixl-surface-muted");
    const cells = [8, 9, 10, 11, 12].map((day) => dayButtonFor(day).closest("td")!);
    expect(cells.map((cell) => getComputedStyle(cell).backgroundColor)).toEqual(Array(5).fill(muted));
    const boxes = cells.map((cell) => cell.getBoundingClientRect());
    expect(boxes.slice(1).map((box, index) => box.left - boxes[index].right)).toEqual([0, 0, 0, 0]);
    expect(getComputedStyle(dayButtonFor(8)).backgroundColor).toBe(tokenColor("bg-rixl-primary"));
    expect(getComputedStyle(dayButtonFor(12)).backgroundColor).toBe(tokenColor("bg-rixl-primary"));
    expect(getComputedStyle(dayButtonFor(10)).backgroundColor).toBe("rgba(0, 0, 0, 0)");
  });

  it("shows the shared focus ring on the day that keyboard navigation reaches", async () => {
    render(<DatePicker mode="single" defaultMonth={SEPTEMBER_2026} today={TODAY} selected={TODAY} />);
    await expect.element(page.getByRole("grid")).toBeVisible();
    dayButtonFor(15).focus();
    await userEvent.keyboard("{ArrowRight}");
    await vi.waitFor(() => {
      expect(document.activeElement).toBe(dayButtonFor(16));
    });
    // The ring and border colour fade in over the token duration.
    await vi.waitFor(() => {
      const style = getComputedStyle(dayButtonFor(16));
      expect(isShadowed(style.boxShadow)).toBe(true);
      expect(style.borderTopColor).toBe(tokenColor("border-rixl-ring", "borderTopColor"));
    });
  });

  it("keeps the footer a gap below the grid", async () => {
    render(<DatePicker mode="single" defaultMonth={SEPTEMBER_2026} footer={<p>3 of 5 selected</p>} />);
    await expect.element(page.getByText("3 of 5 selected")).toBeVisible();
    const footer = page.getByText("3 of 5 selected").element().getBoundingClientRect();
    const grid = document.querySelector(".rdp-month_grid")!.getBoundingClientRect();
    expect(footer.top - grid.bottom).toBeGreaterThanOrEqual(8);
  });

  it("has no WCAG 2.2 AA violations with a range, today, a disabled day and week numbers", async () => {
    render(
      <DatePicker
        mode="range"
        defaultMonth={SEPTEMBER_2026}
        today={TODAY}
        showWeekNumber
        disabled={new Date(2026, 8, 20)}
        selected={{from: new Date(2026, 8, 8), to: new Date(2026, 8, 12)}}
        footer="Footer"
      />
    );
    await expect.element(page.getByRole("grid")).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
