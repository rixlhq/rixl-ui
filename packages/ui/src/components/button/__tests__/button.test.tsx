import {describe, it, expect, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {Button, buttonVariants} from "../button";

describe("Button", () => {
  it("renders as a native <button>", () => {
    render(<Button>Save</Button>);
    const btn = screen.getByRole("button", {name: "Save"});
    expect(btn.tagName).toBe("BUTTON");
  });

  it("sets data-slot='button' for slot targeting", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
  });

  it("applies the default variant classes by default", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button").className).toContain("bg-rixl-primary");
  });

  it("respects an explicit variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button").className).toContain("bg-rixl-danger");
  });

  it("respects the sm size", () => {
    render(<Button size="sm">Save</Button>);
    expect(screen.getByRole("button").className).toContain("h-8");
  });

  it("respects the lg size", () => {
    render(<Button size="lg">Save</Button>);
    expect(screen.getByRole("button").className).toContain("h-10");
  });

  it("respects the icon size", () => {
    render(<Button size="icon" aria-label="Search" />);
    expect(screen.getByRole("button").className).toContain("size-9");
  });

  it("forwards additional className without dropping variant classes", () => {
    render(<Button className="w-full">Wide</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("w-full");
    expect(btn.className).toContain("bg-rixl-primary");
  });

  it("last-write-wins on conflicting Tailwind utilities via tailwind-merge", () => {
    render(
      <Button size="default" className="h-14">
        Tall
      </Button>
    );
    const cls = screen.getByRole("button").className;
    expect(cls).toContain("h-14");
    expect(cls).not.toContain("h-9");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>
    );
    screen.getByRole("button").click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as a non-button element via `render`", () => {
    render(
      <Button render={<a href="/somewhere" />} variant="link">
        Link
      </Button>
    );
    // Base UI keeps role="button" for a11y on the polymorphic element; the
    // underlying tag is what we care about here.
    const el = screen.getByText("Link");
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "/somewhere");
  });

  it("exports a buttonVariants helper that returns a class string", () => {
    expect(typeof buttonVariants({variant: "ghost", size: "lg"})).toBe("string");
  });
});
