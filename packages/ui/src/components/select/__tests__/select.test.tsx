import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue} from "../select";

function Basic({defaultValue, disabled, size}: {defaultValue?: string; disabled?: boolean; size?: "sm" | "default"} = {}) {
  return (
    <Select defaultValue={defaultValue} disabled={disabled}>
      <SelectTrigger size={size} data-testid="trigger">
        <SelectValue>{(v) => (v ? String(v) : "Pick one")}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel data-testid="label">Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectSeparator data-testid="sep" />
          <SelectItem value="cherry" disabled>
            Cherry
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("renders the trigger as a real button with data-slot", () => {
    render(<Basic />);
    const trigger = screen.getByTestId("trigger");
    expect(trigger).toHaveAttribute("data-slot", "select-trigger");
    expect(trigger.tagName).toBe("BUTTON");
  });

  it("applies base classes to the trigger", () => {
    render(<Basic />);
    const cls = screen.getByTestId("trigger").className;
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("rounded-rixl-md");
    expect(cls).toContain("shadow-rixl-xs");
    expect(cls).toContain("focus-visible:border-rixl-ring");
  });

  it("reflects the size prop via data-size", () => {
    render(<Basic size="sm" />);
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-size", "sm");
  });

  it("defaults size to 'default'", () => {
    render(<Basic />);
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-size", "default");
  });

  it("renders SelectValue with data-slot", () => {
    render(<Basic />);
    // SelectValue is inside the trigger and gets its data-slot from the primitive
    const val = screen.getByTestId("trigger").querySelector("[data-slot='select-value']");
    expect(val).not.toBeNull();
  });

  it("renders the placeholder text when no value is selected", () => {
    render(<Basic />);
    // With Base UI, placeholder is rendered via the SelectValue children render function.
    expect(screen.getByText("Pick one")).toBeInTheDocument();
    const val = screen.getByTestId("trigger").querySelector("[data-slot='select-value']");
    expect(val).toHaveAttribute("data-placeholder");
  });

  it("shows the raw value in the render function when defaultValue is set", () => {
    render(<Basic defaultValue="banana" />);
    // With the render-function pattern, SelectValue receives the raw value.
    // Callers who want the label can look it up in their own items map.
    expect(screen.getByText("banana")).toBeInTheDocument();
  });

  it("respects the disabled prop on the root", () => {
    render(<Basic disabled />);
    const trigger = screen.getByTestId("trigger");
    expect(trigger).toBeDisabled();
  });

  it("SelectLabel sets data-slot='select-label' with muted text", () => {
    // Label only renders when the popup is open (portal). We verify by rendering it as a standalone piece.
    render(<SelectLabel data-testid="lbl">Fruits</SelectLabel>);
    const el = screen.getByTestId("lbl");
    expect(el).toHaveAttribute("data-slot", "select-label");
    expect(el.className).toContain("text-rixl-fg-muted");
  });
});
