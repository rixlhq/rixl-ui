import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Tooltip, TooltipTrigger, TooltipContent, TooltipProvider} from "../tooltip";

function TestTooltip({defaultOpen = false}: {defaultOpen?: boolean} = {}) {
  return (
    <div className="p-12">
      <Tooltip defaultOpen={defaultOpen}>
        <TooltipTrigger data-testid="tooltip-trigger" render={<button type="button">Hover me</button>} />
        <TooltipContent data-testid="tooltip-content">Helpful shortcut</TooltipContent>
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
    const content = page.getByTestId("tooltip-content");
    await expect.element(content).toBeVisible();
    await expect.element(content).toHaveTextContent("Helpful shortcut");

    await userEvent.keyboard("{Escape}");
    await expect.element(content).not.toBeInTheDocument();
  });

  it("has no WCAG 2.2 AA violations when open", async () => {
    render(<TestTooltip defaultOpen />);
    await expect.element(page.getByTestId("tooltip-content")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("opens an adjacent tooltip instantly while another in the same provider is open", async () => {
    render(
      <TooltipProvider delay={200}>
        <div className="flex gap-4 p-12">
          <Tooltip>
            <TooltipTrigger data-testid="first-trigger" render={<button type="button">First</button>} />
            <TooltipContent data-testid="first-content">First tip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger data-testid="second-trigger" render={<button type="button">Second</button>} />
            <TooltipContent data-testid="second-content">Second tip</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    );

    await userEvent.hover(page.getByTestId("first-trigger"));
    await expect.element(page.getByTestId("first-content")).toBeVisible();
    expect(page.getByTestId("first-content").element()).not.toHaveAttribute("data-instant");

    await userEvent.hover(page.getByTestId("second-trigger"));
    await expect.element(page.getByTestId("second-content")).toHaveAttribute("data-instant");
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
    await expect.element(page.getByTestId("tooltip-content")).toBeVisible();

    expect(performance.now() - startedAt).toBeGreaterThanOrEqual(delayMs);
  });
});
