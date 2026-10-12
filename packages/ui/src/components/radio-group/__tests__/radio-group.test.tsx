import {describe, it, expect, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {RadioGroup, RadioGroupItem} from "../radio-group";

describe("RadioGroup", () => {
  it("renders with role='radiogroup'", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" />
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("sets data-slot='radio-group' on the root", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" />
      </RadioGroup>
    );
    expect(screen.getByRole("radiogroup")).toHaveAttribute("data-slot", "radio-group");
  });

  it("applies base grid classes to the root", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" />
      </RadioGroup>
    );
    const cls = screen.getByRole("radiogroup").className;
    expect(cls).toContain("grid");
    expect(cls).toContain("gap-3");
  });

  it("forwards className on the root", () => {
    render(
      <RadioGroup className="mt-4">
        <RadioGroupItem value="a" />
      </RadioGroup>
    );
    const cls = screen.getByRole("radiogroup").className;
    expect(cls).toContain("mt-4");
    expect(cls).toContain("grid");
  });

  it("renders items with role='radio' and data-slot", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" data-testid="a" />
        <RadioGroupItem value="b" data-testid="b" />
      </RadioGroup>
    );
    const items = screen.getAllByRole("radio");
    expect(items).toHaveLength(2);
    for (const item of items) {
      expect(item).toHaveAttribute("data-slot", "radio-group-item");
    }
  });

  it("applies base classes to items", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" data-testid="a" />
      </RadioGroup>
    );
    const cls = screen.getByTestId("a").className;
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("text-rixl-primary");
    expect(cls).toContain("rounded-full");
    expect(cls).toContain("size-4");
  });

  it("applies focus-visible + aria-invalid classes to items", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" data-testid="a" aria-invalid />
      </RadioGroup>
    );
    const cls = screen.getByTestId("a").className;
    expect(cls).toContain("focus-visible:border-rixl-ring");
    expect(cls).toContain("aria-invalid:border-rixl-danger");
  });

  it("applies hover and checked border affordances to items", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" data-testid="a" />
      </RadioGroup>
    );
    const cls = screen.getByTestId("a").className;
    expect(cls).toContain("data-unchecked:enabled:hover:border-rixl-border-strong");
    expect(cls).toContain("data-checked:border-rixl-primary");
  });

  it("animates the selected dot in, reduced-motion safe", () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" />
      </RadioGroup>
    );
    const indicator = document.querySelector("[data-slot='radio-group-indicator']");
    expect(indicator!.className).toContain("animate-in");
    expect(indicator!.className).toContain("zoom-in-50");
    expect(indicator!.className).toContain("motion-reduce:animate-none");
  });

  it("forwards className on items", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" data-testid="a" className="size-5" />
      </RadioGroup>
    );
    const cls = screen.getByTestId("a").className;
    expect(cls).toContain("size-5");
    expect(cls).toContain("rounded-full");
  });

  it("respects a defaultValue on the group", () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioGroupItem value="a" data-testid="a" />
        <RadioGroupItem value="b" data-testid="b" />
      </RadioGroup>
    );
    expect(screen.getByTestId("a")).toHaveAttribute("aria-checked", "false");
    expect(screen.getByTestId("b")).toHaveAttribute("aria-checked", "true");
  });

  it("selects on click and fires onValueChange", () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="a" data-testid="a" />
        <RadioGroupItem value="b" data-testid="b" />
      </RadioGroup>
    );
    fireEvent.click(screen.getByTestId("b"));
    expect(onValueChange).toHaveBeenCalledWith("b", expect.anything());
  });
});
