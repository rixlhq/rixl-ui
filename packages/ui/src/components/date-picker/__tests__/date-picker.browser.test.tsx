import {describe, it, expect, afterEach, vi} from "vitest";
import {useState, type CSSProperties} from "react";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import type {DateRange} from "react-day-picker";
import {axeViolations} from "../../../../test/a11y";
import {DatePicker} from "../date-picker";
import {Popover, PopoverTrigger, PopoverContent} from "../../popover/popover";

const JUNE_2026 = new Date(2026, 5, 1);

function SingleHarness() {
  const [value, setValue] = useState<Date | undefined>();
  return <DatePicker mode="single" defaultMonth={JUNE_2026} value={value} onSelect={setValue} />;
}

function RangeHarness() {
  const [value, setValue] = useState<DateRange | undefined>();
  return <DatePicker mode="range" defaultMonth={JUNE_2026} value={value} onSelect={setValue} />;
}

/** Fixed "today" so preset months are deterministic across runs. */
const PRESET_BASE = new Date(2026, 5, 15);

function presetMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/** Mirrors the docs "Range with Presets" gallery composition. */
function PresetsInPopoverHarness() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<Date>(presetMonth(PRESET_BASE));
  const presets: {label: string; range: DateRange}[] = [
    {label: "Today", range: {from: PRESET_BASE, to: PRESET_BASE}},
    {
      label: "Last 7 days",
      range: {from: new Date(PRESET_BASE.getTime() - 6 * 24 * 60 * 60 * 1000), to: PRESET_BASE},
    },
    {
      label: "Last 30 days",
      range: {from: new Date(PRESET_BASE.getTime() - 29 * 24 * 60 * 60 * 1000), to: PRESET_BASE},
    },
  ];
  return (
    <div className="p-8">
      {/* Offset from the viewport edge so the popover fits unclamped in the 414px test viewport: the jitter only shows unclamped. */}
      <div className="ps-16">
        <Popover>
          <PopoverTrigger
            render={
              <button type="button" data-testid="presets-trigger">
                {range?.from ? `${range.from.toLocaleDateString()} – ${range.to?.toLocaleDateString() ?? ""}` : "Select dates"}
              </button>
            }
          />
          <PopoverContent data-testid="presets-content" align="start" className="w-auto p-0">
            <div className="flex flex-col gap-3 p-3 sm:flex-row">
              <div className="flex flex-row gap-1 sm:flex-col">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setRange(preset.range);
                      if (preset.range.from) setMonth(presetMonth(preset.range.from));
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <DatePicker
                mode="range"
                numberOfMonths={2}
                value={range}
                onSelect={(next) => setRange(next)}
                month={month}
                onMonthChange={setMonth}
                showOutsideDays={false}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

const FEB_2026 = new Date(2026, 1, 1);
const OCT_2026 = new Date(2026, 9, 1);

/** Controlled month so the test can swing between digit mixes (Feb vs a full 1–31 October). */
function StabilityHarness() {
  const [month, setMonth] = useState<Date>(FEB_2026);
  const [range, setRange] = useState<DateRange | undefined>();
  return (
    <div>
      <button type="button" onClick={() => setMonth(FEB_2026)}>
        Show February
      </button>
      <button type="button" onClick={() => setMonth(OCT_2026)}>
        Show October
      </button>
      <DatePicker mode="range" month={month} onMonthChange={setMonth} value={range} onSelect={setRange} />
    </div>
  );
}

function monthGridWidth(): number {
  return document.querySelector('[data-slot="calendar"] .rdp-month_grid')!.getBoundingClientRect().width;
}

type BoxRect = {x: number; width: number; height: number};

function contentBox(): BoxRect {
  const {x, width, height} = document.querySelector('[data-testid="presets-content"]')!.getBoundingClientRect();
  return {x, width, height};
}

/** Polls until the popover stops moving (entrance transition + repositioning settled). */
async function settledContentBox(): Promise<BoxRect> {
  let previous = contentBox();
  for (let i = 0; i < 40; i++) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const next = contentBox();
    if (Math.abs(next.x - previous.x) <= 0.5 && Math.abs(next.width - previous.width) <= 0.5) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      const confirm = contentBox();
      if (Math.abs(confirm.x - next.x) <= 0.5 && Math.abs(confirm.width - next.width) <= 0.5) return confirm;
      previous = confirm;
    } else {
      previous = next;
    }
  }
  return contentBox();
}

