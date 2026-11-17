import {describe, it, expect, vi} from "vitest";
import {render} from "@testing-library/react";
import type {PropsBase} from "react-day-picker";

const {seenLocales} = vi.hoisted(() => ({seenLocales: [] as unknown[]}));

vi.mock("../calendar", () => ({
  Calendar: ({locale}: {locale?: unknown}) => {
    seenLocales.push(locale);
    return <div data-slot="calendar" />;
  },
}));

const {DatePicker} = await import("../date-picker");

const JUNE_2026 = new Date(2026, 5, 1);

// date-fns is transitive-only here, so a stand-in asserts forwarding by
// identity; the compiler can't know the real Locale shape.
const STAND_IN_LOCALE = {code: "stand-in"} as unknown as PropsBase["locale"];

describe("DatePicker locale", () => {
  it("forwards locale to the Calendar", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} locale={STAND_IN_LOCALE} />);
    expect(seenLocales).toContain(STAND_IN_LOCALE);
  });

  it("leaves locale unset by default", () => {
    render(<DatePicker mode="single" defaultMonth={JUNE_2026} />);
    expect(seenLocales[seenLocales.length - 1]).toBeUndefined();
  });
});
