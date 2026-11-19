import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Input} from "../input";

describe("Input Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("focuses the input when its built-in label is clicked", async () => {
    render(
      <div className="p-8">
        <Input label="Email" placeholder="you@example.com" />
      </div>
    );

    await userEvent.click(page.getByText("Email"));
    await expect.element(page.getByPlaceholder("you@example.com")).toHaveFocus();
  });

  it("shows the string error and references it from the input", async () => {
    render(
      <div className="p-8">
        <Input label="Email" placeholder="you@example.com" defaultValue="not-an-email" error="Enter a valid email." />
      </div>
    );

    await expect.element(page.getByText("Enter a valid email.")).toBeVisible();
    const input = document.querySelector('input[placeholder="you@example.com"]');
    const error = document.querySelector('[data-slot="input-error"]');
    expect(input?.getAttribute("aria-describedby")?.split(" ")).toContain(error?.getAttribute("id"));
  });

  it("has no WCAG 2.2 AA violations in the labelled, error and bare states", async () => {
    render(
      <div className="flex flex-col gap-4 p-8">
        <Input label="Email" placeholder="you@example.com" description="We never share your address." />
        <Input label="Username" placeholder="ada" defaultValue="taken" error="That username is taken." />
        <Input placeholder="Search" aria-label="Search products" />
      </div>
    );

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
