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

  it("last-write-wins on conflicting Tailwind utilities via cn", () => {
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

  describe("press feedback", () => {
    it("scales down on press using the shared token", () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole("button").className).toContain("active:scale-[var(--rixl-press-scale)]");
    });

    it("collapses the shadow on press so the surface reads as depressed", () => {
      render(<Button>Save</Button>);
      const cls = screen.getByRole("button").className;
      expect(cls).toContain("shadow-rixl-xs");
      expect(cls).toContain("active:shadow-none");
    });

    it("uses the shallower scale on the lg size", () => {
      render(<Button size="lg">Save</Button>);
      expect(screen.getByRole("button").className).toContain("active:scale-[var(--rixl-press-scale-lg)]");
    });

    // Scaling inline text against surrounding copy looks broken, so `link`
    // signals the press with colour alone.
    it("opts the link variant out of the press transform", () => {
      render(<Button variant="link">Docs</Button>);
      expect(screen.getByRole("button").className).toContain("active:scale-100");
    });

    it("drops the transform but keeps colour under reduced motion", () => {
      render(<Button>Save</Button>);
      const cls = screen.getByRole("button").className;
      expect(cls).toContain("motion-reduce:active:scale-100");
      expect(cls).toContain("active:bg-rixl-primary-active");
    });

    // transition-all animates layout properties too, which makes a press feel
    // mushy and risks jank on width/height changes.
    it("transitions only the properties it animates", () => {
      render(<Button>Save</Button>);
      const cls = screen.getByRole("button").className;
      expect(cls).toContain("transition-[transform,background-color,box-shadow,border-color,color]");
      expect(cls).not.toContain("transition-all");
    });
  });

  describe("fumadocs-compatible API", () => {
    it("accepts `color` as an alias for `variant`", () => {
      render(<Button color="destructive">Delete</Button>);
      expect(screen.getByRole("button").className).toContain("bg-rixl-danger");
    });

    it("maps fumadocs `primary` onto the default variant", () => {
      render(<Button color="primary">Go</Button>);
      expect(screen.getByRole("button").className).toContain("bg-rixl-primary");
    });

    it("prefers `variant` when both are supplied", () => {
      render(
        <Button variant="destructive" color="primary">
          Delete
        </Button>
      );
      expect(screen.getByRole("button").className).toContain("bg-rixl-danger");
    });

    // <button> has a deprecated HTML `color` attribute, so components that
    // spread native button props (Calendar's day button) can pass anything.
    it("ignores a `color` value that is not a known variant", () => {
      render(<Button color="#ff0000">Save</Button>);
      const btn = screen.getByRole("button");
      expect(btn.className).toContain("bg-rixl-primary");
      expect(btn).not.toHaveAttribute("color");
    });

    it("supports the icon-sm size", () => {
      render(<Button size="icon-sm" aria-label="Search" />);
      expect(screen.getByRole("button").className).toContain("size-8");
    });

    it("supports the icon-xs size", () => {
      render(<Button size="icon-xs" aria-label="Search" />);
      expect(screen.getByRole("button").className).toContain("size-7");
    });
  });

  it("exports a buttonVariants helper that returns a class string", () => {
    expect(typeof buttonVariants({variant: "ghost", size: "lg"})).toBe("string");
  });
});
