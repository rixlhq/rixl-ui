import {describe, it, expect, afterEach} from "vitest";
import {useState} from "react";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Collapsible, CollapsibleTrigger, CollapsiblePanel, CollapsibleDefaultTrigger, CollapsibleDefaultPanel} from "../collapsible";

function TestCollapsible({defaultOpen = false}: {defaultOpen?: boolean} = {}) {
  return (
    <div className="p-8">
      <Collapsible defaultOpen={defaultOpen}>
        <CollapsibleTrigger data-testid="collapsible-trigger">Toggle details</CollapsibleTrigger>
        <CollapsiblePanel data-testid="collapsible-content">
          <div className="py-2">Detailed logs and metrics appear here.</div>
        </CollapsiblePanel>
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

const accordionItems = ["Shipping", "Returns", "Warranty"];

function TestAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <div className="p-8">
      {accordionItems.map((label, index) => (
        <Collapsible key={label} open={activeIndex === index} onOpenChange={(open: boolean) => setActiveIndex(open ? index : null)}>
          <CollapsibleDefaultTrigger data-testid={`accordion-trigger-${index}`}>{label}</CollapsibleDefaultTrigger>
          <CollapsibleDefaultPanel data-testid={`accordion-panel-${index}`}>
            <p className="py-2 text-sm text-rixl-fg-muted">Details about {label.toLowerCase()}.</p>
          </CollapsibleDefaultPanel>
        </Collapsible>
      ))}
    </div>
  );
}

describe("Collapsible accordion pattern in browser", () => {
  afterEach(() => {
    cleanup();
  });

  it("toggles a single item open with the keyboard", async () => {
    render(<TestAccordion />);

    const first = page.getByTestId("accordion-trigger-0");
    const second = page.getByTestId("accordion-trigger-1");
    await expect.element(first).toHaveAttribute("aria-expanded", "true");

    // First trigger is the first tabbable element: close it with the keyboard.
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await expect.element(first).toHaveAttribute("aria-expanded", "false");

    // Move to the second trigger and open it; the first stays closed.
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await expect.element(second).toHaveAttribute("aria-expanded", "true");
    await expect.element(first).toHaveAttribute("aria-expanded", "false");
    await expect.element(page.getByTestId("accordion-panel-1")).toBeVisible();
  });

  it("keeps the default trigger focus ring visible and unclipped", async () => {
    render(<TestAccordion />);

    const trigger = page.getByTestId("accordion-trigger-1");
    await userEvent.click(trigger);
    await expect.element(trigger).toHaveAttribute("aria-expanded", "true");
    await expect.element(trigger).toHaveFocus();
    await expect.element(trigger).toBeVisible();

    // The trigger sits outside any overflow-hidden panel, so its
    // focus-visible ring is never clipped by an ancestor.
    let node = document.querySelector('[data-testid="accordion-trigger-1"]')?.parentElement;
    expect(node).not.toBeNull();
    while (node && node !== document.body) {
      expect(getComputedStyle(node).overflow).not.toBe("hidden");
      node = node.parentElement;
    }

    // The open trigger's caret has rotated (Tailwind v4 rotate-180 uses
    // the native `rotate` property, not `transform`).
    const caret = document.querySelector('[data-testid="accordion-trigger-1"] svg');
    expect(caret).not.toBeNull();
    expect(getComputedStyle(caret as Element).rotate).not.toBe("none");
  });

  it("has no WCAG 2.2 AA violations with an accordion item open", async () => {
    render(<TestAccordion />);
    await expect.element(page.getByTestId("accordion-panel-0")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
