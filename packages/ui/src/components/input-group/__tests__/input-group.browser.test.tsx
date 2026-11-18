import {describe, it, expect, afterEach, vi} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "../input-group";

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
          <InputGroupInput placeholder="example.com" />
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
          <InputGroupInput placeholder="valid" />
        </InputGroup>
        <InputGroup data-testid="group-invalid">
          <InputGroupInput placeholder="invalid" aria-invalid="true" />
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
          <InputGroupInput placeholder="example.com" aria-label="Website address" />
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
          <InputGroupInput placeholder="example.com" />
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
          <InputGroupInput placeholder="example.com" defaultValue="not a host" />
        </InputGroup>
      </div>
    );

    await expect.element(page.getByText("Enter a valid hostname.")).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("places an end addon after the input even when it is written first", async () => {
    render(
      <div className="p-8">
        <InputGroup>
          <InputGroupAddon align="end" data-testid="end">
            .com
          </InputGroupAddon>
          <InputGroupInput placeholder="example" aria-label="Domain" />
          <InputGroupAddon data-testid="start">https://</InputGroupAddon>
        </InputGroup>
      </div>
    );

    const rect = (selector: string) => document.querySelector(selector)!.getBoundingClientRect();
    expect(rect('[data-testid="start"]').right).toBeLessThanOrEqual(rect("input").left);
    expect(rect('[data-testid="end"]').left).toBeGreaterThanOrEqual(rect("input").right);
  });

  it("has no WCAG 2.2 AA violations with a label, description, error and an icon addon", async () => {
    render(
      <div className="flex flex-col gap-4 p-8">
        <InputGroup label="Search" description="Find pages and components.">
          <InputGroupAddon>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
            </svg>
          </InputGroupAddon>
          <InputGroupInput placeholder="Search…" />
        </InputGroup>
        <InputGroup label="Website" error="Enter a valid hostname." required={false}>
          <InputGroupAddon>https://</InputGroupAddon>
          <InputGroupInput defaultValue="not a host" />
          <InputGroupAddon align="end">
            <InputGroupButton aria-label="Clear" variant="ghost">
              ×
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
