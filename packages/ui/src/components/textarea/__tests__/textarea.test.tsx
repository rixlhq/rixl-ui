import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Textarea} from "../textarea";

describe("Textarea", () => {
  it("renders a native <textarea>", () => {
    render(<Textarea placeholder="Message" />);
    const el = screen.getByPlaceholderText("Message");
    expect(el.tagName).toBe("TEXTAREA");
  });

  it("sets data-slot='textarea'", () => {
    render(<Textarea placeholder="Message" />);
    expect(screen.getByPlaceholderText("Message")).toHaveAttribute("data-slot", "textarea");
  });

  it("applies base classes by default", () => {
    render(<Textarea placeholder="Message" />);
    const cls = screen.getByPlaceholderText("Message").className;
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("rounded-rixl-md");
    expect(cls).toContain("shadow-rixl-xs");
    expect(cls).toContain("placeholder:text-rixl-fg-muted");
    expect(cls).toContain("field-sizing-content");
  });

  it("applies focus-visible classes", () => {
    render(<Textarea placeholder="Message" />);
    const cls = screen.getByPlaceholderText("Message").className;
    expect(cls).toContain("focus-visible:border-rixl-ring");
    expect(cls).toContain("focus-visible:ring-rixl-ring/50");
  });

  it("applies aria-invalid classes", () => {
    render(<Textarea aria-invalid placeholder="Message" />);
    const cls = screen.getByPlaceholderText("Message").className;
    expect(cls).toContain("aria-invalid:border-rixl-danger");
    expect(cls).toContain("aria-invalid:ring-rixl-danger/20");
  });

  it("applies hover and read-only state classes", () => {
    render(<Textarea placeholder="Message" readOnly />);
    const cls = screen.getByPlaceholderText("Message").className;
    expect(cls).toContain("hover:border-rixl-border-strong");
    expect(cls).toContain("read-only:bg-rixl-surface-muted");
  });

  it("forwards additional className without dropping base classes", () => {
    render(<Textarea placeholder="Message" className="min-h-32" />);
    const cls = screen.getByPlaceholderText("Message").className;
    expect(cls).toContain("min-h-32");
    expect(cls).toContain("border-rixl-border");
  });

  it("passes native attributes through", () => {
    render(<Textarea placeholder="Message" id="m" name="message" rows={6} maxLength={280} required />);
    const el = screen.getByPlaceholderText("Message");
    expect(el).toHaveAttribute("id", "m");
    expect(el).toHaveAttribute("name", "message");
    expect(el).toHaveAttribute("rows", "6");
    expect(el).toHaveAttribute("maxlength", "280");
    expect(el).toBeRequired();
  });

  it("respects the disabled attribute", () => {
    render(<Textarea placeholder="Message" disabled />);
    expect(screen.getByPlaceholderText("Message")).toBeDisabled();
  });

  it("passes defaultValue through", () => {
    render(<Textarea defaultValue="Hello world" data-testid="t" />);
    expect(screen.getByTestId("t")).toHaveValue("Hello world");
  });
});
