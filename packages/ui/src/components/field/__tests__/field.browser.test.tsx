import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {FieldRoot, FieldLabel, FieldDescription, FieldError} from "../field";
import {Input} from "../../input/input";

function TestForm() {
  return (
    <div className="p-8">
      <FieldRoot validate={(value) => (!value ? "Enter an email address." : null)} validationMode="onBlur">
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="you@example.com" />
        <FieldDescription>We never share your address.</FieldDescription>
        <FieldError />
      </FieldRoot>
    </div>
  );
}

describe("Field Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("focuses the control when its label is clicked", async () => {
    render(<TestForm />);

    await userEvent.click(page.getByText("Email"));
    await expect.element(page.getByPlaceholder("you@example.com")).toHaveFocus();
  });

  it("shows the error and wires it up after blur on an empty required-ish field", async () => {
    render(<TestForm />);

    const input = page.getByPlaceholder("you@example.com");
    await userEvent.click(input);
    await userEvent.keyboard("{Tab}");

    await expect.element(page.getByText("Enter an email address.")).toBeVisible();
  });

  it("has no WCAG 2.2 AA violations in the valid and invalid states", async () => {
    render(<TestForm />);
    expect(await axeViolations(document.body)).toEqual([]);

    const input = page.getByPlaceholder("you@example.com");
    await userEvent.click(input);
    await userEvent.keyboard("{Tab}");
    await expect.element(page.getByText("Enter an email address.")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
