import {describe, it, expect, vi} from "vitest";
import {useState} from "react";
import {act, render, screen} from "@testing-library/react";
import type {DateRange} from "react-day-picker";
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

function SingleHarness({onSelect}: {onSelect?: (date: Date | undefined) => void}) {
  const [value, setValue] = useState<Date | undefined>();
  return (
    <DatePicker
      mode="single"
      defaultMonth={JUNE_2026}
      value={value}
      onSelect={(date) => {
        setValue(date);
        onSelect?.(date);
      }}
    />
  );
}

function RangeHarness({onSelect}: {onSelect?: (range: DateRange | undefined) => void}) {
  const [value, setValue] = useState<DateRange | undefined>();
  return (
    <DatePicker
      mode="range"
      defaultMonth={JUNE_2026}
      value={value}
      onSelect={(range) => {
        setValue(range);
        onSelect?.(range);
      }}
    />
  );
}

function MultipleHarness({onSelect}: {onSelect?: (dates: Date[] | undefined) => void}) {
  const [value, setValue] = useState<Date[] | undefined>();
  return (
    <DatePicker
      mode="multiple"
      defaultMonth={JUNE_2026}
      value={value}
      onSelect={(dates) => {
        setValue(dates);
        onSelect?.(dates);
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

  it("selects a single date and notifies onSelect", () => {
    const onSelect = vi.fn();
    render(<SingleHarness onSelect={onSelect} />);
    act(() => dayButton(new Date(2026, 5, 15)).click());
    expect(onSelect).toHaveBeenCalledOnce();
    expect((onSelect.mock.calls[0] as Date[])[0]?.getTime()).toBe(new Date(2026, 5, 15).getTime());
    expect(dayButton(new Date(2026, 5, 15))).toHaveAttribute("data-selected-single", "true");
  });

  it("accepts the selected alias for the initial value", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} selected={new Date(2026, 5, 15)} />);
    expect(dayButton(new Date(2026, 5, 15))).toHaveAttribute("data-selected-single", "true");
  });

  it("prefers value over selected when both are set", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} value={new Date(2026, 5, 15)} selected={new Date(2026, 5, 20)} />);
    expect(dayButton(new Date(2026, 5, 15))).toHaveAttribute("data-selected-single", "true");
    expect(dayButton(new Date(2026, 5, 20))).not.toHaveAttribute("data-selected-single");
  });

  it("notifies the onChange alias when a date is picked", () => {
    const onChange = vi.fn();
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} onChange={onChange} />);
    act(() => dayButton(new Date(2026, 5, 15)).click());
    expect(onChange).toHaveBeenCalledOnce();
    expect((onChange.mock.calls[0] as Date[])[0]?.getTime()).toBe(new Date(2026, 5, 15).getTime());
  });

  it("completes a range on two distinct days and marks both ends", () => {
    const onSelect = vi.fn();
    render(<RangeHarness onSelect={onSelect} />);
    act(() => dayButton(new Date(2026, 5, 10)).click());
    act(() => dayButton(new Date(2026, 5, 20)).click());
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(dayButton(new Date(2026, 5, 10))).toHaveAttribute("data-range-start", "true");
    expect(dayButton(new Date(2026, 5, 20))).toHaveAttribute("data-range-end", "true");
  });

  it("notifies the onChange alias on each range click", () => {
    const onChange = vi.fn();
    render(<DatePicker mode="range" defaultMonth={JUNE_2026} onChange={onChange} />);
    act(() => dayButton(new Date(2026, 5, 10)).click());
    act(() => dayButton(new Date(2026, 5, 20)).click());
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("selects multiple dates", () => {
    const onSelect = vi.fn();
    render(<MultipleHarness onSelect={onSelect} />);
    act(() => dayButton(new Date(2026, 5, 10)).click());
    act(() => dayButton(new Date(2026, 5, 11)).click());
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it("enforces max selected days in multiple mode", () => {
    const onSelect = vi.fn();
    render(<DatePicker mode="multiple" defaultMonth={JUNE_2026} max={1} onSelect={onSelect} />);
    act(() => dayButton(new Date(2026, 5, 10)).click());
    act(() => dayButton(new Date(2026, 5, 11)).click());
    const last = onSelect.mock.calls[onSelect.mock.calls.length - 1] as Date[][];
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

  it("names day buttons with the visible day number first for Label in Name", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    expect(dayButton(new Date(2026, 5, 15)).getAttribute("aria-label")).toMatch(/^15, /);
  });

  it("shows outside days by default for a single month", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    expect(document.querySelector("[data-slot='calendar'] td[data-outside='true']:not([data-hidden='true'])")).toBeInTheDocument();
  });

  it("hides outside days by default when showing multiple months", () => {
    render(<DatePicker mode="range" defaultMonth={JUNE_2026} numberOfMonths={2} />);
    const outside = document.querySelectorAll("[data-slot='calendar'] td[data-outside='true']");
    expect(outside.length).toBeGreaterThan(0);
    expect(document.querySelector("[data-slot='calendar'] td[data-outside='true']:not([data-hidden='true'])")).not.toBeInTheDocument();
  });

  it("shows outside days across months when showOutsideDays is set", () => {
    render(<DatePicker mode="range" defaultMonth={JUNE_2026} numberOfMonths={2} showOutsideDays />);
    expect(document.querySelector("[data-slot='calendar'] td[data-outside='true']:not([data-hidden='true'])")).toBeInTheDocument();
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
    expect(grids[1].className).toContain("bg-rixl-bg");
  });

  it("groups the month navigation at the inline end instead of splitting it across both edges", () => {
    render(<SingleHarness />);
    const nav = document.querySelector("[data-slot='calendar'] .rdp-nav")!;
    expect(nav.className).toContain("end-0");
    expect(nav.className).not.toContain("justify-between");
    expect(nav.className).not.toContain("inset-x-0");
  });

  it("left-aligns the month caption with end clearing for the grouped nav", () => {
    render(<SingleHarness />);
    const caption = document.querySelector("[data-slot='calendar'] .rdp-month_caption")!;
    expect(caption.className).toContain("justify-start");
    expect(caption.className).not.toContain("justify-center");
    expect(caption.className).toContain("pe-[calc(var(--cell-size)*2+0.5rem)]");
  });

  it("left-aligns the dropdown caption with end clearing for the grouped nav", () => {
    render(
      <DatePicker
        mode="single"
        defaultMonth={JUNE_2026}
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
      />
    );
    const dropdowns = document.querySelector("[data-slot='calendar'] .rdp-dropdowns")!;
    expect(dropdowns.className).toContain("justify-start");
    expect(dropdowns.className).not.toContain("justify-center");
  });

  it("keeps the chevron mirroring rules for RTL after the nav regroup", () => {
    render(<SingleHarness />);
    const grid = document.querySelector("[data-slot='calendar']")!;
    expect(grid.className).toContain("rtl:**:[.rdp-button\\_next>svg]:rotate-180");
    expect(grid.className).toContain("rtl:**:[.rdp-button\\_previous>svg]:rotate-180");
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
    expect(dayButton.className).toContain("size-(--cell-size)");
    expect(dayButton.className).toContain("tabular-nums");
  });
});
