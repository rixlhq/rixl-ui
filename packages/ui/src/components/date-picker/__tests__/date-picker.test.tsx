import {describe, it, expect, vi} from "vitest";
import {useState} from "react";
import {act, render, screen} from "@testing-library/react";
import type {DateRange} from "react-day-picker";
import {rtlFlip} from "../../../lib/classes";
import {DatePicker} from "../date-picker";

const JUNE_2026 = new Date(2026, 5, 1);

/** An enabled in-month day button for the fixed June 2026 month. */
function dayButton(date: Date): HTMLButtonElement {
  const key = date.toLocaleDateString();
  const hit = Array.from(document.querySelectorAll<HTMLButtonElement>("button[data-day]")).find(
    (button) => button.dataset.day === key && !button.disabled
  );
  if (!hit) throw new Error(`no enabled day button for ${key}`);
  return hit;
}

function SingleHarness({onChange}: {onChange?: (date: Date | undefined) => void}) {
  const [value, setValue] = useState<Date | undefined>();
  return (
    <DatePicker
      mode="single"
      defaultMonth={JUNE_2026}
      selected={value}
      onChange={(date) => {
        setValue(date);
        onChange?.(date);
      }}
    />
  );
}

function RangeHarness({onChange}: {onChange?: (range: DateRange | undefined) => void}) {
  const [value, setValue] = useState<DateRange | undefined>();
  return (
    <DatePicker
      mode="range"
      defaultMonth={JUNE_2026}
      selected={value}
      onChange={(range) => {
        setValue(range);
        onChange?.(range);
      }}
    />
  );
}

function MultipleHarness({onChange}: {onChange?: (dates: Date[] | undefined) => void}) {
  const [value, setValue] = useState<Date[] | undefined>();
  return (
    <DatePicker
      mode="multiple"
      defaultMonth={JUNE_2026}
      selected={value}
      onChange={(dates) => {
        setValue(dates);
        onChange?.(dates);
      }}
    />
  );
}

