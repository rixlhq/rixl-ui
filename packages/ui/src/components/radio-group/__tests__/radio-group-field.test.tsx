import {createRef} from "react";
import {afterEach, describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {RadioGroup, RadioGroupItem} from "../radio-group";

afterEach(() => vi.restoreAllMocks());

const before = (a: Node, b: Node) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);

function plans(props: Parameters<typeof RadioGroup>[0] = {}) {
  return (
    <RadioGroup legend="Plan" {...props}>
      <RadioGroupItem value="free" label="Free" />
      <RadioGroupItem value="pro" label="Pro" />
    </RadioGroup>
  );
}

describe("RadioGroup chrome", () => {
  it("is a fieldset that is the radiogroup, named by the legend", () => {
    render(plans());
    expect(screen.getByRole("radiogroup", {name: "Plan"}).tagName).toBe("FIELDSET");
  });

  it("accepts a node as the legend, so it can be visually hidden", () => {
    render(plans({legend: <span className="sr-only">Billing plan</span>}));
    expect(screen.getByRole("radiogroup", {name: "Billing plan"})).toBeInTheDocument();
  });

  it("describes the group with the error, then the description", () => {
    render(plans({description: "Billed monthly", error: "Pick one"}));
    expect(screen.getByRole("radiogroup")).toHaveAccessibleDescription("Pick one Billed monthly");
  });

  it("describes the group with the description alone", () => {
    render(plans({description: "Billed monthly"}));
    expect(screen.getByRole("radiogroup")).toHaveAccessibleDescription("Billed monthly");
  });

  it("marks the group invalid for an error, and not otherwise", () => {
    const {rerender} = render(plans());
    expect(screen.getByRole("radiogroup")).not.toHaveAttribute("aria-invalid");
    rerender(plans({error: "Pick one"}));
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-invalid", "true");
  });

  it("shows the error in the danger colour and the description muted", () => {
    render(plans({description: "Billed monthly", error: "Pick one"}));
    expect(screen.getByText("Pick one").className).toContain("text-rixl-danger");
    expect(screen.getByText("Billed monthly").className).toContain("text-rixl-fg-muted");
  });

  it("lays items out vertically by default and in a row for horizontal", () => {
    const {rerender} = render(plans());
    const items = () => document.querySelector("[data-slot='radio-group-items']")!;
    expect(items()).toHaveAttribute("data-orientation", "vertical");
    rerender(plans({orientation: "horizontal"}));
    expect(items()).toHaveAttribute("data-orientation", "horizontal");
    expect(items().className).toContain("flex-row");
  });

  it("keeps the group's own props: value, onValueChange, disabled, className, ref", () => {
    const onValueChange = vi.fn();
    const ref = createRef<HTMLFieldSetElement>();
    render(plans({ref, defaultValue: "free", onValueChange, className: "mt-4"}));
    const group = screen.getByRole("radiogroup");
    expect(ref.current).toBe(group);
    expect(group.className).toContain("mt-4");
    expect(screen.getByRole("radio", {name: "Free"})).toBeChecked();
    fireEvent.click(screen.getByText("Pro"));
    expect(onValueChange).toHaveBeenCalledWith("pro", expect.anything());
  });

  it("disables every item with the group", () => {
    render(plans({disabled: true}));
    for (const radio of screen.getAllByRole("radio")) expect(radio).toHaveAttribute("aria-disabled", "true");
  });
});

describe("RadioGroupItem label", () => {
  it("names the radio and selects it when the text is clicked", () => {
    render(plans());
    expect(screen.getByRole("radio", {name: "Pro"})).not.toBeChecked();
    fireEvent.click(screen.getByText("Pro"));
    expect(screen.getByRole("radio", {name: "Pro"})).toBeChecked();
  });

  it("puts the control before the label by default and after it for controlFirst={false}", () => {
    render(
      <RadioGroup aria-label="Plan">
        <RadioGroupItem value="a" label="First" />
        <RadioGroupItem value="b" label="Last" controlFirst={false} />
      </RadioGroup>
    );
    expect(before(screen.getByRole("radio", {name: "First"}), screen.getByText("First"))).toBe(true);
    expect(before(screen.getByText("Last"), screen.getByRole("radio", {name: "Last"}))).toBe(true);
  });

  it("marks the radio invalid for variant=error", () => {
    render(
      <RadioGroup aria-label="Plan">
        <RadioGroupItem value="a" label="A" variant="error" />
      </RadioGroup>
    );
    expect(screen.getByRole("radio")).toHaveAttribute("aria-invalid", "true");
  });

  it("warns when a radio has no label and no aria-label", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <RadioGroup aria-label="Plan">
        <RadioGroupItem value="a" />
      </RadioGroup>
    );
    expect(warn).toHaveBeenCalledExactlyOnceWith(
      expect.stringMatching(/\[Rixl RadioGroupItem\]: RadioGroupItem must have an accessible name\./)
    );
  });

  it("does not warn with an aria-label", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <RadioGroup aria-label="Plan">
        <RadioGroupItem value="a" aria-label="A" />
      </RadioGroup>
    );
    expect(warn).not.toHaveBeenCalled();
  });

  it("dims the label text of a disabled item", () => {
    render(
      <RadioGroup aria-label="Plan">
        <RadioGroupItem value="a" label="A" disabled />
      </RadioGroup>
    );
    expect(screen.getByText("A").className).toContain("group-data-disabled:opacity-50");
  });
});
