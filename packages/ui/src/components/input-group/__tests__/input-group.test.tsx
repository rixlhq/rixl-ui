import {createRef} from "react";
import {describe, it, expect, vi} from "vitest";
import fc from "fast-check";
import {render, screen} from "@testing-library/react";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, type InputGroupProps} from "../input-group";

const sizes = ["xs", "sm", "base", "lg"] as const;
const heights: Record<(typeof sizes)[number], string> = {xs: "h-7", sm: "h-8", base: "h-9", lg: "h-10"};

describe("InputGroup", () => {
  it("renders a grouping <div>", () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").tagName).toBe("DIV");
  });

  it("sets data-slot='input-group'", () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group")).toHaveAttribute("data-slot", "input-group");
  });

  it("looks like an input: bordered, shadowed, one row", () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("rounded-md");
    expect(cls).toContain("shadow-xs");
    expect(cls).toContain("items-center");
  });

  it("defaults to the medium height", () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").className).toContain("h-9");
  });

  it.each(sizes)("size=%s sizes the group", (size) => {
    render(
      <InputGroup data-testid="group" size={size}>
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").className).toContain(heights[size]);
  });

  it("renders with role=group so assistive tech associates the input with its addons", () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search" aria-label="Search" />
      </InputGroup>
    );
    expect(screen.getByRole("group")).toBe(screen.getByTestId("group"));
  });

  it("shows the 3px focus ring only for keyboard focus on the input", () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("has-[[data-slot=input-group-input]:focus-visible]:ring-[3px]");
    expect(cls).toContain("has-[[data-slot=input-group-input]:focus-visible]:border-rixl-ring");
    expect(cls).not.toContain("focus-within:ring");
  });

  it("mirrors the input's invalid state onto the group chrome", () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    const cls = screen.getByTestId("group").className;
    expect(cls).toContain("has-[[data-slot=input-group-input][aria-invalid=true]]:border-rixl-danger");
    expect(cls).toContain("has-[[data-slot=input-group-input][aria-invalid=true]]:ring-[3px]");
  });

  it("dims the group when the inner input is disabled", () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").className).toContain("has-[[data-slot=input-group-input]:disabled]:opacity-50");
  });

  it("merges className without dropping the group chrome", () => {
    render(
      <InputGroup data-testid="group" className="max-w-sm">
        <InputGroupInput placeholder="Search" />
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
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("[property] every size maps to exactly one height", () => {
    fc.assert(
      fc.property(fc.constantFrom(...sizes), (size: InputGroupProps["size"]) => {
        const {unmount} = render(
          <InputGroup data-testid="group" size={size}>
            <InputGroupInput placeholder="Search" />
          </InputGroup>
        );
        // whole tokens: the file: variant also carries h-7
        const classes = screen.getByTestId("group").classList;
        const present = Object.values(heights).filter((h) => classes.contains(h));
        unmount();
        expect(present).toEqual([heights[size ?? "base"]]);
      })
    );
  });
});

describe("InputGroupInput", () => {
  it("renders a native <input> with data-slot='input-group-input'", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    const el = screen.getByPlaceholderText("Search");
    expect(el.tagName).toBe("INPUT");
    expect(el).toHaveAttribute("data-slot", "input-group-input");
  });

  it("adjoins the group: borderless, inset by its own padding, full-height, flexible, and without its own invalid ring", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    const cls = screen.getByPlaceholderText("Search").className;
    expect(cls).toContain("border-0");
    expect(cls).toContain("px-2");
    expect(cls).toContain("shadow-none");
    expect(cls).toContain("flex-1");
    expect(cls).toContain("h-full");
    expect(cls).toContain("aria-invalid:ring-0");
    expect(cls).not.toContain("px-3");
    expect(cls).not.toContain("h-9");
  });

  it("takes its text size from the group size", () => {
    render(
      <InputGroup size="xs">
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText("Search").className).toContain("sm:text-xs");
  });

  it("lets a consumer className win over the borderless defaults", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search" className="px-2" />
      </InputGroup>
    );
    const cls = screen.getByPlaceholderText("Search").className;
    expect(cls).toContain("px-2");
    expect(cls).not.toContain("px-0");
  });

  it("forwards the ref to the <input>", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search" ref={ref} />
      </InputGroup>
    );
    expect(ref.current).toBe(screen.getByPlaceholderText("Search"));
  });

  it("inherits required and disabled from the group", () => {
    render(
      <InputGroup required disabled>
        <InputGroupInput placeholder="Search" aria-label="Search" />
      </InputGroup>
    );
    const el = screen.getByPlaceholderText("Search");
    expect(el).toBeRequired();
    expect(el).toBeDisabled();
  });

  it("lets its own disabled win over the group", () => {
    render(
      <InputGroup disabled={false}>
        <InputGroupInput placeholder="Search" aria-label="Search" disabled />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText("Search")).toBeDisabled();
  });

  it("warns in dev when neither the group nor the input is named", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("must have an accessible name"));
  });

  it("stays quiet when the group has a label or the input an aria-label", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    warn.mockClear();
    render(
      <>
        <InputGroup label="Email">
          <InputGroupInput placeholder="a" />
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="b" aria-label="Search" />
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="c" aria-labelledby="search-heading" />
        </InputGroup>
      </>
    );
    expect(warn).not.toHaveBeenCalled();
  });
});