describe("DatePicker Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the grid without popover chrome", async () => {
    render(<SingleHarness />);
    await expect.element(page.getByRole("grid")).toBeVisible();
  });

  it("has no WCAG 2.2 AA violations in single mode", async () => {
    render(<SingleHarness />);
    await expect.element(page.getByRole("grid")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("has no WCAG 2.2 AA violations in range mode", async () => {
    render(<RangeHarness />);
    await expect.element(page.getByRole("grid")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("selects a single date and marks it selected", async () => {
    render(<SingleHarness />);
    await expect.element(page.getByRole("grid")).toBeVisible();

    await userEvent.click(page.getByRole("button", {name: /June 15th, 2026/}));
    await expect.element(page.getByRole("button", {name: /June 15th, 2026/})).toHaveAttribute("data-selected-single", "true");
  });

  it("completes a range on two distinct days", async () => {
    render(<RangeHarness />);
    await expect.element(page.getByRole("grid")).toBeVisible();

    await userEvent.click(page.getByRole("button", {name: /June 10th, 2026/}));
    await userEvent.click(page.getByRole("button", {name: /June 20th, 2026/}));
    await expect.element(page.getByRole("button", {name: /June 10th, 2026/})).toHaveAttribute("data-range-start", "true");
    await expect.element(page.getByRole("button", {name: /June 20th, 2026/})).toHaveAttribute("data-range-end", "true");
  });

  it("slides the weeks on month navigation, including the very first click", async () => {
    // Slow-motion so the 260ms cross-slide is observable; the animation
    // classes are added by DayPicker's snapshot pass and removed on cleanup.
    render(
      <div style={{"--rixl-cal-slide-duration": "10s"} as CSSProperties}>
        <SingleHarness />
      </div>
    );
    await expect.element(page.getByRole("grid")).toBeVisible();

    await userEvent.click(page.getByRole("button", {name: "Go to the Next Month"}));
    await vi.waitFor(() => {
      expect(document.querySelector(".rixl-anim-weeks-after-enter")).not.toBeNull();
    });
    await expect.element(page.getByRole("button", {name: /July 1st, 2026/})).toBeVisible();
  });

  it("keeps the preset popover anchored while switching presets", async () => {
    render(<PresetsInPopoverHarness />);
    await userEvent.click(page.getByTestId("presets-trigger"));
    await expect.element(page.getByTestId("presets-content")).toBeVisible();

    const boxes: BoxRect[] = [];
    for (const label of ["Today", "Last 7 days", "Last 30 days"]) {
      await userEvent.click(page.getByRole("button", {name: label}));
      boxes.push(await settledContentBox());
    }

    const xs = boxes.map((box) => box.x);
    const widths = boxes.map((box) => box.width);
    expect(Math.max(...xs) - Math.min(...xs)).toBeLessThanOrEqual(1);
    expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
  });

  it("keeps the month-grid width constant across digit mixes and single→range selection", async () => {
    render(<StabilityHarness />);
    await expect.element(page.getByRole("grid")).toBeVisible();

    const widths: number[] = [];
    widths.push(monthGridWidth());

    await userEvent.click(page.getByRole("button", {name: "Show October"}));
    widths.push(monthGridWidth());

    await userEvent.click(page.getByRole("button", {name: /October 5th, 2026/}));
    await userEvent.click(page.getByRole("button", {name: /October 20th, 2026/}));
    await expect.element(page.getByRole("button", {name: /October 20th, 2026/})).toHaveAttribute("data-range-end", "true");
    widths.push(monthGridWidth());

    await userEvent.click(page.getByRole("button", {name: "Show February"}));
    widths.push(monthGridWidth());

    expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
    // The native cross-slide keeps the outgoing month snapshot (aria-hidden)
    // in the DOM until its exit animation ends — let it clean up first.
    await vi.waitFor(() => {
      expect(document.querySelector('.rdp-month[aria-hidden="true"]')).toBeNull();
    });
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
