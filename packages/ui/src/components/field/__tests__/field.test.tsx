import {createRef} from "react";
import {describe, it, expect} from "vitest";
import {render, screen, act} from "@testing-library/react";
import {FieldRoot, FieldLabel, FieldDescription, FieldError, normalizeFieldError, type FieldRootActions} from "../field";
import {Input} from "../../input/input";

/** Runs the field's `validate` outside an event, flushing the state update. */
function renderInvalidField() {
  const actionsRef = createRef<FieldRootActions>();
  render(
    <FieldRoot actionsRef={actionsRef} validate={() => "Enter an email address."}>
      <Input placeholder="Email" />
      <FieldError />
    </FieldRoot>
  );
  act(() => {
    actionsRef.current?.validate();
  });
}

describe("FieldRoot", () => {
  it("renders a plain <div> grouping the field", () => {
    render(
      <FieldRoot data-testid="root">
        <span>child</span>
      </FieldRoot>
    );
    const el = screen.getByTestId("root");
    expect(el.tagName).toBe("DIV");
  });

  it("sets data-slot='field'", () => {
    render(<FieldRoot data-testid="root" />);
    expect(screen.getByTestId("root")).toHaveAttribute("data-slot", "field");
  });

  it("stacks label, control and help vertically", () => {
    render(<FieldRoot data-testid="root" />);
    const cls = screen.getByTestId("root").className;
    expect(cls).toContain("flex-col");
    expect(cls).toContain("gap-1.5");
  });

  it("forwards the ref to the grouping <div>", () => {
    const ref = createRef<HTMLDivElement>();
    render(<FieldRoot ref={ref} />);
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("merges className without dropping the layout classes", () => {
    render(<FieldRoot data-testid="root" className="max-w-sm" />);
    const cls = screen.getByTestId("root").className;
    expect(cls).toContain("max-w-sm");
    expect(cls).toContain("flex-col");
  });

  it("passes field state props through to the Base UI primitive", () => {
    render(<FieldRoot data-testid="root" name="email" disabled />);
    expect(screen.getByTestId("root")).toHaveAttribute("data-disabled", "");
  });
});

describe("FieldLabel", () => {
  it("renders a real <label> with the rixl label styling", () => {
    render(
      <FieldRoot>
        <FieldLabel> luna@example.com </FieldLabel>
        <Input placeholder="Email" />
      </FieldRoot>
    );
    const label = screen.getByText("luna@example.com");
    expect(label.tagName).toBe("LABEL");
    expect(label.className).toContain("text-sm");
    expect(label.className).toContain("font-medium");
  });

  it("sets data-slot='field-label'", () => {
    render(
      <FieldRoot>
        <FieldLabel>Email</FieldLabel>
      </FieldRoot>
    );
    expect(screen.getByText("Email")).toHaveAttribute("data-slot", "field-label");
  });

  it("is automatically associated with the field control", () => {
    render(
      <FieldRoot>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="Email" />
      </FieldRoot>
    );
    const input = screen.getByPlaceholderText("Email");
    const htmlFor = screen.getByText("Email").getAttribute("for");
    expect(htmlFor).toBeTruthy();
    expect(input.getAttribute("id")).toBe(htmlFor);
  });

  it("forwards the ref to the <label>", () => {
    const ref = createRef<HTMLElement>();
    render(
      <FieldRoot>
        <FieldLabel ref={ref}>Email</FieldLabel>
      </FieldRoot>
    );
    expect(ref.current?.tagName).toBe("LABEL");
  });
});

describe("FieldDescription", () => {
  it("renders a <p> with muted styling", () => {
    render(
      <FieldRoot>
        <Input placeholder="Email" />
        <FieldDescription>We never share your address.</FieldDescription>
      </FieldRoot>
    );
    const el = screen.getByText("We never share your address.");
    expect(el.tagName).toBe("P");
    expect(el.className).toContain("text-rixl-fg-muted");
  });

  it("sets data-slot='field-description'", () => {
    render(
      <FieldRoot>
        <FieldDescription>Help text</FieldDescription>
      </FieldRoot>
    );
    expect(screen.getByText("Help text")).toHaveAttribute("data-slot", "field-description");
  });

  it("is referenced by the control's aria-describedby", () => {
    render(
      <FieldRoot>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="Email" />
        <FieldDescription>We never share your address.</FieldDescription>
      </FieldRoot>
    );
    const describedBy = screen.getByPlaceholderText("Email").getAttribute("aria-describedby") ?? "";
    const descriptionId = screen.getByText("We never share your address.").getAttribute("id") ?? "";
    expect(descriptionId).toBeTruthy();
    expect(describedBy.split(" ")).toContain(descriptionId);
  });
});

describe("FieldError", () => {
  it("stays hidden while the field is valid", () => {
    render(
      <FieldRoot validate={() => "Enter an email address."}>
        <Input placeholder="Email" />
        <FieldError />
      </FieldRoot>
    );
    expect(screen.queryByText("Enter an email address.")).not.toBeInTheDocument();
  });

  it("renders the validation message with danger styling when invalid", () => {
    renderInvalidField();
    const el = screen.getByText("Enter an email address.");
    expect(el).toHaveAttribute("data-slot", "field-error");
    expect(el.className).toContain("text-rixl-danger");
  });

  it("is referenced by the control's aria-describedby when invalid", () => {
    renderInvalidField();
    const describedBy = screen.getByPlaceholderText("Email").getAttribute("aria-describedby") ?? "";
    const errorId = screen.getByText("Enter an email address.").getAttribute("id") ?? "";
    expect(errorId).toBeTruthy();
    expect(describedBy.split(" ")).toContain(errorId);
  });

  it("marks the control aria-invalid when the field is invalid", () => {
    renderInvalidField();
    expect(screen.getByPlaceholderText("Email")).toHaveAttribute("aria-invalid", "true");
  });
});

describe("normalizeFieldError", () => {
  it("returns undefined when no error is given", () => {
    expect(normalizeFieldError(undefined)).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(normalizeFieldError("")).toBeUndefined();
  });

  it("wraps a string message so it always matches", () => {
    expect(normalizeFieldError("Enter an email address.")).toEqual({message: "Enter an email address.", match: true});
  });

  it("passes a validation object through untouched", () => {
    const error = {message: "Too short", match: "tooShort" as const};
    expect(normalizeFieldError(error)).toBe(error);
  });
});