describe("InputGroupAddon", () => {
  it("defaults to the start and sorts before the input", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search" aria-label="Search" />
        <InputGroupAddon>https://</InputGroupAddon>
      </InputGroup>
    );
    const addon = screen.getByText("https://");
    expect(addon).toHaveAttribute("data-align", "start");
    expect(addon.className).toContain("order-first");
  });

  it("align=end sorts after the input", () => {
    render(
      <InputGroup>
        <InputGroupAddon align="end">.com</InputGroupAddon>
        <InputGroupInput placeholder="Search" aria-label="Search" />
      </InputGroup>
    );
    const addon = screen.getByText(".com");
    expect(addon).toHaveAttribute("data-align", "end");
    expect(addon.className).toContain("order-last");
  });

  it("renders a muted, non-shrinking slot", () => {
    render(
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput placeholder="Search" />
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
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    expect(screen.getByText("", {selector: '[data-slot="input-group-addon"]'}).className).toContain("[&_svg]:size-4");
  });

  it("keeps a square group button square against the row height", () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label="Search" />
        <InputGroupButton shape="square" size="xs" aria-label="Clear" />
        <InputGroupButton>Go</InputGroupButton>
      </InputGroup>
    );
    expect(screen.getByRole("button", {name: "Clear"}).className).toContain("aspect-square");
    expect(screen.getByRole("button", {name: "Go"}).className).not.toContain("aspect-square");
  });

  it("forwards the ref to the <span>", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <InputGroup>
        <InputGroupAddon ref={ref}>https://</InputGroupAddon>
        <InputGroupInput placeholder="Search" />
      </InputGroup>
    );
    expect(ref.current?.tagName).toBe("SPAN");
  });
});

describe("InputGroup field integration", () => {
  it("does not wrap the input in a second field when the group has a label", () => {
    render(
      <InputGroup label="Email">
        <InputGroupInput placeholder="you@example.com" />
      </InputGroup>
    );
    expect(document.querySelectorAll('[data-slot="input-field"]')).toHaveLength(1);
  });

  it("renders no field wrapper for a bare group", () => {
    render(
      <InputGroup data-testid="group">
        <InputGroupInput placeholder="Search" aria-label="Search" />
      </InputGroup>
    );
    expect(screen.getByTestId("group").closest('[data-slot="input-field"]')).toBeNull();
  });

  it("wraps the group in a field with an associated label", () => {
    render(
      <InputGroup label="Email">
        <InputGroupInput placeholder="you@example.com" />
      </InputGroup>
    );
    const input = screen.getByPlaceholderText("you@example.com");
    const label = screen.getByText("Email").closest("label");
    expect(label?.closest('[data-slot="input-field"]')).toBe(input.closest('[data-slot="input-field"]'));
    expect(label?.getAttribute("for")).toBe(input.getAttribute("id"));
  });

  it("renders description and references it from the inner input", () => {
    render(
      <InputGroup label="Email" description="We never share your address.">
        <InputGroupInput placeholder="you@example.com" />
      </InputGroup>
    );
    const description = screen.getByText("We never share your address.");
    const describedBy = screen.getByPlaceholderText("you@example.com").getAttribute("aria-describedby") ?? "";
    expect(describedBy.split(" ")).toContain(description.getAttribute("id"));
  });

  it("shows a string error and marks the inner input invalid", () => {
    render(
      <InputGroup label="Email" error="Enter a valid email.">
        <InputGroupInput placeholder="you@example.com" defaultValue="not-an-email" />
      </InputGroup>
    );
    expect(screen.getByText("Enter a valid email.")).toHaveAttribute("data-slot", "input-error");
    expect(screen.getByPlaceholderText("you@example.com")).toHaveAttribute("aria-invalid", "true");
  });

  it("prefers the error over the description", () => {
    render(
      <InputGroup label="Email" description="We never share your address." error="Enter a valid email.">
        <InputGroupInput placeholder="you@example.com" />
      </InputGroup>
    );
    expect(screen.queryByText("We never share your address.")).not.toBeInTheDocument();
  });

  it("shows (optional) when required is explicitly false", () => {
    render(
      <InputGroup label="Phone" required={false}>
        <InputGroupInput placeholder="+1" />
      </InputGroup>
    );
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  it("renders the label tooltip trigger", () => {
    render(
      <InputGroup label="API key" labelTooltip="Find this in settings." labelTooltipAriaLabel="More information">
        <InputGroupInput placeholder="sk_live_..." />
      </InputGroup>
    );
    expect(screen.getByRole("button", {name: "More information"})).toBeInTheDocument();
  });

  it("disables the inner input through field state", () => {
    render(
      <InputGroup label="Email" disabled>
        <InputGroupInput placeholder="you@example.com" />
      </InputGroup>
    );
    expect(screen.getByPlaceholderText("you@example.com")).toBeDisabled();
  });
});

describe("InputGroupButton", () => {
  it("renders a button adjoining the input", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search" />
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
        <InputGroupInput placeholder="Search" />
        <InputGroupButton>Go</InputGroupButton>
      </InputGroup>
    );
    expect(screen.getByRole("button", {name: "Go"})).toHaveAttribute("type", "button");
  });

  it("inherits the shared press feedback and focus ring", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search" />
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
        <InputGroupInput placeholder="Search" />
        <InputGroupButton variant="destructive">Delete</InputGroupButton>
      </InputGroup>
    );
    expect(screen.getByRole("button", {name: "Delete"}).className).toContain("bg-rixl-danger");
  });

  it("forwards the ref to the <button>", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <InputGroup>
        <InputGroupInput placeholder="Search" />
        <InputGroupButton ref={ref}>Go</InputGroupButton>
      </InputGroup>
    );
    expect(ref.current?.tagName).toBe("BUTTON");
  });
});
