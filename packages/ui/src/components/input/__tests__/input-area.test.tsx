import {createRef} from "react";
import {describe, it, expect, vi} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import {Form} from "@base-ui/react/form";
import {InputArea} from "../input-area";

describe("InputArea", () => {
  it("renders a native <textarea>", () => {
    render(<InputArea placeholder="Message" />);
    expect(screen.getByPlaceholderText("Message").tagName).toBe("TEXTAREA");
  });

  it("sets data-slot='input-area'", () => {
    render(<InputArea placeholder="Message" />);
    expect(screen.getByPlaceholderText("Message")).toHaveAttribute("data-slot", "input-area");
  });

  it("applies the shared control surface and grows with its content", () => {
    render(<InputArea placeholder="Message" />);
    const cls = screen.getByPlaceholderText("Message").className;
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("rounded-md");
    expect(cls).toContain("shadow-xs");
    expect(cls).toContain("placeholder:text-rixl-fg-muted");
    expect(cls).toContain("field-sizing-content");
  });

  it("applies focus-visible, hover, read-only and invalid classes", () => {
    render(<InputArea placeholder="Message" />);
    const cls = screen.getByPlaceholderText("Message").className;
    expect(cls).toContain("focus-visible:border-rixl-ring");
    expect(cls).toContain("focus-visible:ring-rixl-ring/50");
    expect(cls).toContain("hover:border-rixl-border-strong");
    expect(cls).toContain("read-only:bg-rixl-surface-muted");
    expect(cls).toContain("aria-invalid:border-rixl-danger");
    expect(cls).toContain("aria-invalid:ring-rixl-danger/20");
  });

  it("lets a consumer className win over the default minimum height", () => {
    render(<InputArea placeholder="Message" className="min-h-32" />);
    const cls = screen.getByPlaceholderText("Message").className;
    expect(cls).toContain("min-h-32");
    expect(cls).not.toContain("min-h-16");
  });

  it("passes native attributes through", () => {
    render(<InputArea placeholder="Message" id="m" name="message" rows={6} maxLength={280} required defaultValue="Hello" />);
    const el = screen.getByPlaceholderText("Message");
    expect(el).toHaveAttribute("id", "m");
    expect(el).toHaveAttribute("name", "message");
    expect(el).toHaveAttribute("rows", "6");
    expect(el).toHaveAttribute("maxlength", "280");
    expect(el).toBeRequired();
    expect(el).toHaveValue("Hello");
  });

  it("respects the disabled attribute", () => {
    render(<InputArea placeholder="Message" disabled />);
    expect(screen.getByPlaceholderText("Message")).toBeDisabled();
  });

  it("forwards the ref to the <textarea>", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<InputArea aria-label="Notes" ref={ref} />);
    expect(ref.current).toBe(screen.getByRole("textbox"));
  });

  it("calls onValueChange with the typed value", () => {
    const onValueChange = vi.fn();
    render(<InputArea aria-label="Notes" onValueChange={onValueChange} />);
    fireEvent.change(screen.getByRole("textbox"), {target: {value: "hello"}});
    expect(onValueChange).toHaveBeenCalledWith("hello", expect.anything());
  });

  it.each([
    ["xs", "min-h-12"],
    ["sm", "min-h-14"],
    ["base", "min-h-16"],
    ["lg", "min-h-20"],
  ] as const)("size=%s applies %s", (size, expected) => {
    render(<InputArea aria-label="Notes" size={size} />);
    expect(screen.getByRole("textbox").className).toContain(expected);
  });

  describe("built-in field", () => {
    it("renders no field wrapper for a bare textarea", () => {
      render(<InputArea aria-label="Notes" />);
      expect(screen.getByRole("textbox").closest('[data-slot="input-field"]')).toBeNull();
    });

    it("names the textarea with the label", () => {
      render(<InputArea label="Notes" />);
      expect(screen.getByRole("textbox", {name: "Notes"})).toBeInTheDocument();
    });

    it("describes the textarea with the description", () => {
      render(<InputArea label="Notes" description="Help text" />);
      expect(screen.getByRole("textbox", {name: "Notes"})).toHaveAccessibleDescription("Help text");
    });

    it("shows a string error, marks the textarea invalid and describes it by the error", () => {
      render(<InputArea label="Notes" description="Help text" error="Too short." />);
      const el = screen.getByRole("textbox", {name: "Notes"});
      expect(el).toHaveAttribute("aria-invalid", "true");
      expect(el).toHaveAccessibleDescription("Too short.");
      expect(screen.queryByText("Help text")).not.toBeInTheDocument();
    });

    it("keeps a dormant conditional error from marking a valid textarea invalid", () => {
      render(<InputArea label="Notes" error={{message: "Too short.", match: "tooShort"}} />);
      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid", "true");
      expect(screen.queryByText("Too short.")).not.toBeInTheDocument();
    });

    it("shows a validity-keyed error once the form validates", () => {
      render(
        <Form onSubmit={(event) => event.preventDefault()}>
          <InputArea label="Notes" required error={{message: "Notes are required.", match: "valueMissing"}} />
        </Form>
      );
      expect(screen.queryByText("Notes are required.")).not.toBeInTheDocument();
      fireEvent.submit(screen.getByRole("textbox").closest("form")!);
      expect(screen.getByText("Notes are required.")).toBeInTheDocument();
    });

    it("shows (optional) when required is explicitly false", () => {
      render(<InputArea label="Notes" required={false} />);
      expect(screen.getByText("(optional)")).toBeInTheDocument();
    });

    it("renders the label tooltip trigger", () => {
      render(<InputArea label="Script" labelTooltip="Paste your code." labelTooltipAriaLabel="More information" />);
      expect(screen.getByRole("button", {name: "More information"})).toBeInTheDocument();
    });

    it("warns in dev when a bare textarea has no accessible name", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(<InputArea placeholder="Notes" />);
      expect(warn).toHaveBeenCalledWith(expect.stringContaining("must have an accessible name"));
    });

    it("stays quiet when the textarea is named by label, aria-label or aria-labelledby", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(
        <>
          <InputArea label="Notes" />
          <InputArea aria-label="Notes" />
          <InputArea aria-labelledby="notes-heading" />
        </>
      );
      expect(warn).not.toHaveBeenCalled();
    });
  });
});
