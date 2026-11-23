import {createRef} from "react";
import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {afterEach, vi} from "vitest";
import {RixlLocaleProvider} from "../../locale";
import {Label} from "../label";

afterEach(() => vi.restoreAllMocks());

describe("Label", () => {
  it("renders as a native <label>", () => {
    render(<Label>Email</Label>);
    const label = screen.getByText("Email");
    expect(label.tagName).toBe("LABEL");
  });

  it("associates with a control via htmlFor", () => {
    render(<Label htmlFor="email-input">Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("for", "email-input");
  });

  it("applies base classes by default", () => {
    render(<Label>Email</Label>);
    const label = screen.getByText("Email");
    expect(label.className).toContain("text-sm");
    expect(label.className).toContain("font-medium");
    expect(label.className).toContain("select-none");
  });

  it("sets data-slot='label' for slot targeting", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("data-slot", "label");
  });

  it("forwards additional className without dropping base classes", () => {
    render(<Label className="text-red-500">Email</Label>);
    const label = screen.getByText("Email");
    expect(label.className).toContain("text-red-500");
    expect(label.className).toContain("font-medium");
  });

  it("last-write-wins on conflicting Tailwind utilities via cn", () => {
    render(<Label className="text-lg">Email</Label>);
    const cls = screen.getByText("Email").className;
    expect(cls).toContain("text-lg");
    expect(cls).not.toContain("text-sm");
  });

  it("passes native label attributes through", () => {
    render(
      <Label id="my-label" title="Tooltip">
        Email
      </Label>
    );
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("id", "my-label");
    expect(label).toHaveAttribute("title", "Tooltip");
  });

  it("forwards a ref to the label element", () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Email</Label>);
    expect(ref.current).toBe(screen.getByText("Email"));
  });

  it("has a displayName for devtools", () => {
    expect(Label.displayName).toBe("Label");
  });

  describe("optional marker", () => {
    it("shows (optional) in English for showOptional", () => {
      render(<Label showOptional>Email</Label>);
      expect(screen.getByText("(optional)")).toBeInTheDocument();
    });

    it("shows nothing without showOptional", () => {
      render(<Label>Email</Label>);
      expect(screen.queryByText("(optional)")).not.toBeInTheDocument();
    });

    it("takes the provider's label.optional", () => {
      render(
        <RixlLocaleProvider translations={{label: {optional: "(optionnel)"}}}>
          <Label showOptional>Email</Label>
        </RixlLocaleProvider>
      );
      expect(screen.getByText("(optionnel)")).toBeInTheDocument();
    });

    it("lets optionalLabel beat the provider", () => {
      render(
        <RixlLocaleProvider translations={{label: {optional: "(optionnel)"}}}>
          <Label showOptional optionalLabel="(facultatif)">
            Email
          </Label>
        </RixlLocaleProvider>
      );
      expect(screen.getByText("(facultatif)")).toBeInTheDocument();
    });

    it("keeps the text and the marker inside the one label", () => {
      render(<Label showOptional>Email</Label>);
      expect(screen.getByText("(optional)").closest("label")).toBe(screen.getByText("Email", {exact: false}).closest("label"));
    });
  });

  describe("tooltip", () => {
    it("renders a trigger named by tooltipAriaLabel", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(
        <Label tooltip="Help" tooltipAriaLabel="About email">
          Email
        </Label>
      );
      expect(screen.getByRole("button", {name: "About email"})).toBeInTheDocument();
      expect(warn).not.toHaveBeenCalled();
    });

    it("warns, naming tooltipAriaLabel, and invents no name, when it is missing", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(
        <>
          <Label htmlFor="email" tooltip="Help">
            Email
          </Label>
          <input id="email" />
        </>
      );
      expect(warn).toHaveBeenCalledExactlyOnceWith(
        expect.stringMatching(/\[Rixl Label\]: .+ must have an accessible name\..*tooltipAriaLabel/)
      );
      expect(screen.getByRole("button")).not.toHaveAccessibleName();
    });

    it("renders no trigger and does not warn without a tooltip", () => {
      const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(<Label>Email</Label>);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(warn).not.toHaveBeenCalled();
    });
  });
});
