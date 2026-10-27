import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {Popover, PopoverTrigger, PopoverContent} from "../popover";

function TestPopover({defaultOpen = false}: {defaultOpen?: boolean} = {}) {
  return (
    <div className="p-8">
      <button type="button" data-testid="outside-button">
        Outside
      </button>
      <Popover defaultOpen={defaultOpen}>
        <PopoverTrigger data-testid="popover-trigger" render={<button type="button">Open Popover</button>} />
        <PopoverContent data-testid="popover-content">
          <p data-testid="popover-text">Popover content info</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}

describe("Popover Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders trigger button and initially hides content", async () => {
    render(<TestPopover />);

    const trigger = page.getByTestId("popover-trigger");
    await expect.element(trigger).toBeVisible();
    await expect.element(trigger).toHaveAttribute("data-slot", "popover-trigger");

    const content = page.getByTestId("popover-content");
    await expect.element(content).not.toBeInTheDocument();
  });

  it("opens popover on click and renders floating content in portal", async () => {
    render(<TestPopover />);

    const trigger = page.getByTestId("popover-trigger");
    await userEvent.click(trigger);

    const content = page.getByTestId("popover-content");
    await expect.element(content).toBeVisible();
    await expect.element(content).toHaveAttribute("data-slot", "popover-content");

    const text = page.getByTestId("popover-text");
    await expect.element(text).toHaveTextContent("Popover content info");
  });

  it("dismisses popover on Escape key and restores focus to trigger", async () => {
    render(<TestPopover defaultOpen />);

    const trigger = page.getByTestId("popover-trigger");
    const content = page.getByTestId("popover-content");
    await expect.element(content).toBeVisible();

    await userEvent.keyboard("{Escape}");

    await expect.element(content).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it("closes popover when clicking outside", async () => {
    render(<TestPopover defaultOpen />);

    const content = page.getByTestId("popover-content");
    await expect.element(content).toBeVisible();

    const outside = page.getByTestId("outside-button");
    await userEvent.click(outside);

    await expect.element(content).not.toBeInTheDocument();
  });
});
