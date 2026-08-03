import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Separator} from "../separator";

describe("Separator", () => {
  it("renders with role='separator'", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("defaults to horizontal orientation", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", "horizontal");
  });

  it("respects an explicit vertical orientation", () => {
    render(<Separator orientation="vertical" />);
    expect(screen.getByRole("separator", {hidden: true})).toHaveAttribute("data-orientation", "vertical");
  });

  it("sets data-slot='separator' for slot targeting", () => {
    render(<Separator />);
    expect(screen.getByRole("separator")).toHaveAttribute("data-slot", "separator");
  });

  it("applies base classes by default", () => {
    render(<Separator />);
    const el = screen.getByRole("separator");
    expect(el.className).toContain("bg-rixl-border");
    expect(el.className).toContain("shrink-0");
  });

  it("forwards additional className without dropping base classes", () => {
    render(<Separator className="my-8" />);
    const el = screen.getByRole("separator");
    expect(el.className).toContain("my-8");
    expect(el.className).toContain("bg-rixl-border");
  });

  it("last-write-wins on conflicting Tailwind utilities via tailwind-merge", () => {
    render(<Separator className="bg-red-500" />);
    const cls = screen.getByRole("separator").className;
    expect(cls).toContain("bg-red-500");
    expect(cls).not.toContain("bg-rixl-border");
  });
});
