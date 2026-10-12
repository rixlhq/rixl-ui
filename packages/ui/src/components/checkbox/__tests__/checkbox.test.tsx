import {describe, it, expect, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {Checkbox} from "../checkbox";

describe("Checkbox", () => {
  it("renders with role='checkbox'", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("sets data-slot='checkbox' on the root", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-slot", "checkbox");
  });

  it("applies base classes by default", () => {
    render(<Checkbox />);
    const cls = screen.getByRole("checkbox").className;
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("shadow-rixl-xs");
    expect(cls).toContain("size-4");
    expect(cls).toContain("rounded-[4px]");
  });

  it("applies data-checked variant classes", () => {
    render(<Checkbox />);
    const cls = screen.getByRole("checkbox").className;
    expect(cls).toContain("data-checked:bg-rixl-primary");
    expect(cls).toContain("data-checked:text-rixl-primary-fg");
    expect(cls).toContain("data-checked:border-rixl-primary");
  });

  it("applies focus-visible classes", () => {
    render(<Checkbox />);
    const cls = screen.getByRole("checkbox").className;
    expect(cls).toContain("focus-visible:border-rixl-ring");
    expect(cls).toContain("focus-visible:ring-rixl-ring/50");
  });

  it("applies aria-invalid classes", () => {
    render(<Checkbox aria-invalid />);
    const cls = screen.getByRole("checkbox").className;
    expect(cls).toContain("aria-invalid:border-rixl-danger");
    expect(cls).toContain("aria-invalid:ring-rixl-danger/20");
  });

  it("forwards additional className without dropping base classes", () => {
    render(<Checkbox className="ml-2" />);
    const cls = screen.getByRole("checkbox").className;
    expect(cls).toContain("ml-2");
    expect(cls).toContain("size-4");
  });

  it("respects the disabled prop (Base UI renders <span> with aria-disabled)", () => {
    render(<Checkbox disabled />);
    const el = screen.getByRole("checkbox");
    expect(el).toHaveAttribute("aria-disabled", "true");
    expect(el).toHaveAttribute("data-disabled");
  });

  it("respects an explicit defaultChecked", () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("toggles on click", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("applies hover affordances (unchecked strengthens, checked deepens)", () => {
    render(<Checkbox />);
    const cls = screen.getByRole("checkbox").className;
    expect(cls).toContain("data-unchecked:enabled:hover:border-rixl-border-strong");
    expect(cls).toContain("data-checked:enabled:hover:bg-rixl-primary-hover");
  });

  it("fills the box for the indeterminate state", () => {
    render(<Checkbox />);
    const cls = screen.getByRole("checkbox").className;
    expect(cls).toContain("data-indeterminate:bg-rixl-primary");
    expect(cls).toContain("data-indeterminate:border-rixl-primary");
  });

  it("renders both check and dash icons, dash gated on indeterminate", () => {
    render(<Checkbox indeterminate />);
    const icons = document.querySelectorAll("[data-slot='checkbox-icon']");
    expect(icons.length).toBe(2);
    const dash = icons[1]!;
    expect(dash.getAttribute("class")).toContain("[[data-indeterminate]_&]:block");
    expect(dash.getAttribute("class")).toContain("hidden");
  });

  it("animates the indicator in, reduced-motion safe", () => {
    render(<Checkbox defaultChecked />);
    const indicator = document.querySelector("[data-slot='checkbox-indicator']");
    expect(indicator!.className).toContain("animate-in");
    expect(indicator!.className).toContain("zoom-in-50");
    expect(indicator!.className).toContain("motion-reduce:animate-none");
  });
});
