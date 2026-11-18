import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue, type SelectProps} from "../select";

function Fruit(props: Partial<SelectProps>) {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Pick one" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select field", () => {
  it("names the combobox from the label", () => {
    render(<Fruit label="Fruit" />);
    expect(screen.getByRole("combobox", {name: "Fruit"})).toBeInTheDocument();
  });

  it("shows the description under the trigger and ties it to the combobox", () => {
    render(<Fruit label="Fruit" description="Pick your favourite" />);
    expect(screen.getByRole("combobox")).toHaveAccessibleDescription("Pick your favourite");
  });

  it("shows the error instead of the description and marks the trigger invalid", () => {
    render(<Fruit label="Fruit" description="Pick your favourite" error="Choose a fruit" />);
    expect(screen.getByText("Choose a fruit")).toHaveAttribute("data-slot", "input-error");
    expect(screen.queryByText("Pick your favourite")).toBeNull();
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });

  it("shows the optional marker for required={false}", () => {
    render(<Fruit label="Fruit" required={false} />);
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  it("puts the label tooltip trigger next to the label", () => {
    render(<Fruit label="Fruit" labelTooltip="Shown on your profile" labelTooltipAriaLabel="More information" />);
    expect(screen.getByRole("button", {name: "More information"})).toBeInTheDocument();
  });

  it("renders no field wrapper without label, description or error", () => {
    const {container} = render(<Fruit />);
    expect(container.querySelector("[data-slot='input-field']")).toBeNull();
  });

  it("disables the trigger when the root is disabled", () => {
    render(<Fruit label="Fruit" disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
