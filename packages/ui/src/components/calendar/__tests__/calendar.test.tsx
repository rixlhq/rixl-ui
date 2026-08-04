import {describe, it, expect} from "vitest";
import {act, render} from "@testing-library/react";
import {Calendar} from "../calendar";

describe("Calendar", () => {
  it("renders the calendar root with data-slot='calendar'", () => {
    render(<Calendar mode="single" />);
    expect(document.querySelector("[data-slot='calendar']")).toHaveAttribute("data-slot", "calendar");
  });

  it("renders day buttons with a data-day attribute", () => {
    render(<Calendar mode="single" />);
    expect(document.querySelectorAll("button[data-day]").length).toBeGreaterThan(0);
  });

  it("marks a clicked day as selected", () => {
    render(<Calendar mode="single" />);
    const day = document.querySelector<HTMLButtonElement>("button[data-day]")!;
    act(() => day.click());
    expect(day).toHaveAttribute("data-selected-single", "true");
  });
});
