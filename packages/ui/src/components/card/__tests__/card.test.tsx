import {createRef} from "react";
import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter, cardVariants} from "../card";

function Basic() {
  return (
    <Card data-testid="card">
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
        <CardAction>Action</CardAction>
      </CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
}

describe("Card", () => {
  it("sets data-slot markers on all parts", () => {
    render(<Basic />);
    expect(screen.getByTestId("card")).toHaveAttribute("data-slot", "card");
    expect(document.querySelector("[data-slot='card-header']")).toHaveAttribute("data-slot", "card-header");
    expect(document.querySelector("[data-slot='card-title']")).toHaveAttribute("data-slot", "card-title");
    expect(document.querySelector("[data-slot='card-description']")).toHaveAttribute("data-slot", "card-description");
    expect(document.querySelector("[data-slot='card-action']")).toHaveAttribute("data-slot", "card-action");
    expect(document.querySelector("[data-slot='card-content']")).toHaveAttribute("data-slot", "card-content");
    expect(document.querySelector("[data-slot='card-footer']")).toHaveAttribute("data-slot", "card-footer");
  });

  it("applies rixl token base classes to the container", () => {
    render(<Basic />);
    const cls = screen.getByTestId("card").className;
    expect(cls).toContain("bg-rixl-surface");
    expect(cls).toContain("text-rixl-fg");
    expect(cls).toContain("rounded-xl");
    expect(cls).toContain("shadow-sm");
  });

  it("renders children", () => {
    render(<Basic />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("forwards an additional className on the container", () => {
    render(
      <Card data-testid="card" className="max-w-md">
        <CardContent>Body</CardContent>
      </Card>
    );
    const cls = screen.getByTestId("card").className;
    expect(cls).toContain("max-w-md");
    expect(cls).toContain("bg-rixl-surface");
  });

  it("forwards the ref to the container div", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Card ref={ref} data-testid="card">
        <CardContent>Body</CardContent>
      </Card>
    );
    expect(ref.current).toBe(screen.getByTestId("card"));
    expect(ref.current?.tagName).toBe("DIV");
  });

  describe("variants", () => {
    it("defaults to the elevated (shadowed) variant", () => {
      render(<Card data-testid="card" />);
      const cls = screen.getByTestId("card").className;
      expect(cls).toContain("shadow-sm");
      expect(cls).toContain("border-rixl-border");
    });

    it("outline drops the shadow", () => {
      render(<Card data-testid="card" variant="outline" />);
      const cls = screen.getByTestId("card").className;
      expect(cls).toContain("shadow-none");
    });

    it("ghost has a transparent border and no shadow", () => {
      render(<Card data-testid="card" variant="ghost" />);
      const cls = screen.getByTestId("card").className;
      expect(cls).toContain("border-transparent");
      expect(cls).toContain("shadow-none");
    });
  });

  it("has no click affordance by default", () => {
    render(<Card data-testid="card" />);
    expect(screen.getByTestId("card").className).not.toMatch(/cursor-pointer|active:scale|hover:shadow|focus-visible:ring/);
  });

  describe("selected", () => {
    it("applies the ring highlight and data-selected marker", () => {
      render(<Card data-testid="card" selected />);
      const el = screen.getByTestId("card");
      expect(el.className).toContain("border-rixl-ring");
      expect(el.className).toContain("ring-[3px]");
      expect(el).toHaveAttribute("data-selected", "true");
    });

    it("omits data-selected when not selected", () => {
      render(<Card data-testid="card" />);
      expect(screen.getByTestId("card")).not.toHaveAttribute("data-selected");
    });
  });

  describe("cardVariants", () => {
    it("is exported and produces variant classes", () => {
      expect(cardVariants({variant: "outline"})).toContain("shadow-none");
    });

    it("has no interactive variant", () => {
      // @ts-expect-error `interactive` was removed from the variants; the compiler must reject it.
      expect(cardVariants({interactive: true})).not.toContain("cursor-pointer");
    });
  });
});
