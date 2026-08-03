import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Label} from "../label";

describe("Label", () => {
  it("renders as a native <label>", () => {
    render(<Label>Email</Label>);
    const label = screen.getByText("Email");
    expect(label.tagName).toBe("LABEL");
  });

  it("associates with a control via htmlFor", () => {
    render(<Label htmlFor="email-input">Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("for", "email-input");
  });

  it("applies base classes by default", () => {
    render(<Label>Email</Label>);
    const label = screen.getByText("Email");
    expect(label.className).toContain("text-sm");
    expect(label.className).toContain("font-medium");
    expect(label.className).toContain("select-none");
  });

  it("sets data-slot='label' for slot targeting", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("data-slot", "label");
  });

  it("forwards additional className without dropping base classes", () => {
    render(<Label className="text-red-500">Email</Label>);
    const label = screen.getByText("Email");
    expect(label.className).toContain("text-red-500");
    expect(label.className).toContain("font-medium");
  });

  it("last-write-wins on conflicting Tailwind utilities via tailwind-merge", () => {
    render(<Label className="text-lg">Email</Label>);
    const cls = screen.getByText("Email").className;
    expect(cls).toContain("text-lg");
    expect(cls).not.toContain("text-sm");
  });

  it("passes native label attributes through", () => {
    render(
      <Label id="my-label" title="Tooltip">
        Email
      </Label>
    );
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("id", "my-label");
    expect(label).toHaveAttribute("title", "Tooltip");
  });
});
