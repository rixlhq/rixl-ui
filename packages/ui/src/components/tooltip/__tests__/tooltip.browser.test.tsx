import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Tooltip, TooltipProvider} from "../tooltip";

function TestTooltip({defaultOpen = false}: {defaultOpen?: boolean} = {}) {
  return (
    <div className="p-12">
      <Tooltip defaultOpen={defaultOpen} content="Helpful shortcut" render={<button type="button" data-testid="tooltip-trigger" />}>
        Hover me
      </Tooltip>
    </div>
  );
}

describe("Tooltip Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("opens on pointer hover and dismisses on Escape", async () => {
    render(<TestTooltip />);

    const trigger = page.getByTestId("tooltip-trigger");
    await expect.element(trigger).toBeVisible();

    await userEvent.hover(trigger);
    const content = page.getByText("Helpful shortcut");
    await expect.element(content).toBeVisible();
    await expect.element(content).toHaveTextContent("Helpful shortcut");

    await userEvent.keyboard("{Escape}");
    await expect.element(content).not.toBeInTheDocument();
  });

  it("has no WCAG 2.2 AA violations when open", async () => {
    render(<TestTooltip defaultOpen />);
    await expect.element(page.getByText("Helpful shortcut")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("opens an adjacent tooltip instantly while another in the same provider is open", async () => {
    render(
      <TooltipProvider delay={200}>
        <div className="flex gap-4 p-12">
          <Tooltip content="First tip" render={<button type="button" data-testid="first-trigger" />}>
            First
          </Tooltip>
          <Tooltip content="Second tip" render={<button type="button" data-testid="second-trigger" />}>
            Second
          </Tooltip>
        </div>
      </TooltipProvider>
    );

    await userEvent.hover(page.getByTestId("first-trigger"));
    await expect.element(page.getByText("First tip")).toBeVisible();
    expect(page.getByText("First tip").element()).not.toHaveAttribute("data-instant");

    await userEvent.hover(page.getByTestId("second-trigger"));
    await expect.element(page.getByText("Second tip")).toHaveAttribute("data-instant");
  });

  it("keeps a tooltip closed until the app-level provider delay has elapsed", async () => {
    const delayMs = 400;
    render(
      <TooltipProvider delay={delayMs}>
        <TestTooltip />
      </TooltipProvider>
    );

    const startedAt = performance.now();
    await userEvent.hover(page.getByTestId("tooltip-trigger"));
    await expect.element(page.getByText("Helpful shortcut")).toBeVisible();

    expect(performance.now() - startedAt).toBeGreaterThanOrEqual(delayMs);
  });
});
