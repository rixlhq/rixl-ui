import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Skeleton} from "../skeleton";

describe("Skeleton", () => {
  it("renders a <div>", () => {
    render(<Skeleton data-testid="s" />);
    expect(screen.getByTestId("s").tagName).toBe("DIV");
  });

  it("sets data-slot='skeleton'", () => {
    render(<Skeleton data-testid="s" />);
    expect(screen.getByTestId("s")).toHaveAttribute("data-slot", "skeleton");
  });

  it("applies base classes by default", () => {
    render(<Skeleton data-testid="s" />);
    const cls = screen.getByTestId("s").className;
    expect(cls).toContain("bg-rixl-surface-muted");
    expect(cls).toContain("animate-pulse");
    expect(cls).toContain("rounded-rixl-md");
  });

  it("forwards additional className without dropping base classes", () => {
    render(<Skeleton data-testid="s" className="h-4 w-32" />);
    const cls = screen.getByTestId("s").className;
    expect(cls).toContain("h-4");
    expect(cls).toContain("w-32");
    expect(cls).toContain("animate-pulse");
  });

  it("last-write-wins on conflicting Tailwind utilities via tailwind-merge", () => {
    render(<Skeleton data-testid="s" className="bg-red-500" />);
    const cls = screen.getByTestId("s").className;
    expect(cls).toContain("bg-red-500");
    expect(cls).not.toContain("bg-rixl-surface-muted");
  });

  it("passes native attributes through", () => {
    render(<Skeleton data-testid="s" id="ph-1" role="status" aria-label="Loading" />);
    const el = screen.getByTestId("s");
    expect(el).toHaveAttribute("id", "ph-1");
    expect(el).toHaveAttribute("role", "status");
    expect(el).toHaveAttribute("aria-label", "Loading");
  });
});
