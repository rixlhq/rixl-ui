import {describe, it, expect, vi} from "vitest";
import {useState} from "react";
import {act, render, screen} from "@testing-library/react";
import type {DateRange} from "react-day-picker";
import {DatePicker} from "../date-picker";

import type {DatePickerSingleProps} from "../date-picker";

const JUNE_2026 = new Date(2026, 5, 1);

function formatDay(date: Date): string {
  return date.toLocaleDateString(undefined, {day: "numeric", month: "short", year: "numeric"});
}

/** An enabled in-month day button for the fixed June 2026 month. */
function dayButton(date: Date): HTMLButtonElement {
  const key = date.toLocaleDateString();
  const hit = Array.from(document.querySelectorAll<HTMLButtonElement>("button[data-day]")).find(
    (button) => button.dataset.day === key && !button.disabled
  );
  if (!hit) throw new Error(`no enabled day button for ${key}`);
  return hit;
}

function openPanel(trigger: HTMLElement) {
  act(() => trigger.click());
  return act(async () => {});
}

type SingleHarnessProps = Omit<DatePickerSingleProps, "mode" | "value" | "onSelect" | "onApply"> & {
  onSelect?: (date: Date | undefined) => void;
  onApply?: (date: Date | undefined) => void;
};

function SingleHarness({onSelect, onApply, ...rest}: SingleHarnessProps) {
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
      onApply={onApply}
      {...rest}
    />
  );
}

function RangeHarness({
  onSelect,
  onApply,
}: {
  onSelect?: (range: DateRange | undefined) => void;
  onApply?: (range: DateRange | undefined) => void;
}) {
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
      onApply={onApply}
    />
  );
}

