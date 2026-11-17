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
      ["sm", "h-8"],
      ["default", "h-9"],
      ["lg", "h-10"],
    ] as const)("inputSize=%s applies %s", (inputSize, expected) => {
      render(<Input placeholder="Email" inputSize={inputSize} />);
      expect(screen.getByPlaceholderText("Email").className).toContain(expected);
    });
  });

  describe("icons", () => {
    it("renders a lone <input> with no wrapper when no icons are set", () => {
      render(<Input placeholder="Email" />);
      expect(screen.getByPlaceholderText("Email").parentElement).not.toHaveAttribute("data-slot", "input-wrapper");
    });

    it("wraps and pads for a startIcon", () => {
      render(<Input placeholder="Email" startIcon={<svg data-testid="start" />} />);
      const el = screen.getByPlaceholderText("Email");
      expect(el.className).toContain("ps-9");
      expect(el.parentElement).toHaveAttribute("data-slot", "input-wrapper");
      expect(screen.getByTestId("start")).toBeInTheDocument();
    });

    it("wraps and pads for an endIcon", () => {
      render(<Input placeholder="Email" endIcon={<svg data-testid="end" />} />);
      const el = screen.getByPlaceholderText("Email");
      expect(el.className).toContain("pe-9");
      expect(screen.getByTestId("end")).toBeInTheDocument();
    });

    it("scales icon padding with inputSize", () => {
      render(<Input placeholder="Email" inputSize="lg" startIcon={<svg />} />);
      expect(screen.getByPlaceholderText("Email").className).toContain("ps-10");
    });

    it("uses logical spacing and insets in RTL", () => {
      render(
        <div dir="rtl">
          <Input placeholder="Email" startIcon={<svg data-testid="start" />} endIcon={<svg data-testid="end" />} />
        </div>
      );
      expect(screen.getByPlaceholderText("Email").className).toContain("ps-9");
      expect(screen.getByPlaceholderText("Email").className).toContain("pe-9");
      expect(screen.getByTestId("start").parentElement?.className).toContain("start-3");
      expect(screen.getByTestId("end").parentElement?.className).toContain("end-3");
    });
  });

  describe("inputVariants", () => {
    it("is exported and produces the size class", () => {
      expect(inputVariants({inputSize: "sm"})).toContain("h-8");
    });
  });

  describe("built-in field", () => {
    it("renders no field wrapper for a bare input", () => {
      render(<Input placeholder="Email" aria-label="Email" />);
      expect(screen.getByPlaceholderText("Email").closest('[data-slot="field"]')).toBeNull();
    });

    it("wraps the input in a field with an associated label", () => {
      render(<Input label="Email" placeholder="you@example.com" />);
      const input = screen.getByPlaceholderText("you@example.com");
      const label = screen.getByText("Email").closest("label");
      expect(input.closest('[data-slot="field"]')).toBe(label?.closest('[data-slot="field"]'));
      expect(label?.getAttribute("for")).toBe(input.getAttribute("id"));
    });

    it("renders description and references it from aria-describedby", () => {
      render(<Input label="Email" placeholder="you@example.com" description="We never share your address." />);
      const description = screen.getByText("We never share your address.");
      expect(description).toHaveAttribute("data-slot", "field-description");
      const describedBy = screen.getByPlaceholderText("you@example.com").getAttribute("aria-describedby") ?? "";
      expect(describedBy.split(" ")).toContain(description.getAttribute("id"));
    });

    it("shows a string error with invalid styling and announces it", () => {
      render(<Input label="Email" placeholder="you@example.com" defaultValue="not-an-email" error="Enter a valid email." />);
      const input = screen.getByPlaceholderText("you@example.com");
      const message = screen.getByText("Enter a valid email.");
      expect(message).toHaveAttribute("data-slot", "field-error");
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

    it.each([
      ["xs", "h-8"],
      ["sm", "h-8"],
      ["base", "h-9"],
      ["lg", "h-10"],
    ] as const)("maps size=%s to %s", (size, expected) => {
      render(<Input label="Email" placeholder="you@example.com" size={size} />);
      expect(screen.getByPlaceholderText("you@example.com").className).toContain(expected);
    });

    it("prefers inputSize over the size alias", () => {
      render(<Input label="Email" placeholder="you@example.com" inputSize="lg" size="sm" />);
      expect(screen.getByPlaceholderText("you@example.com").className).toContain("h-10");
    });

    it("variant=error forces invalid styling without an error message", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(<Input label="Email" placeholder="you@example.com" variant="error" />);
      expect(screen.getByPlaceholderText("you@example.com")).toHaveAttribute("aria-invalid", "true");
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('variant="error" is deprecated'));
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
      render(<Input label="API key" placeholder="sk_live_..." labelTooltip="Find this in settings." />);
      expect(screen.getByRole("button", {name: "More information"})).toBeInTheDocument();
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
  });
});
