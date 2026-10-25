import {describe, it, expect, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {Switch} from "../switch";

describe("Switch", () => {
  it("renders with role='switch'", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("sets data-slot='switch' on the root", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toHaveAttribute("data-slot", "switch");
  });

  it("applies base classes to the root", () => {
    render(<Switch />);
    const cls = screen.getByRole("switch").className;
    expect(cls).toContain("rounded-full");
    expect(cls).toContain("shadow-rixl-xs");
    expect(cls).toContain("h-[1.15rem]");
    expect(cls).toContain("w-8");
  });

  it("applies data-state variant classes", () => {
    render(<Switch />);
    const cls = screen.getByRole("switch").className;
    expect(cls).toContain("data-checked:bg-rixl-primary");
    expect(cls).toContain("data-unchecked:bg-rixl-border");
  });

  it("applies focus-visible classes", () => {
    render(<Switch />);
    const cls = screen.getByRole("switch").className;
    expect(cls).toContain("focus-visible:border-rixl-ring");
    expect(cls).toContain("focus-visible:ring-rixl-ring/50");
  });

  it("applies hover affordances for both states", () => {
    render(<Switch />);
    const cls = screen.getByRole("switch").className;
    expect(cls).toContain("data-checked:enabled:hover:bg-rixl-primary-hover");
    expect(cls).toContain("data-unchecked:enabled:hover:bg-rixl-border-strong");
  });

  it("renders the thumb with data-slot='switch-thumb'", () => {
    const {container} = render(<Switch />);
    const thumb = container.querySelector("[data-slot='switch-thumb']");
    expect(thumb).not.toBeNull();
    expect(thumb!.className).toContain("bg-rixl-surface");
    expect(thumb!.className).toContain("rounded-full");
  });

  it("forwards additional className without dropping base classes", () => {
    render(<Switch className="ms-2" />);
    const cls = screen.getByRole("switch").className;
    expect(cls).toContain("ms-2");
    expect(cls).toContain("rounded-full");
  });

  it("respects an explicit defaultChecked", () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("respects the disabled prop", () => {
    render(<Switch disabled />);
    const el = screen.getByRole("switch");
    expect(el).toHaveAttribute("aria-disabled", "true");
    expect(el).toHaveAttribute("data-disabled");
  });

  it("toggles on click and fires onCheckedChange", () => {
    const onCheckedChange = vi.fn();
    render(<Switch onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });
});
