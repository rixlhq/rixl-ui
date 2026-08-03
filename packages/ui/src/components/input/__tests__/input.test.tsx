import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Input} from "../input";

describe("Input", () => {
  it("renders a native <input>", () => {
    render(<Input placeholder="Email" />);
    const el = screen.getByPlaceholderText("Email");
    expect(el.tagName).toBe("INPUT");
  });

  it("sets data-slot='input'", () => {
    render(<Input placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("data-slot", "input");
  });

  it("forwards the `type` attribute", () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("type", "email");
  });

  it("applies base classes by default", () => {
    render(<Input placeholder="Email" />);
    const cls = screen.getByPlaceholderText("Email").className;
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("rounded-rixl-md");
    expect(cls).toContain("shadow-rixl-xs");
    expect(cls).toContain("placeholder:text-rixl-fg-muted");
  });

  it("applies focus-visible classes", () => {
    render(<Input placeholder="Email" />);
    const cls = screen.getByPlaceholderText("Email").className;
    expect(cls).toContain("focus-visible:border-rixl-ring");
    expect(cls).toContain("focus-visible:ring-rixl-ring/50");
  });

  it("applies aria-invalid classes", () => {
    render(<Input aria-invalid placeholder="Email" />);
    const cls = screen.getByPlaceholderText("Email").className;
    expect(cls).toContain("aria-invalid:border-rixl-danger");
    expect(cls).toContain("aria-invalid:ring-rixl-danger/20");
    expect(cls).toContain("aria-invalid:bg-rixl-danger/10");
  });

  it("forwards additional className without dropping base classes", () => {
    render(<Input placeholder="Email" className="w-64" />);
    const cls = screen.getByPlaceholderText("Email").className;
    expect(cls).toContain("w-64");
    expect(cls).toContain("border-rixl-border");
  });

  it("passes native attributes through", () => {
    render(<Input placeholder="Email" id="e" name="email" required maxLength={64} />);
    const el = screen.getByPlaceholderText("Email");
    expect(el).toHaveAttribute("id", "e");
    expect(el).toHaveAttribute("name", "email");
    expect(el).toBeRequired();
    expect(el).toHaveAttribute("maxlength", "64");
  });

  it("respects the disabled attribute", () => {
    render(<Input placeholder="Email" disabled />);
    expect(screen.getByPlaceholderText("Email")).toBeDisabled();
  });
});
