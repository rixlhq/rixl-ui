import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter} from "../card";

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
    expect(cls).toContain("rounded-rixl-xl");
    expect(cls).toContain("shadow-rixl-sm");
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
});
