import {createRef} from "react";
import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
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
      expect(el.className).toContain("pl-9");
      expect(el.parentElement).toHaveAttribute("data-slot", "input-wrapper");
      expect(screen.getByTestId("start")).toBeInTheDocument();
    });

    it("wraps and pads for an endIcon", () => {
      render(<Input placeholder="Email" endIcon={<svg data-testid="end" />} />);
      const el = screen.getByPlaceholderText("Email");
      expect(el.className).toContain("pr-9");
      expect(screen.getByTestId("end")).toBeInTheDocument();
    });

    it("scales icon padding with inputSize", () => {
      render(<Input placeholder="Email" inputSize="lg" startIcon={<svg />} />);
      expect(screen.getByPlaceholderText("Email").className).toContain("pl-10");
    });
  });

  describe("inputVariants", () => {
    it("is exported and produces the size class", () => {
      expect(inputVariants({inputSize: "sm"})).toContain("h-8");
    });
  });
});
