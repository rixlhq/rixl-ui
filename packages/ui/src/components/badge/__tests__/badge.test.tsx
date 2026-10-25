import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Badge, badgeVariants} from "../badge";

describe("Badge", () => {
  it("renders as a <span> by default", () => {
    render(<Badge>New</Badge>);
    const el = screen.getByText("New");
    expect(el.tagName).toBe("SPAN");
  });

  it("applies the default variant classes", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New").className).toContain("bg-rixl-primary");
  });

  it("respects the secondary variant", () => {
    render(<Badge variant="secondary">Beta</Badge>);
    expect(screen.getByText("Beta").className).toContain("bg-rixl-secondary");
  });

  it("respects the destructive variant", () => {
    render(<Badge variant="destructive">Danger</Badge>);
    expect(screen.getByText("Danger").className).toContain("bg-rixl-danger");
  });

  it("respects the outline variant", () => {
    render(<Badge variant="outline">Outline</Badge>);
    const cls = screen.getByText("Outline").className;
    expect(cls).toContain("text-rixl-fg");
    expect(cls).not.toContain("bg-rixl-primary");
  });

  it("forwards additional className without dropping variant classes", () => {
    render(<Badge className="ms-2">New</Badge>);
    const cls = screen.getByText("New").className;
    expect(cls).toContain("ms-2");
    expect(cls).toContain("bg-rixl-primary");
  });

  it("last-write-wins on conflicting Tailwind utilities via cn", () => {
    render(<Badge className="px-6">Wide</Badge>);
    const cls = screen.getByText("Wide").className;
    expect(cls).toContain("px-6");
    expect(cls).not.toContain("px-2");
  });

  it("renders as a custom element via `render`", () => {
    render(
      <Badge render={<a href="/tags/new" />} variant="outline">
        New
      </Badge>
    );
    const el = screen.getByText("New");
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "/tags/new");
  });

  it("passes native attributes through", () => {
    render(
      <Badge id="badge-1" title="Tooltip">
        New
      </Badge>
    );
    const el = screen.getByText("New");
    expect(el).toHaveAttribute("id", "badge-1");
    expect(el).toHaveAttribute("title", "Tooltip");
  });

  it("exports a badgeVariants helper that returns a class string", () => {
    expect(typeof badgeVariants({variant: "destructive"})).toBe("string");
  });
});