describe("DatePicker", () => {
  it("renders an outline trigger with the single placeholder when empty", () => {
    render(<SingleHarness />);
    const trigger = screen.getByRole("button", {name: "Pick a date"});
    expect(trigger).toHaveAttribute("data-slot", "popover-trigger");
    expect(trigger.className).toContain("border-rixl-border");
  });

  it("renders the range placeholder when empty in range mode", () => {
    render(<RangeHarness />);
    expect(screen.getByRole("button", {name: "Pick a date range"})).toBeInTheDocument();
  });

  it("renders a custom placeholder", () => {
    render(<SingleHarness placeholder="Select birthday" />);
    expect(screen.getByRole("button", {name: "Select birthday"})).toBeInTheDocument();
  });

  it("renders a custom label slot instead of the formatted date", () => {
    render(<SingleHarness>Last 7 days</SingleHarness>);
    expect(screen.getByRole("button", {name: "Last 7 days"})).toBeInTheDocument();
    expect(screen.queryByRole("button", {name: "Pick a date"})).not.toBeInTheDocument();
  });

  it("shows the formatted single date when a value is set", () => {
    const value = new Date(2026, 5, 15);
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} value={value} />);
    expect(screen.getByRole("button", {name: formatDay(value)})).toBeInTheDocument();
  });

  it("shows the formatted range when both ends are set", () => {
    const value = {from: new Date(2026, 5, 10), to: new Date(2026, 5, 20)};
    render(<DatePicker mode="range" defaultMonth={JUNE_2026} value={value} />);
    expect(screen.getByRole("button", {name: `${formatDay(value.from)} – ${formatDay(value.to)}`})).toBeInTheDocument();
  });

  it("opens the calendar panel on trigger click", async () => {
    render(<SingleHarness />);
    await openPanel(screen.getByRole("button", {name: "Pick a date"}));
    expect(document.querySelector("[data-slot='popover-content']")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='calendar']")).toBeInTheDocument();
  });

  it("selects a single date, notifies, and closes the panel", async () => {
    const onSelect = vi.fn();
    const onApply = vi.fn();
    render(<SingleHarness onSelect={onSelect} onApply={onApply} />);
    await openPanel(screen.getByRole("button", {name: "Pick a date"}));

    act(() => dayButton(new Date(2026, 5, 15)).click());
    await act(async () => {});

    expect(onSelect).toHaveBeenCalledOnce();
    expect((onSelect.mock.calls[0] as Date[])[0]?.getTime()).toBe(new Date(2026, 5, 15).getTime());
    expect(onApply).toHaveBeenCalledOnce();
    expect(document.querySelector("[data-slot='popover-content']")).not.toBeInTheDocument();
    expect(screen.getByRole("button", {name: formatDay(new Date(2026, 5, 15))})).toBeInTheDocument();
  });

  it("keeps the range panel open until the range is complete", async () => {
    const onSelect = vi.fn();
    const onApply = vi.fn();
    render(<RangeHarness onSelect={onSelect} onApply={onApply} />);
    await openPanel(screen.getByRole("button", {name: "Pick a date range"}));

    act(() => dayButton(new Date(2026, 5, 10)).click());
    await act(async () => {});
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onApply).not.toHaveBeenCalled();
    expect(document.querySelector("[data-slot='popover-content']")).toBeInTheDocument();

    act(() => dayButton(new Date(2026, 5, 20)).click());
    await act(async () => {});
    expect(onApply).toHaveBeenCalledOnce();
    expect(document.querySelector("[data-slot='popover-content']")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {name: `${formatDay(new Date(2026, 5, 10))} – ${formatDay(new Date(2026, 5, 20))}`})
    ).toBeInTheDocument();
  });

  it("disables the days matching the disabled matcher", async () => {
    render(<SingleHarness />);
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} disabled={{before: new Date(2026, 5, 15)}} />);
    const triggers = screen.getAllByRole("button", {name: "Pick a date"});
    await openPanel(triggers[1]);
    expect(dayButton(new Date(2026, 5, 20))).not.toBeDisabled();
    const early = Array.from(document.querySelectorAll<HTMLButtonElement>("button[data-day]")).find(
      (button) => button.dataset.day === new Date(2026, 5, 10).toLocaleDateString()
    )!;
    expect(early).toBeDisabled();
  });

  it("names day buttons with the visible day number first for Label in Name", async () => {
    render(<DatePicker mode="single" defaultOpen defaultMonth={JUNE_2026} />);
    await act(async () => {});
    expect(dayButton(new Date(2026, 5, 15)).getAttribute("aria-label")).toMatch(/^15, /);
  });

  it("shows outside days by default for a single month", async () => {
    render(<DatePicker mode="single" defaultOpen defaultMonth={JUNE_2026} />);
    await act(async () => {});
    expect(document.querySelector("[data-slot='calendar'] td[data-outside='true']:not([data-hidden='true'])")).toBeInTheDocument();
  });

  it("hides outside days by default when showing multiple months", async () => {
    render(<DatePicker mode="range" defaultOpen defaultMonth={JUNE_2026} numberOfMonths={2} />);
    await act(async () => {});
    const outside = document.querySelectorAll("[data-slot='calendar'] td[data-outside='true']");
    expect(outside.length).toBeGreaterThan(0);
    expect(document.querySelector("[data-slot='calendar'] td[data-outside='true']:not([data-hidden='true'])")).not.toBeInTheDocument();
  });

  it("shows outside days across months when showOutsideDays is set", async () => {
    render(<DatePicker mode="range" defaultOpen defaultMonth={JUNE_2026} numberOfMonths={2} showOutsideDays />);
    await act(async () => {});
    expect(document.querySelector("[data-slot='calendar'] td[data-outside='true']:not([data-hidden='true'])")).toBeInTheDocument();
  });

  it("merges consumer trigger and content classes without dropping the base ones", async () => {
    render(<SingleHarness triggerClassName="w-44" contentClassName="max-h-80" />);
    const trigger = screen.getByRole("button", {name: "Pick a date"});
    expect(trigger.className).toContain("w-44");
    expect(trigger.className).toContain("border-rixl-border");

    await openPanel(trigger);
    const content = document.querySelector("[data-slot='popover-content']")!;
    expect(content.className).toContain("max-h-80");
    expect(content.className).toContain("bg-rixl-surface");
    expect(content.className).toContain("origin-(--transform-origin)");
    expect(content.className).toContain("duration-rixl-base");
  });
});
