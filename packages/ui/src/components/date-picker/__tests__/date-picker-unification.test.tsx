import {describe, it, expect, vi} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {DatePicker} from "../date-picker";
import {Calendar as CalendarAlias} from "../../calendar/calendar";

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

describe("DatePicker unification", () => {
  it("exposes the bare calendar grid as DatePickerCalendar from the date-picker entry", async () => {
    const entry = (await import("../index")) as Record<string, unknown>;
    expect("DatePickerCalendar" in entry).toBe(true);
  });

  it("keeps ./calendar working as the same grid (deprecated alias, no fork)", async () => {
    const entry = (await import("../index")) as Record<string, unknown>;
    expect(CalendarAlias).toBe(entry.DatePickerCalendar);
  });

  it("renders the bare setup without a popover trigger", () => {
    render(<DatePicker mode="single" setup="bare" defaultMonth={JUNE_2026} />);
    expect(document.querySelector("[data-slot='calendar']")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='popover-trigger']")).not.toBeInTheDocument();
    expect(document.querySelector("[data-slot='popover-content']")).not.toBeInTheDocument();
  });

  it("selects a single date in the bare setup and notifies", () => {
    const onSelect = vi.fn();
    const onApply = vi.fn();
    render(<DatePicker mode="single" setup="bare" defaultMonth={JUNE_2026} onSelect={onSelect} onApply={onApply} />);
    act(() => dayButton(new Date(2026, 5, 15)).click());
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onApply).toHaveBeenCalledOnce();
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("honours min/max and dropdown captions in the bare setup", () => {
    render(
      <DatePicker
        mode="range"
        setup="bare"
        defaultMonth={JUNE_2026}
        min={3}
        max={7}
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
      />
    );
    expect(document.querySelectorAll("[data-slot='calendar'] select")).toHaveLength(2);
  });
});
