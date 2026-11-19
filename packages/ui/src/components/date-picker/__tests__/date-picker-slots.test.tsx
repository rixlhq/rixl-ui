import {describe, it, expect} from "vitest";
import {render} from "@testing-library/react";
import {DatePicker} from "../date-picker";

const JUNE_2026 = new Date(2026, 5, 1);

describe("DatePicker slots", () => {
  it("marks each day button for slot targeting", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    const dayButtons = document.querySelectorAll("[data-slot='calendar'] button[data-day]");
    expect(dayButtons.length).toBeGreaterThan(0);
    for (const button of dayButtons) expect(button).toHaveAttribute("data-slot", "calendar-day-button");
  });

  it("marks each week number cell for slot targeting", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} showWeekNumber />);
    const cells = document.querySelectorAll("[data-slot='calendar'] td.rdp-week_number");
    expect(cells.length).toBeGreaterThan(0);
    for (const cell of cells) expect(cell).toHaveAttribute("data-slot", "calendar-week-number");
  });

  it("marks the navigation chevrons for slot targeting", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    for (const nav of [".rdp-button_previous", ".rdp-button_next"]) {
      expect(document.querySelector(`[data-slot='calendar'] ${nav} svg`)).toHaveAttribute("data-slot", "calendar-chevron");
    }
  });
});
