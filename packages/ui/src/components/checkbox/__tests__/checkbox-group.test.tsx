import {createRef} from "react";
import {afterEach, describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {Checkbox} from "../checkbox";
import {CheckboxGroup} from "../checkbox-group";

afterEach(() => vi.restoreAllMocks());

function preferences(props: Parameters<typeof CheckboxGroup>[0] = {}) {
  return (
    <CheckboxGroup legend="Preferences" {...props}>
      <Checkbox value="email" label="Email" />
      <Checkbox value="sms" label="SMS" />
    </CheckboxGroup>
  );
}

describe("CheckboxGroup", () => {
  it("is a fieldset that is the group, named by the legend", () => {
    render(preferences());
    expect(screen.getByRole("group", {name: "Preferences"}).tagName).toBe("FIELDSET");
  });

  it("accepts a node as the legend, so it can be visually hidden", () => {
    render(preferences({legend: <span className="sr-only">Notification channels</span>}));
    expect(screen.getByRole("group", {name: "Notification channels"})).toBeInTheDocument();
  });

  it("describes the group with the error, then the description", () => {
    render(preferences({description: "Pick any", error: "Choose one"}));
    expect(screen.getByRole("group")).toHaveAccessibleDescription("Choose one Pick any");
  });

  it("shows the error in the danger colour and the description muted", () => {
    render(preferences({description: "Pick any", error: "Choose one"}));
    expect(screen.getByText("Choose one").className).toContain("text-rixl-danger");
    expect(screen.getByText("Pick any").className).toContain("text-rixl-fg-muted");
  });

  it("does not put aria-invalid on a group, which the group role does not allow", () => {
    render(preferences({error: "Choose one"}));
    expect(screen.getByRole("group")).not.toHaveAttribute("aria-invalid");
  });

  it("lays items out vertically by default and in a row for horizontal", () => {
    const {rerender} = render(preferences());
    const items = () => document.querySelector("[data-slot='checkbox-group-items']")!;
    expect(items()).toHaveAttribute("data-orientation", "vertical");
    rerender(preferences({orientation: "horizontal"}));
    expect(items()).toHaveAttribute("data-orientation", "horizontal");
    expect(items().className).toContain("flex-row");
  });

  it("names each checkbox from its own label", () => {
    render(preferences());
    expect(screen.getByRole("checkbox", {name: "Email"})).toBeInTheDocument();
    expect(screen.getByRole("checkbox", {name: "SMS"})).toBeInTheDocument();
  });

  it("checks the defaultValue items", () => {
    render(preferences({defaultValue: ["sms"]}));
    expect(screen.getByRole("checkbox", {name: "SMS"})).toBeChecked();
    expect(screen.getByRole("checkbox", {name: "Email"})).not.toBeChecked();
  });

  it("reports the checked values through onValueChange when a label is clicked", () => {
    const onValueChange = vi.fn();
    render(preferences({defaultValue: ["sms"], onValueChange}));
    fireEvent.click(screen.getByText("Email"));
    expect(onValueChange).toHaveBeenCalledWith(["sms", "email"], expect.anything());
  });

  it("disables every item with the group", () => {
    render(preferences({disabled: true}));
    for (const box of screen.getAllByRole("checkbox")) expect(box).toHaveAttribute("aria-disabled", "true");
  });

  it("forwards the ref and className to the fieldset", () => {
    const ref = createRef<HTMLFieldSetElement>();
    render(preferences({ref, className: "mt-4"}));
    expect(ref.current).toBe(screen.getByRole("group"));
    expect(ref.current!.className).toContain("mt-4");
  });

  it("sets data-slot='checkbox-group' on the root", () => {
    render(preferences());
    expect(screen.getByRole("group")).toHaveAttribute("data-slot", "checkbox-group");
  });
});