describe("DatePicker", () => {
  it("renders the bare calendar grid with no popover chrome", () => {
    render(<SingleHarness />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='popover-trigger']")).not.toBeInTheDocument();
    expect(document.querySelector("[data-slot='popover-content']")).not.toBeInTheDocument();
  });

  it("marks its root with data-slot calendar and renders a data-day button per visible day", () => {
    render(<SingleHarness />);
    const root = document.querySelector("[data-slot='calendar']")!;
    expect(root.querySelectorAll("button[data-day]").length).toBeGreaterThanOrEqual(30);
  });

  it("selects a single date and notifies onChange", () => {
    const onChange = vi.fn();
    render(<SingleHarness onChange={onChange} />);
    act(() => dayButton(new Date(2026, 5, 15)).click());
    expect(onChange).toHaveBeenCalledOnce();
    expect((onChange.mock.calls[0] as Date[])[0]?.getTime()).toBe(new Date(2026, 5, 15).getTime());
    expect(dayButton(new Date(2026, 5, 15))).toHaveAttribute("data-selected-single", "true");
  });

  it("completes a range on two distinct days and marks both ends", () => {
    const onChange = vi.fn();
    render(<RangeHarness onChange={onChange} />);
    act(() => dayButton(new Date(2026, 5, 10)).click());
    act(() => dayButton(new Date(2026, 5, 20)).click());
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(dayButton(new Date(2026, 5, 10))).toHaveAttribute("data-range-start", "true");
    expect(dayButton(new Date(2026, 5, 20))).toHaveAttribute("data-range-end", "true");
  });

  it("selects multiple dates", () => {
    const onChange = vi.fn();
    render(<MultipleHarness onChange={onChange} />);
    act(() => dayButton(new Date(2026, 5, 10)).click());
    act(() => dayButton(new Date(2026, 5, 11)).click());
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("enforces max selected days in multiple mode", () => {
    const onChange = vi.fn();
    render(<DatePicker mode="multiple" defaultMonth={JUNE_2026} max={1} onChange={onChange} />);
    act(() => dayButton(new Date(2026, 5, 10)).click());
    act(() => dayButton(new Date(2026, 5, 11)).click());
    const last = onChange.mock.calls[onChange.mock.calls.length - 1] as Date[][];
    expect(last[0]).toHaveLength(1);
  });

  it("disables the days matching the disabled matcher", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} disabled={{before: new Date(2026, 5, 15)}} />);
    expect(dayButton(new Date(2026, 5, 20))).not.toBeDisabled();
    const early = Array.from(document.querySelectorAll<HTMLButtonElement>("button[data-day]")).find(
      (button) => button.dataset.day === new Date(2026, 5, 10).toLocaleDateString()
    )!;
    expect(early).toBeDisabled();
  });

  it("paints range and selection backgrounds instantly instead of fading them", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    const button = dayButton(new Date(2026, 5, 15));
    expect(button.className).toContain("transition-[scale,color,box-shadow,border-color]");
    expect(button.className).not.toContain("background-color");
  });

  it("names day buttons with the visible day number first for Label in Name", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    expect(dayButton(new Date(2026, 5, 15)).getAttribute("aria-label")).toMatch(/^15, /);
  });

  it("shows outside days by default for a single month", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    expect(document.querySelector("[data-slot='calendar'] td[data-outside='true']:not([data-hidden='true'])")).toBeInTheDocument();
  });

  it("hides outside days by default in a multi-month view so dates are not duplicated between panels", () => {
    render(<DatePicker mode="range" defaultMonth={JUNE_2026} numberOfMonths={2} />);
    const outside = document.querySelectorAll("[data-slot='calendar'] td[data-outside='true']");
    expect(outside.length).toBeGreaterThan(0);
    expect(document.querySelector("[data-slot='calendar'] td[data-outside='true']:not([data-hidden='true'])")).not.toBeInTheDocument();
  });

  it("shows outside days in a multi-month view when showOutsideDays is set", () => {
    render(<DatePicker mode="range" defaultMonth={JUNE_2026} numberOfMonths={2} showOutsideDays />);
    expect(document.querySelector("[data-slot='calendar'] td[data-outside='true']:not([data-hidden='true'])")).toBeInTheDocument();
  });

  it("hides outside days in a single month when showOutsideDays is false", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} showOutsideDays={false} />);
    expect(document.querySelector("[data-slot='calendar'] td[data-outside='true']:not([data-hidden='true'])")).not.toBeInTheDocument();
  });

  it("renders month and year dropdowns with the dropdown caption", () => {
    render(
      <DatePicker
        mode="single"
        defaultMonth={JUNE_2026}
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
      />
    );
    expect(document.querySelectorAll("[data-slot='calendar'] select")).toHaveLength(2);
  });

  it("renders the footer below the calendar", () => {
    render(<DatePicker mode="multiple" defaultMonth={JUNE_2026} footer={<p>usage hint</p>} />);
    expect(document.querySelector("[data-slot='calendar']")).toHaveTextContent("usage hint");
  });

  it("navigates the controlled month via onMonthChange", () => {
    const onMonthChange = vi.fn();
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} month={JUNE_2026} onMonthChange={onMonthChange} />);
    act(() => screen.getByRole("button", {name: "Go to the Next Month"}).click());
    expect(onMonthChange).toHaveBeenCalledOnce();
    expect((onMonthChange.mock.calls[0] as Date[])[0]?.getMonth()).toBe(6);
  });

  it("merges a consumer className onto the grid without dropping the base ones", () => {
    render(<SingleHarness />);
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} className="p-6" />);
    const grids = document.querySelectorAll("[data-slot='calendar']");
    expect(grids[1].className).toContain("p-6");
    expect(grids[1].className).toContain("bg-rixl-surface");
  });

  it("flanks the caption with the month navigation, which lets pointer events through between the buttons", () => {
    render(<SingleHarness />);
    const nav = document.querySelector("[data-slot='calendar'] .rdp-nav")!;
    expect(nav.className).toContain("inset-x-0");
    expect(nav.className).toContain("justify-between");
    expect(nav.className).toContain("pointer-events-none");
    expect(screen.getByRole("button", {name: "Go to the Next Month"}).className).toContain("pointer-events-auto");
  });

  it("centres the month caption between the navigation buttons", () => {
    render(<SingleHarness />);
    const caption = document.querySelector("[data-slot='calendar'] .rdp-month_caption")!;
    expect(caption.className).toContain("justify-center");
    expect(caption.className).toContain("px-(--cell-size)");
  });

  it("gives the caption no intrinsic width so a long month name cannot widen the calendar", () => {
    render(<SingleHarness />);
    const caption = document.querySelector("[data-slot='calendar'] .rdp-month_caption")!;
    expect(caption.className).toContain("w-0");
    expect(caption.className).toContain("min-w-full");
  });

  it("mirrors the previous and next chevrons in RTL", () => {
    render(<SingleHarness />);
    const flipped = (selector: string) => document.querySelector(`[data-slot='calendar'] ${selector} svg`)?.getAttribute("class");
    expect(flipped(".rdp-button_previous")).toContain(rtlFlip);
    expect(flipped(".rdp-button_next")).toContain(rtlFlip);
  });

  it("fixes day and weekday cells to the cell size so digit count cannot shift the grid", () => {
    render(<SingleHarness />);
    const day = document.querySelector("[data-slot='calendar'] .rdp-day")!;
    expect(day.className).toContain("size-(--cell-size)");
    expect(day.className).toContain("shrink-0");
    expect(day.className).toContain("tabular-nums");
    expect(day.className).not.toContain("w-full");
    const weekday = document.querySelector("[data-slot='calendar'] .rdp-weekday")!;
    expect(weekday.className).toContain("w-(--cell-size)");
    expect(weekday.className).toContain("shrink-0");
    const dayButton = document.querySelector("[data-slot='calendar'] button[data-day]")!;
    expect(dayButton.className).toContain("size-[calc(var(--cell-size)-6px)]");
    expect(dayButton.className).not.toContain("size-(--cell-size)");
    expect(dayButton.className).toContain("tabular-nums");
  });

  it("keeps range bands continuous with pill-sized buttons on band-colored cells", () => {
    render(<DatePicker mode="range" defaultMonth={JUNE_2026} selected={{from: new Date(2026, 5, 10), to: new Date(2026, 5, 20)}} />);
    const startButton = document.querySelector('button[data-range-start="true"]')!;
    expect(startButton.className).toContain("size-[calc(var(--cell-size)-6px)]");
    const startCell = startButton.closest("td")!;
    expect(startCell.className).toContain("bg-rixl-primary");
    const middleCell = document.querySelector('button[data-range-middle="true"]')!.closest("td")!;
    expect(middleCell.className).toContain("bg-rixl-surface-muted");
  });

  it("does not extend a range past its max length", () => {
    const onChange = vi.fn();
    render(
      <DatePicker
        mode="range"
        defaultMonth={JUNE_2026}
        max={3}
        selected={{from: new Date(2026, 5, 10), to: undefined}}
        onChange={onChange}
      />
    );
    act(() => dayButton(new Date(2026, 5, 20)).click());
    const range = (onChange.mock.calls[0] as (DateRange | undefined)[])[0];
    expect(range?.from?.getTime()).not.toBe(new Date(2026, 5, 10).getTime());
  });

  it("forwards react-day-picker props it has no wrapper for", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} weekStartsOn={1} />);
    expect(document.querySelector("[data-slot='calendar'] .rdp-weekday")).toHaveTextContent(/^Mo/);
  });

  it("rejects the removed value and onSelect props and an omitted mode", () => {
    // @ts-expect-error -- value was removed in favour of selected
    const withValue = <DatePicker mode="single" value={new Date(2026, 5, 15)} />;
    // @ts-expect-error -- onSelect was removed in favour of onChange
    const withOnSelect = <DatePicker mode="single" onSelect={() => undefined} />;
    // @ts-expect-error -- mode is required, as in Kumo
    const withoutMode = <DatePicker />;
    expect([withValue, withOnSelect, withoutMode]).toHaveLength(3);
  });
});
