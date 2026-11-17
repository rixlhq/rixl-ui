import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {DatePicker} from "../date-picker";
import {Calendar as CalendarAlias} from "../../calendar/calendar";

const JUNE_2026 = new Date(2026, 5, 1);

describe("DatePicker unification", () => {
  it("exposes DatePickerCalendar as the same reference as DatePicker", async () => {
    const entry = await import("../index");
    expect(entry.DatePickerCalendar).toBe(DatePicker);
  });

  it("keeps ./calendar working as the same grid (deprecated alias, no fork)", async () => {
    const entry = await import("../index");
    expect(CalendarAlias).toBe(entry.DatePicker);
    expect(CalendarAlias).toBe(entry.DatePickerCalendar);
  });

  it("renders the grid with no popover chrome", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='popover-trigger']")).not.toBeInTheDocument();
    expect(document.querySelector("[data-slot='popover-content']")).not.toBeInTheDocument();
  });

  it("honours min/max and dropdown captions on the grid", () => {
    render(
      <DatePicker
        mode="range"
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
