import {describe, it, expect} from "vitest";
import {render} from "@testing-library/react";
import {DatePicker} from "../date-picker";

const JUNE_2026 = new Date(2026, 5, 1);
const HOSTS = ["popover-content", "card-content", "dialog-content"];

function calendarRoot(): HTMLElement {
  return document.querySelector<HTMLElement>("[data-slot='calendar']")!;
}

describe("DatePicker surface", () => {
  it("draws the surface tokens standalone", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    const classes = calendarRoot().className.split(" ");
    expect(classes).toEqual(
      expect.arrayContaining(["bg-rixl-surface", "border", "border-rixl-border", "rounded-rixl-md", "shadow-rixl-xs", "p-3"])
    );
  });

  it("does not paint the page background, which is the surface's shade", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    expect(calendarRoot().className.split(" ")).not.toContain("bg-rixl-bg");
  });

  it.each(HOSTS)("resets border, background, shadow, radius and padding inside %s", (host) => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    const className = calendarRoot().className;
    for (const reset of ["border-0", "bg-transparent", "shadow-none", "rounded-none", "p-0"]) {
      expect(className).toMatch(new RegExp(`\\[:is\\(.*\\[data-slot=${host}\\].*\\)_&\\]:${reset}(\\s|$)`));
    }
  });

  it("lets a consumer className override the standalone surface", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} className="border-0 p-6" />);
    const classes = calendarRoot().className.split(" ");
    expect(classes).toContain("border-0");
    expect(classes).toContain("p-6");
    expect(classes).not.toContain("border");
    expect(classes).not.toContain("p-3");
  });
});
