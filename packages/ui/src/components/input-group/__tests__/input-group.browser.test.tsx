import {describe, it, expect, afterEach, vi} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {InputGroup, InputGroupAddon, InputGroupButton} from "../input-group";
import {Input} from "../../input/input";

function boxShadowOf(testId: string): string {
  const el = document.querySelector(`[data-testid="${testId}"]`);
  if (!el) throw new Error(`missing #${testId}`);
  return getComputedStyle(el).boxShadow;
}

function borderColorOf(testId: string): string {
  const el = document.querySelector(`[data-testid="${testId}"]`);
  if (!el) throw new Error(`missing #${testId}`);
  return getComputedStyle(el).borderColor;
}

describe("InputGroup Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("rings the group on keyboard focus and stays quiet before it", async () => {
    render(
      <div className="p-8">
        <InputGroup data-testid="group">
          <InputGroupAddon>https://</InputGroupAddon>
          <Input placeholder="example.com" />
          <InputGroupButton>Go</InputGroupButton>
        </InputGroup>
      </div>
    );

    expect(boxShadowOf("group")).not.toContain("3px");

    // Keyboard focus lands on the input: the group wears the 3px ring.
    // The ring shadow transitions in, so poll until it settles —
    // Chromium reports the spread as 2.99999px once finished.
    await userEvent.tab();
    await expect.element(page.getByPlaceholder("example.com")).toHaveFocus();
    await vi.waitFor(() => {
      expect(boxShadowOf("group")).toMatch(/ 3px|2\.99999px/);
    });
  });

  it("turns the group chrome danger when the input is invalid", async () => {
    render(
      <div className="flex flex-col gap-4 p-8">
        <InputGroup data-testid="group-valid">
          <Input placeholder="valid" />
        </InputGroup>
        <InputGroup data-testid="group-invalid">
          <Input placeholder="invalid" aria-invalid="true" />
        </InputGroup>
      </div>
    );

    expect(borderColorOf("group-invalid")).not.toBe(borderColorOf("group-valid"));
  });

  it("has no WCAG 2.2 AA violations with addons and a button", async () => {
    render(
      <div className="p-8">
        <InputGroup>
          <InputGroupAddon>https://</InputGroupAddon>
          <Input placeholder="example.com" aria-label="Website address" />
          <InputGroupButton>Go</InputGroupButton>
        </InputGroup>
      </div>
    );

    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("focuses the inner input when the built-in label is clicked", async () => {
    render(
      <div className="p-8">
        <InputGroup label="Website">
          <InputGroupAddon>https://</InputGroupAddon>
          <Input placeholder="example.com" />
          <InputGroupButton>Go</InputGroupButton>
        </InputGroup>
      </div>
    );

    await userEvent.click(page.getByText("Website"));
    await expect.element(page.getByPlaceholder("example.com")).toHaveFocus();
  });

  it("shows the error and keeps axe clean in the labelled invalid state", async () => {
    render(
      <div className="p-8">
        <InputGroup label="Website" description="Your public site address." error="Enter a valid hostname.">
          <InputGroupAddon>https://</InputGroupAddon>
          <Input placeholder="example.com" defaultValue="not a host" />
        </InputGroup>
      </div>
    );

    await expect.element(page.getByText("Enter a valid hostname.")).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
