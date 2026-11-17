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

  it("opens the panel on trigger click", async () => {
    render(<SingleHarness />);

    const trigger = page.getByRole("button", {name: "Pick a date"});
    await expect.element(trigger).toBeVisible();
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(trigger);
    await expect.element(page.getByRole("dialog")).toBeVisible();
    await expect.element(page.getByRole("grid")).toBeVisible();
  });

  it("has no WCAG 2.2 AA violations when open in single mode", async () => {
    render(<SingleHarness />);
    await userEvent.click(page.getByRole("button", {name: "Pick a date"}));
    await expect.element(page.getByRole("dialog")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("has no WCAG 2.2 AA violations when open in range mode", async () => {
    render(<RangeHarness />);
    await userEvent.click(page.getByRole("button", {name: "Pick a date range"}));
    await expect.element(page.getByRole("dialog")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("selects a single date, closes, and shows it in the trigger", async () => {
    render(<SingleHarness />);
    const trigger = page.getByRole("button", {name: "Pick a date"});
    await userEvent.click(trigger);
    await expect.element(page.getByRole("dialog")).toBeVisible();

    await userEvent.click(page.getByRole("button", {name: /June 15th, 2026/}));
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
    await expect.element(page.getByRole("button", {name: /2026/})).toHaveTextContent("2026");
  });

  it("completes a range on two distinct days and shows it in the trigger", async () => {
    render(<RangeHarness />);
    const trigger = page.getByRole("button", {name: "Pick a date range"});
    await userEvent.click(trigger);
    await expect.element(page.getByRole("dialog")).toBeVisible();

    await userEvent.click(page.getByRole("button", {name: /June 10th, 2026/}));
    await expect.element(page.getByRole("dialog")).toBeVisible();

    await userEvent.click(page.getByRole("button", {name: /June 20th, 2026/}));
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
    await expect.element(page.getByRole("button", {name: /2026/})).toHaveTextContent("2026");
  });
});
