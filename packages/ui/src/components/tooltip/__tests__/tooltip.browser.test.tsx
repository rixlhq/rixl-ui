import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Tooltip, TooltipTrigger, TooltipContent} from "../tooltip";

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
});
