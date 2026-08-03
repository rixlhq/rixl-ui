import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "../input-otp";

function Basic({defaultValue, maxLength = 6}: {defaultValue?: string; maxLength?: number} = {}) {
  return (
    <InputOTP maxLength={maxLength} defaultValue={defaultValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} data-testid="s0" />
        <InputOTPSlot index={1} data-testid="s1" />
        <InputOTPSlot index={2} data-testid="s2" />
      </InputOTPGroup>
      <InputOTPSeparator data-testid="sep" />
      <InputOTPGroup>
        <InputOTPSlot index={3} data-testid="s3" />
        <InputOTPSlot index={4} data-testid="s4" />
        <InputOTPSlot index={5} data-testid="s5" />
      </InputOTPGroup>
    </InputOTP>
  );
}

describe("InputOTP", () => {
  it("renders the hidden underlying <input>", () => {
    const {container} = render(<Basic />);
    expect(container.querySelector("[data-slot='input-otp']")).not.toBeNull();
    expect(container.querySelector("input")).not.toBeNull();
  });

  it("renders each slot with data-slot='input-otp-slot'", () => {
    render(<Basic />);
    for (const testId of ["s0", "s1", "s2", "s3", "s4", "s5"]) {
      expect(screen.getByTestId(testId)).toHaveAttribute("data-slot", "input-otp-slot");
    }
  });

  it("applies base classes to a slot", () => {
    render(<Basic />);
    const cls = screen.getByTestId("s0").className;
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("shadow-rixl-xs");
    expect(cls).toContain("h-9");
    expect(cls).toContain("w-9");
  });

  it("applies active-state classes to a slot", () => {
    render(<Basic />);
    const cls = screen.getByTestId("s0").className;
    expect(cls).toContain("data-[active=true]:border-rixl-ring");
    expect(cls).toContain("data-[active=true]:ring-rixl-ring/50");
  });

  it("applies aria-invalid classes to a slot", () => {
    render(<Basic />);
    const cls = screen.getByTestId("s0").className;
    expect(cls).toContain("aria-invalid:border-rixl-danger");
    expect(cls).toContain("data-[active=true]:aria-invalid:border-rixl-danger");
  });

  it("renders the group wrapper with data-slot='input-otp-group'", () => {
    const {container} = render(<Basic />);
    const groups = container.querySelectorAll("[data-slot='input-otp-group']");
    expect(groups).toHaveLength(2);
    for (const g of groups) {
      expect(g.className).toContain("flex");
      expect(g.className).toContain("items-center");
    }
  });

  it("renders the separator with data-slot + role='separator'", () => {
    render(<Basic />);
    const sep = screen.getByTestId("sep");
    expect(sep).toHaveAttribute("data-slot", "input-otp-separator");
    expect(sep).toHaveAttribute("role", "separator");
    expect(sep).toHaveAttribute("aria-hidden", "true");
    expect(sep.querySelector("svg")).not.toBeNull();
  });

  it("renders each slot's character from defaultValue", () => {
    render(<Basic defaultValue="123" />);
    expect(screen.getByTestId("s0").textContent).toBe("1");
    expect(screen.getByTestId("s1").textContent).toBe("2");
    expect(screen.getByTestId("s2").textContent).toBe("3");
  });

  it("forwards className on the slot without dropping base classes", () => {
    render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} data-testid="s0" className="h-12 w-12" />
          <InputOTPSlot index={1} data-testid="s1" />
        </InputOTPGroup>
      </InputOTP>
    );
    const cls = screen.getByTestId("s0").className;
    expect(cls).toContain("h-12");
    expect(cls).toContain("w-12");
    expect(cls).toContain("border-rixl-border");
  });
});
