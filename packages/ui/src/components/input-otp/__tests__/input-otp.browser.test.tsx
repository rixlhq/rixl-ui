import {afterEach, describe, expect, it} from "vitest";
import {cleanup, render} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "../input-otp";

function Code({invalid}: {invalid?: boolean}) {
  return (
    <InputOTP maxLength={3} aria-label="Verification code" defaultValue="12">
      <InputOTPGroup>
        <InputOTPSlot index={0} aria-invalid={invalid} />
        <InputOTPSlot index={1} aria-invalid={invalid} />
        <InputOTPSlot index={2} aria-invalid={invalid} />
      </InputOTPGroup>
    </InputOTP>
  );
}

const slots = () => [...document.querySelectorAll<HTMLElement>("[data-slot='input-otp-slot']")].map((slot) => getComputedStyle(slot));

describe("InputOTP Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("draws one joined bar: a start border and rounded start on the first slot only", () => {
    render(<Code />);
    const [first, middle, last] = slots();
    expect([first.borderInlineStartWidth, middle.borderInlineStartWidth, last.borderInlineStartWidth]).toEqual(["1px", "0px", "0px"]);
    expect([first.borderStartStartRadius, middle.borderStartStartRadius, last.borderStartStartRadius]).not.toEqual(["0px", "0px", "0px"]);
    expect([middle.borderStartStartRadius, middle.borderStartEndRadius]).toEqual(["0px", "0px"]);
    expect(last.borderStartEndRadius).not.toBe("0px");
  });

  it("colours every border of an invalid slot with the danger token", () => {
    render(<Code invalid />);
    const [first, middle] = slots();
    expect(middle.borderTopColor).toBe(first.borderTopColor);
    expect(first.borderTopColor).not.toBe(getComputedStyle(document.body).color);
  });

  it("has no WCAG 2.2 AA violations", async () => {
    render(<Code />);
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
