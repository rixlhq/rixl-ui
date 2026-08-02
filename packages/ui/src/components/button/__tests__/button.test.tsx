import {describe, it, expect, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {Button, buttonVariants} from "../button";

describe("Button", () => {
  it("renders as a native <button> with default type='button'", () => {
    render(<Button>Save</Button>);
    const btn = screen.getByRole("button", {name: "Save"});
    expect(btn.tagName).toBe("BUTTON");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("applies primary variant classes by default", () => {
    render(<Button>Save</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-rixl-primary");
  });

  it("respects an explicit variant", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button").className).toContain("bg-rixl-danger");
  });

  it("respects size", () => {
    render(<Button size="sm">Save</Button>);
    expect(screen.getByRole("button").className).toContain("h-8");
  });

  it("forwards additional className without dropping variant classes", () => {
    render(<Button className="w-full">Wide</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("w-full");
    expect(btn.className).toContain("bg-rixl-primary");
  });

  it("last-write-wins on conflicting Tailwind utilities via tailwind-merge", () => {
    render(
      <Button size="md" className="h-14">
        Tall
      </Button>
    );
    const cls = screen.getByRole("button").className;
    expect(cls).toContain("h-14");
    expect(cls).not.toContain("h-9");
  });

  it("disables the button and sets data-loading when loading", () => {
    render(<Button loading>Save</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("data-loading", "true");
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("hides the label while loading and shows the default spinner", () => {
    render(<Button loading>Save</Button>);
    // Label is not rendered while loading.
    expect(screen.queryByText("Save")).not.toBeInTheDocument();
    // SVG spinner is rendered.
    expect(screen.getByRole("button").querySelector("svg")).not.toBeNull();
  });

  it("accepts a custom loadingIcon", () => {
    render(
      <Button loading loadingIcon={<span data-testid="dots">…</span>}>
        Save
      </Button>
    );
    expect(screen.getByTestId("dots")).toBeInTheDocument();
    expect(screen.getByRole("button").querySelector("svg")).toBeNull();
  });

  it("still calls onClick when not loading", () => {
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

  it("forwards refs to the underlying <button>", () => {
    const ref = {current: null as HTMLButtonElement | null};
    render(<Button ref={ref}>Save</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("exports a buttonVariants helper that returns a class string", () => {
    expect(typeof buttonVariants({variant: "ghost", size: "lg"})).toBe("string");
  });
});
