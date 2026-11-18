import {createRef} from "react";
import {describe, it, expect, vi} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import {Form} from "@base-ui/react/form";
import {Input, inputVariants} from "../input";

describe("Input", () => {
  it("renders a native <input>", () => {
    render(<Input placeholder="Email" />);
    const el = screen.getByPlaceholderText("Email");
    expect(el.tagName).toBe("INPUT");
  });

  it("sets data-slot='input'", () => {
    render(<Input placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("data-slot", "input");
  });

  it("forwards the `type` attribute", () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("type", "email");
  });

  it("applies base classes by default", () => {
    render(<Input placeholder="Email" />);
    const cls = screen.getByPlaceholderText("Email").className;
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("rounded-rixl-md");
    expect(cls).toContain("shadow-rixl-xs");
    expect(cls).toContain("placeholder:text-rixl-fg-muted");
  });

  it("applies focus-visible classes", () => {
    render(<Input placeholder="Email" />);
    const cls = screen.getByPlaceholderText("Email").className;
    expect(cls).toContain("focus-visible:border-rixl-ring");
    expect(cls).toContain("focus-visible:ring-rixl-ring/50");
  });

  it("applies aria-invalid classes", () => {
    render(<Input aria-invalid placeholder="Email" />);
    const cls = screen.getByPlaceholderText("Email").className;
    expect(cls).toContain("aria-invalid:border-rixl-danger");
    expect(cls).toContain("aria-invalid:ring-rixl-danger/20");
    expect(cls).toContain("aria-invalid:bg-rixl-danger/10");
  });

  it("forwards additional className without dropping base classes", () => {
    render(<Input placeholder="Email" className="w-64" />);
    const cls = screen.getByPlaceholderText("Email").className;
    expect(cls).toContain("w-64");
    expect(cls).toContain("border-rixl-border");
  });

  it("passes native attributes through", () => {
    render(<Input placeholder="Email" id="e" name="email" required maxLength={64} />);
    const el = screen.getByPlaceholderText("Email");
    expect(el).toHaveAttribute("id", "e");
    expect(el).toHaveAttribute("name", "email");
    expect(el).toBeRequired();
    expect(el).toHaveAttribute("maxlength", "64");
  });

  it("respects the disabled attribute", () => {
    render(<Input placeholder="Email" disabled />);
    expect(screen.getByPlaceholderText("Email")).toBeDisabled();
  });

  it("applies hover and read-only state classes", () => {
    render(<Input placeholder="Email" readOnly />);
    const cls = screen.getByPlaceholderText("Email").className;
    expect(cls).toContain("hover:border-rixl-border-strong");
    expect(cls).toContain("read-only:bg-rixl-surface-muted");
  });

  it("merges className last-write-wins over the default padding", () => {
    render(<Input placeholder="Email" className="px-8" />);
    const cls = screen.getByPlaceholderText("Email").className;
    expect(cls).toContain("px-8");
    expect(cls).not.toContain("px-3");
  });

  it("forwards the ref to the underlying <input>", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input placeholder="Email" ref={ref} />);
    expect(ref.current).toBe(screen.getByPlaceholderText("Email"));
    expect(ref.current?.tagName).toBe("INPUT");
  });

  describe("sizes", () => {
    it("defaults to the medium height", () => {
      render(<Input placeholder="Email" />);
      expect(screen.getByPlaceholderText("Email").className).toContain("h-9");
    });

    it.each([
      ["xs", "h-7"],
      ["sm", "h-8"],
      ["base", "h-9"],
      ["lg", "h-10"],
    ] as const)("size=%s applies %s", (size, expected) => {
      render(<Input placeholder="Email" size={size} />);
      // toHaveClass matches whole tokens; the file: variant also carries h-7
      expect(screen.getByPlaceholderText("Email")).toHaveClass(expected);
    });

    it("does not accept the removed inputSize and variant props", () => {
      // @ts-expect-error -- inputSize was removed in favour of size
      const legacySize = <Input aria-label="Email" inputSize="sm" />;
      // @ts-expect-error -- variant="error" was removed; error and aria-invalid drive the styling
      const legacyVariant = <Input aria-label="Email" variant="error" />;
      expect([legacySize, legacyVariant]).toHaveLength(2);
    });
  });

  describe("inputVariants", () => {
    it("is exported and produces the size class", () => {
      expect(inputVariants({size: "sm"})).toContain("h-8");
    });
  });

  describe("built-in field", () => {
    it("renders no field wrapper for a bare input", () => {
      render(<Input placeholder="Email" aria-label="Email" />);
      expect(screen.getByPlaceholderText("Email").closest('[data-slot="input-field"]')).toBeNull();
    });

    it("wraps the input in a field with an associated label", () => {
      render(<Input label="Email" placeholder="you@example.com" />);
      const input = screen.getByPlaceholderText("you@example.com");
      const label = screen.getByText("Email").closest("label");
      expect(input.closest('[data-slot="input-field"]')).toBe(label?.closest('[data-slot="input-field"]'));
      expect(label?.getAttribute("for")).toBe(input.getAttribute("id"));
    });

    it("renders description and references it from aria-describedby", () => {
      render(<Input label="Email" placeholder="you@example.com" description="We never share your address." />);
      const description = screen.getByText("We never share your address.");
      expect(description).toHaveAttribute("data-slot", "input-description");
      const describedBy = screen.getByPlaceholderText("you@example.com").getAttribute("aria-describedby") ?? "";
      expect(describedBy.split(" ")).toContain(description.getAttribute("id"));
    });

    it("shows a string error with invalid styling and announces it", () => {
      render(<Input label="Email" placeholder="you@example.com" defaultValue="not-an-email" error="Enter a valid email." />);
      const input = screen.getByPlaceholderText("you@example.com");
      const message = screen.getByText("Enter a valid email.");
      expect(message).toHaveAttribute("data-slot", "input-error");
      expect(input).toHaveAttribute("aria-invalid", "true");
      const describedBy = input.getAttribute("aria-describedby") ?? "";
      expect(describedBy.split(" ")).toContain(message.getAttribute("id"));
    });

    it("prefers the error over the description", () => {
      render(<Input label="Email" placeholder="you@example.com" description="We never share your address." error="Enter a valid email." />);
      expect(screen.getByText("Enter a valid email.")).toBeInTheDocument();
      expect(screen.queryByText("We never share your address.")).not.toBeInTheDocument();
    });

    it("shows a validation object with match:true immediately", () => {
      render(<Input label="Name" placeholder="Name" error={{message: "Name is required.", match: true}} />);
      expect(screen.getByText("Name is required.")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Name")).toHaveAttribute("aria-invalid", "true");
    });

    it("shows a validity-keyed error once the field validates", () => {
      render(
        <Form onSubmit={(event) => event.preventDefault()}>
          <Input label="Name" placeholder="Name" required error={{message: "Name is required.", match: "valueMissing"}} />
        </Form>
      );
      expect(screen.queryByText("Name is required.")).not.toBeInTheDocument();
      fireEvent.submit(screen.getByPlaceholderText("Name").closest("form")!);
      expect(screen.getByText("Name is required.")).toBeInTheDocument();
    });

    it("hides a validation object while the validity does not match", () => {
      render(<Input label="Name" placeholder="Name" error={{message: "Too short.", match: "tooShort"}} />);
      expect(screen.queryByText("Too short.")).not.toBeInTheDocument();
    });

    it("shows (optional) when required is explicitly false", () => {
      render(<Input label="Phone" placeholder="+1" required={false} />);
      expect(screen.getByText("(optional)")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("+1")).not.toBeRequired();
    });

    it("passes required through to the input without an indicator", () => {
      render(<Input label="Email" placeholder="you@example.com" required />);
      expect(screen.getByPlaceholderText("you@example.com")).toBeRequired();
      expect(screen.queryByText("(optional)")).not.toBeInTheDocument();
    });

    it("marks the control invalid while a message error is set", () => {
      render(<Input label="Email" placeholder="you@example.com" error="Bad" />);
      expect(screen.getByPlaceholderText("you@example.com")).toHaveAttribute("aria-invalid", "true");
    });

    it("adds password manager ignore attributes", () => {
      render(<Input label="API key" placeholder="sk_live_..." passwordManagerIgnore />);
      const input = screen.getByPlaceholderText("sk_live_...");
      expect(input.className).toContain("keeper-ignore");
      expect(input).toHaveAttribute("data-1p-ignore", "true");
      expect(input).toHaveAttribute("data-bwignore", "true");
      expect(input).toHaveAttribute("data-lpignore", "true");
      expect(input).toHaveAttribute("data-form-type", "other");
    });

    it("calls onValueChange with the typed value", () => {
      const onValueChange = vi.fn();
      render(<Input label="Email" placeholder="you@example.com" onValueChange={onValueChange} />);
      fireEvent.change(screen.getByPlaceholderText("you@example.com"), {target: {value: "a@example.com"}});
      expect(onValueChange).toHaveBeenCalledWith("a@example.com", expect.anything());
    });

    it("renders the label tooltip trigger", () => {
      render(
        <Input label="API key" placeholder="sk_live_..." labelTooltip="Find this in settings." labelTooltipAriaLabel="More information" />
      );
      expect(screen.getByRole("button", {name: "More information"})).toBeInTheDocument();
    });

    it("renders description without a label row when only help text is set", () => {
      render(<Input aria-label="Search" placeholder="Search" description="Search by name or email." />);
      expect(screen.getByText("Search by name or email.")).toBeInTheDocument();
      expect(document.querySelector('[data-slot="input-label"]')).not.toBeInTheDocument();
    });

    it("renders the tooltip without a visible label", () => {
      render(
        <Input
          aria-label="API key"
          placeholder="sk_live_..."
          labelTooltip="Find this in settings."
          labelTooltipAriaLabel="More information"
          description="Used for API calls."
        />
      );
      expect(screen.getByRole("button", {name: "More information"})).toBeInTheDocument();
      expect(document.querySelector('[data-slot="input-label"]')).toBeInTheDocument();
    });

    it("warns in dev when a bare input has no accessible name", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(<Input placeholder="Search" />);
      expect(warn).toHaveBeenCalledWith(expect.stringContaining("must have an accessible name"));
    });

    it("stays quiet when the input is named", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(<Input label="Email" placeholder="you@example.com" />);
      render(<Input placeholder="Search" aria-label="Search products" />);
      expect(warn).not.toHaveBeenCalled();
    });

    it("stays quiet when the input is named by aria-labelledby", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(<Input placeholder="Search" aria-labelledby="search-heading" />);
      expect(warn).not.toHaveBeenCalled();
    });
  });
});
