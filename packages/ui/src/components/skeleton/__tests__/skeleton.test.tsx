import {createRef} from "react";
import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Skeleton, skeletonVariants} from "../skeleton";

describe("Skeleton", () => {
  it("renders a <div>", () => {
    render(<Skeleton data-testid="s" />);
    expect(screen.getByTestId("s").tagName).toBe("DIV");
  });

  it("sets data-slot='skeleton'", () => {
    render(<Skeleton data-testid="s" />);
    expect(screen.getByTestId("s")).toHaveAttribute("data-slot", "skeleton");
  });

  it("applies base classes and shimmers by default", () => {
    render(<Skeleton data-testid="s" />);
    const cls = screen.getByTestId("s").className;
    expect(cls).toContain("bg-rixl-surface-muted");
    expect(cls).toContain("animate-rixl-shimmer");
    expect(cls).toContain("rounded-rixl-md");
  });

  it("forwards additional className without dropping base classes", () => {
    render(<Skeleton data-testid="s" className="h-4 w-32" />);
    const cls = screen.getByTestId("s").className;
    expect(cls).toContain("h-4");
    expect(cls).toContain("w-32");
    expect(cls).toContain("animate-rixl-shimmer");
  });

  it("last-write-wins on conflicting Tailwind utilities via cn", () => {
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

  it("is aria-hidden by default (decorative)", () => {
    render(<Skeleton data-testid="s" />);
    expect(screen.getByTestId("s")).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards the ref to the div", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton data-testid="s" ref={ref} />);
    expect(ref.current).toBe(screen.getByTestId("s"));
  });

  describe("animation", () => {
    it("defaults to shimmer", () => {
      render(<Skeleton data-testid="s" />);
      expect(screen.getByTestId("s").className).toContain("animate-rixl-shimmer");
    });

    it("pulse applies the opacity pulse and freezes under reduced motion", () => {
      render(<Skeleton data-testid="s" animation="pulse" />);
      const cls = screen.getByTestId("s").className;
      expect(cls).toContain("animate-pulse");
      expect(cls).toContain("motion-reduce:animate-none");
    });

    it("shimmer applies the sweep and falls back to a flat fill under reduced motion", () => {
      render(<Skeleton data-testid="s" animation="shimmer" />);
      const cls = screen.getByTestId("s").className;
      expect(cls).toContain("animate-rixl-shimmer");
      expect(cls).toContain("bg-[length:200%_100%]");
      expect(cls).toContain("motion-reduce:animate-none");
      expect(cls).toContain("motion-reduce:bg-none");
    });

    it("none renders a static muted fill with no animation utility", () => {
      render(<Skeleton data-testid="s" animation="none" />);
      const cls = screen.getByTestId("s").className;
      expect(cls).toContain("bg-rixl-surface-muted");
      expect(cls).not.toContain("animate-pulse");
      expect(cls).not.toContain("animate-rixl-shimmer");
    });
  });

  describe("skeletonVariants", () => {
    it("is exported and produces the shimmer animation class", () => {
      expect(skeletonVariants({animation: "shimmer"})).toContain("animate-rixl-shimmer");
    });
  });
});
