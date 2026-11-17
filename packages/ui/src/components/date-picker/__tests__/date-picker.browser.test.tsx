import {describe, it, expect, afterEach} from "vitest";
import {useState} from "react";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import type {DateRange} from "react-day-picker";
import {axeViolations} from "../../../../test/a11y";
import {DatePicker} from "../date-picker";

const JUNE_2026 = new Date(2026, 5, 1);

function SingleHarness() {
  const [value, setValue] = useState<Date | undefined>();
  return <DatePicker mode="single" defaultMonth={JUNE_2026} value={value} onSelect={setValue} />;
}

function RangeHarness() {
  const [value, setValue] = useState<DateRange | undefined>();
  return <DatePicker mode="range" defaultMonth={JUNE_2026} value={value} onSelect={setValue} />;
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
});
