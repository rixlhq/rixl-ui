import {createRef} from "react";
import {describe, it, expect} from "vitest";
import fc from "fast-check";
import {render, screen} from "@testing-library/react";
import {InputGroup, InputGroupAddon, InputGroupButton, type InputGroupProps} from "../input-group";
import {Input} from "../../input/input";

const sizes = ["sm", "default", "lg"] as const;
const heights: Record<(typeof sizes)[number], string> = {sm: "h-8", default: "h-9", lg: "h-10"};

describe("InputGroup", () => {
  it("renders a grouping <div>", () => {
    render(
      <InputGroup data-testid="group">
        <Input placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").tagName).toBe("DIV");
  });

  it("sets data-slot='input-group'", () => {
    render(
      <InputGroup data-testid="group">
        <Input placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group")).toHaveAttribute("data-slot", "input-group");
  });

  it("looks like an input: bordered, shadowed, one row", () => {
    render(
      <InputGroup data-testid="group">
        <Input placeholder="Search" />
      </InputGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("rounded-rixl-md");
    expect(cls).toContain("shadow-rixl-xs");
    expect(cls).toContain("items-center");
  });

  it("defaults to the medium height", () => {
    render(
      <InputGroup data-testid="group">
        <Input placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").className).toContain("h-9");
  });

  it.each(sizes)("inputSize=%s sizes the group %s", (inputSize, _) => {
    void _;
    render(
      <InputGroup data-testid="group" inputSize={inputSize}>
        <Input placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").className).toContain(heights[inputSize]);
  });

  it("adjoins the inner Input: borderless, paddingless, full-height, flexible", () => {
    render(
      <InputGroup data-testid="group">
        <Input placeholder="Search" />
      </InputGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("[&_[data-slot=input]]:border-0");
    expect(cls).toContain("[&_[data-slot=input]]:px-0");
    expect(cls).toContain("[&_[data-slot=input]]:shadow-none");
    expect(cls).toContain("[&_[data-slot=input]]:flex-1");
  });

  it("shows the 3px focus ring only for keyboard focus on the input", () => {
    render(
      <InputGroup data-testid="group">
        <Input placeholder="Search" />
      </InputGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("has-[[data-slot=input]:focus-visible]:ring-[3px]");
    expect(cls).toContain("has-[[data-slot=input]:focus-visible]:border-rixl-ring");
    expect(cls).not.toContain("focus-within:ring");
  });

  it("mirrors the input's invalid state onto the group chrome", () => {
    render(
      <InputGroup data-testid="group">
        <Input placeholder="Search" />
      </InputGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("has-[[data-slot=input][aria-invalid=true]]:border-rixl-danger");
    expect(cls).toContain("has-[[data-slot=input][aria-invalid=true]]:ring-[3px]");
  });

  it("dims the group when the inner input is disabled", () => {
    render(
      <InputGroup data-testid="group">
        <Input placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").className).toContain("has-[[data-slot=input]:disabled]:opacity-50");
  });

  it("merges className without dropping the group chrome", () => {
    render(
      <InputGroup data-testid="group" className="max-w-sm">
        <Input placeholder="Search" />
      </InputGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("max-w-sm");
    expect(cls).toContain("border-rixl-border");
  });

  it("forwards the ref to the group <div>", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <InputGroup ref={ref}>
        <Input placeholder="Search" />
      </InputGroup>
    );
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("[property] every size maps to exactly one height", () => {
    fc.assert(
      fc.property(fc.constantFrom(...sizes), (inputSize: InputGroupProps["inputSize"]) => {
        const {unmount} = render(
          <InputGroup data-testid="group" inputSize={inputSize}>
            <Input placeholder="Search" />
          </InputGroup>
        );
        const cls = screen.getByTestId("group").className;
        const present = Object.values(heights).filter((h) => cls.includes(h));
        unmount();
        expect(present).toEqual([heights[inputSize ?? "default"]]);
      })
    );
  });
});

describe("InputGroupAddon", () => {
  it("renders a muted, non-shrinking slot", () => {
    render(
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <Input placeholder="Search" />
      </InputGroup>
    );
    const el = screen.getByText("https://");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveAttribute("data-slot", "input-group-addon");
    expect(el.className).toContain("text-rixl-fg-muted");
    expect(el.className).toContain("shrink-0");
  });

  it("sizes nested icons uniformly", () => {
    render(
      <InputGroup>
        <InputGroupAddon>
          <svg data-testid="icon" />
        </InputGroupAddon>
        <Input placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByText("", {selector: '[data-slot="input-group-addon"]'}).className).toContain("[&_svg]:size-4");
  });

  it("forwards the ref to the <span>", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <InputGroup>
        <InputGroupAddon ref={ref}>https://</InputGroupAddon>
        <Input placeholder="Search" />
      </InputGroup>
    );
    expect(ref.current?.tagName).toBe("SPAN");
  });
});

describe("InputGroup field integration", () => {
  it("renders no field wrapper for a bare group", () => {
    render(
      <InputGroup data-testid="group">
        <Input placeholder="Search" aria-label="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").closest('[data-slot="field"]')).toBeNull();
  });

  it("wraps the group in a field with an associated label", () => {
    render(
      <InputGroup label="Email">
        <Input placeholder="you@example.com" />
      </InputGroup>
    );
    const input = screen.getByPlaceholderText("you@example.com");
    const label = screen.getByText("Email").closest("label");
    expect(label?.closest('[data-slot="field"]')).toBe(input.closest('[data-slot="field"]'));
    expect(label?.getAttribute("for")).toBe(input.getAttribute("id"));
  });

  it("renders description and references it from the inner input", () => {
    render(
      <InputGroup label="Email" description="We never share your address.">
        <Input placeholder="you@example.com" />
      </InputGroup>
    );
    const description = screen.getByText("We never share your address.");
    const describedBy = screen.getByPlaceholderText("you@example.com").getAttribute("aria-describedby") ?? "";
    expect(describedBy.split(" ")).toContain(description.getAttribute("id"));
  });

  it("shows a string error and marks the inner input invalid", () => {
    render(
      <InputGroup label="Email" error="Enter a valid email.">
        <Input placeholder="you@example.com" defaultValue="not-an-email" />
      </InputGroup>
    );
    expect(screen.getByText("Enter a valid email.")).toHaveAttribute("data-slot", "field-error");
    expect(screen.getByPlaceholderText("you@example.com")).toHaveAttribute("aria-invalid", "true");
  });

  it("prefers the error over the description", () => {
    render(
      <InputGroup label="Email" description="We never share your address." error="Enter a valid email.">
        <Input placeholder="you@example.com" />
      </InputGroup>
    );
    expect(screen.queryByText("We never share your address.")).not.toBeInTheDocument();
  });

  it("shows (optional) when required is explicitly false", () => {
    render(
      <InputGroup label="Phone" required={false}>
        <Input placeholder="+1" />
      </InputGroup>
    );
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  it("renders the label tooltip trigger", () => {
    render(
      <InputGroup label="API key" labelTooltip="Find this in settings.">
        <Input placeholder="sk_live_..." />
      </InputGroup>
    );
    expect(screen.getByRole("button", {name: "More information"})).toBeInTheDocument();
  });

  it("disables the inner input through field state", () => {
    render(
      <InputGroup label="Email" disabled>
        <Input placeholder="you@example.com" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText("you@example.com")).toBeDisabled();
  });

  it.each([
    ["xs", "h-8"],
    ["sm", "h-8"],
    ["base", "h-9"],
    ["lg", "h-10"],
  ] as const)("maps size=%s to %s", (size, expected) => {
    render(
      <InputGroup data-testid="group" label="Email" size={size}>
        <Input placeholder="you@example.com" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").className).toContain(expected);
  });

  it("prefers inputSize over the size alias", () => {
    render(
      <InputGroup data-testid="group" label="Email" inputSize="lg" size="sm">
        <Input placeholder="you@example.com" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").className).toContain("h-10");
  });
});

describe("InputGroupButton", () => {
  it("renders a button adjoining the input", () => {
    render(
      <InputGroup>
        <Input placeholder="Search" />
        <InputGroupButton>Go</InputGroupButton>
      </InputGroup>
    );
    const btn = screen.getByRole("button", {name: "Go"});
    expect(btn).toHaveAttribute("data-slot", "input-group-button");
    expect(btn.className).toContain("shrink-0");
  });

  it("defaults to type=button so it never submits the form", () => {
    render(
      <InputGroup>
        <Input placeholder="Search" />
        <InputGroupButton>Go</InputGroupButton>
      </InputGroup>
    );
    expect(screen.getByRole("button", {name: "Go"})).toHaveAttribute("type", "button");
  });

  it("inherits the shared press feedback and focus ring", () => {
    render(
      <InputGroup>
        <Input placeholder="Search" />
        <InputGroupButton>Go</InputGroupButton>
      </InputGroup>
    );
    const cls = screen.getByRole("button", {name: "Go"}).className;
    expect(cls).toContain("active:scale-");
    expect(cls).toContain("focus-visible:ring-[3px]");
    expect(cls).toContain("motion-reduce:active:scale-100");
  });

  it("passes variant and size through to the button", () => {
    render(
      <InputGroup>
        <Input placeholder="Search" />
        <InputGroupButton variant="destructive">Delete</InputGroupButton>
      </InputGroup>
    );
    expect(screen.getByRole("button", {name: "Delete"}).className).toContain("bg-rixl-danger");
  });

  it("forwards the ref to the <button>", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <InputGroup>
        <Input placeholder="Search" />
        <InputGroupButton ref={ref}>Go</InputGroupButton>
      </InputGroup>
    );
    expect(ref.current?.tagName).toBe("BUTTON");
  });
});
