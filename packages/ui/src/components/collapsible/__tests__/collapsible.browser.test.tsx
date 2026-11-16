import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "../collapsible";

function TestCollapsible({defaultOpen = false}: {defaultOpen?: boolean} = {}) {
  return (
    <div className="p-8">
      <Collapsible defaultOpen={defaultOpen}>
        <CollapsibleTrigger data-testid="collapsible-trigger">Toggle details</CollapsibleTrigger>
        <CollapsibleContent data-testid="collapsible-content">
          <div className="py-2">Detailed logs and metrics appear here.</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

describe("Collapsible Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("expands and collapses content on trigger click", async () => {
    render(<TestCollapsible />);

    const trigger = page.getByTestId("collapsible-trigger");
    await expect.element(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);
    await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
    await expect.element(page.getByTestId("collapsible-content")).toBeVisible();

    await userEvent.click(trigger);
    await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("has no WCAG 2.2 AA violations when open", async () => {
    render(<TestCollapsible defaultOpen />);
    await expect.element(page.getByTestId("collapsible-content")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
