import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose} from "../sheet";

function TestSheet({defaultOpen = false}: {defaultOpen?: boolean} = {}) {
  return (
    <div className="p-8">
      <Sheet defaultOpen={defaultOpen}>
        <SheetTrigger data-testid="sheet-trigger" render={<button type="button">Open Sheet</button>} />
        <SheetContent data-testid="sheet-content" side="right">
          <SheetHeader>
            <SheetTitle data-testid="sheet-title">Navigation Menu</SheetTitle>
            <SheetDescription data-testid="sheet-desc">Explore site sections.</SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <button type="button" data-testid="sheet-action">
              Sheet Action
            </button>
          </div>
          <SheetClose data-testid="sheet-close" render={<button type="button">Close Sheet</button>} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

describe("Sheet Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders trigger and keeps sheet closed by default", async () => {
    render(<TestSheet />);

    const trigger = page.getByTestId("sheet-trigger");
    await expect.element(trigger).toBeVisible();
    await expect.element(trigger).toHaveAttribute("data-slot", "sheet-trigger");

    const content = page.getByTestId("sheet-content");
    await expect.element(content).not.toBeInTheDocument();
  });

  it("opens sheet on trigger click and displays content and backdrop", async () => {
    render(<TestSheet />);

    const trigger = page.getByTestId("sheet-trigger");
    await userEvent.click(trigger);

    const content = page.getByTestId("sheet-content");
    await expect.element(content).toBeVisible();
    await expect.element(content).toHaveAttribute("data-slot", "sheet-content");

    const title = page.getByTestId("sheet-title");
    await expect.element(title).toBeVisible();
    await expect.element(title).toHaveTextContent("Navigation Menu");
  });

  it("closes sheet on close button click and restores focus to trigger", async () => {
    render(<TestSheet defaultOpen />);

    const trigger = page.getByTestId("sheet-trigger");
    const content = page.getByTestId("sheet-content");
    await expect.element(content).toBeVisible();

    const closeBtn = page.getByTestId("sheet-close");
    closeBtn.element().click();

    await expect.element(content).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it("closes sheet on Escape key press", async () => {
    render(<TestSheet defaultOpen />);

    const trigger = page.getByTestId("sheet-trigger");
    const content = page.getByTestId("sheet-content");
    await expect.element(content).toBeVisible();

    await userEvent.keyboard("{Escape}");

    await expect.element(content).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });
});
