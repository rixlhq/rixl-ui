import {createRef} from "react";
import {afterEach, describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {RixlLocaleProvider} from "../../locale";
import {Checkbox} from "../checkbox";

afterEach(() => vi.restoreAllMocks());

const before = (a: Node, b: Node) => Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);

describe("Checkbox with a label", () => {
  it("is named by the label", () => {
    render(<Checkbox label="Accept the terms" />);
    expect(screen.getByRole("checkbox", {name: "Accept the terms"})).toBeInTheDocument();
  });

  it("toggles when the label text is clicked", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Accept" onCheckedChange={onCheckedChange} />);
    fireEvent.click(screen.getByText("Accept"));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("puts the control before the label by default", () => {
    render(<Checkbox label="Accept" />);
    expect(before(screen.getByRole("checkbox"), screen.getByText("Accept"))).toBe(true);
  });

  it("puts the label before the control when controlFirst is false", () => {
    render(<Checkbox label="Accept" controlFirst={false} />);
    expect(before(screen.getByText("Accept"), screen.getByRole("checkbox"))).toBe(true);
  });

  it("renders no label element without a label", () => {
    const {container} = render(<Checkbox aria-label="Accept" />);
    expect(container.querySelector("label")).toBeNull();
  });

  it("dims the label text and the pointer when disabled", () => {
    render(<Checkbox label="Accept" disabled />);
    const label = screen.getByText("Accept").closest("label")!;
    expect(label).toHaveAttribute("data-disabled");
    expect(label.className).toContain("data-disabled:cursor-not-allowed");
    expect(screen.getByText("Accept").className).toContain("group-data-disabled:opacity-50");
  });
});

describe("Checkbox optional marker", () => {
  it("shows (optional) when required is explicitly false", () => {
    render(<Checkbox label="Newsletter" required={false} />);
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  it.each([true, undefined])("shows nothing when required is %s", (required) => {
    render(<Checkbox label="Newsletter" required={required} />);
    expect(screen.queryByText("(optional)")).not.toBeInTheDocument();
  });

  it("takes the provider's label.optional", () => {
    render(
      <RixlLocaleProvider translations={{label: {optional: "(optionnel)"}}}>
        <Checkbox label="Newsletter" required={false} />
      </RixlLocaleProvider>
    );
    expect(screen.getByText("(optionnel)")).toBeInTheDocument();
  });

  it("still passes required=true to the hidden input for form validation", () => {
    const {container} = render(<Checkbox label="Accept" required />);
    expect(container.querySelector("input[type=checkbox]")).toBeRequired();
  });
});

describe("Checkbox label tooltip", () => {
  it("names the trigger from labelTooltipAriaLabel", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Checkbox label="Accept" labelTooltip="Why" labelTooltipAriaLabel="About terms" />);
    expect(screen.getByRole("button", {name: "About terms"})).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it("warns, naming the prop and the component, when the trigger has no name", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Checkbox label="Accept" labelTooltip="Why" />);
    expect(warn).toHaveBeenCalledExactlyOnceWith(
      expect.stringMatching(/\[Rixl Checkbox\]: .+ must have an accessible name\..*labelTooltipAriaLabel/)
    );
  });
});

describe("Checkbox without a label", () => {
  it("warns when nothing names it", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Checkbox />);
    expect(warn).toHaveBeenCalledExactlyOnceWith(expect.stringMatching(/\[Rixl Checkbox\]: Checkbox must have an accessible name\./));
  });

  it.each([
    ["aria-label", {"aria-label": "Select row"}],
    ["aria-labelledby", {"aria-labelledby": "row-name"}],
  ])("does not warn with %s", (_name, props) => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Checkbox {...props} />);
    expect(warn).not.toHaveBeenCalled();
  });

  it("does not warn with a label", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Checkbox label="Accept" />);
    expect(warn).not.toHaveBeenCalled();
  });
});

describe("Checkbox variant", () => {
  it("marks the control invalid for variant=error", () => {
    render(<Checkbox aria-label="Accept" variant="error" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("is not invalid by default", () => {
    render(<Checkbox aria-label="Accept" />);
    expect(screen.getByRole("checkbox")).not.toHaveAttribute("aria-invalid");
  });
});

describe("Checkbox root props with a label", () => {
  it("puts className, data-* and the ref on the control, not the label", () => {
    const ref = createRef<HTMLElement>();
    render(<Checkbox ref={ref} label="Accept" className="ms-2" data-testid="control" />);
    const control = screen.getByTestId("control");
    expect(control).toBe(screen.getByRole("checkbox"));
    expect(control.className).toContain("ms-2");
    expect(ref.current).toBe(control);
  });
});
