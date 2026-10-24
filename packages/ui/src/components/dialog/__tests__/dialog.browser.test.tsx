import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../dialog";

function TestDialog({defaultOpen = false}: {defaultOpen?: boolean} = {}) {
  return (
    <div>
      <Dialog defaultOpen={defaultOpen}>
        <DialogTrigger data-testid="trigger" render={<button type="button">Open Dialog</button>} />
        <DialogContent data-testid="content">
          <DialogHeader>
            <DialogTitle data-testid="title">Edit Profile</DialogTitle>
            <DialogDescription data-testid="description">Make changes to your profile here.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <input data-testid="input-name" placeholder="Name" />
          </div>
          <DialogFooter>
            <DialogClose data-testid="close-button" render={<button type="button">Cancel</button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

describe("Dialog Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders trigger in real browser DOM with correct accessibility attributes", async () => {
    render(<TestDialog />);

    const trigger = page.getByTestId("trigger");
    await expect.element(trigger).toBeVisible();
    await expect.element(trigger).toHaveAttribute("data-slot", "dialog-trigger");
    await expect.element(trigger).toHaveAttribute("aria-haspopup", "dialog");

    // Dialog content should not be visible when closed
    const content = page.getByTestId("content");
    await expect.element(content).not.toBeInTheDocument();
  });

  it("opens modal dialog on trigger click and manages accessibility tree", async () => {
    render(<TestDialog />);

    await userEvent.click(page.getByTestId("trigger"));

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();
    await expect.element(dialog).toHaveAttribute("data-slot", "dialog-content");

    // Accessibility labelling: aria-labelledby and aria-describedby
    const title = page.getByTestId("title");
    await expect.element(title).toBeVisible();
    await expect.element(title).toHaveTextContent("Edit Profile");

    const description = page.getByTestId("description");
    await expect.element(description).toBeVisible();
    await expect.element(description).toHaveTextContent("Make changes to your profile here.");
  });

  it("handles keyboard Escape key to close dialog and restores focus to trigger", async () => {
    render(<TestDialog />);

    const trigger = page.getByTestId("trigger");
    await userEvent.click(trigger);

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();

    // Press Escape to dismiss dialog
    await userEvent.keyboard("{Escape}");

    await expect.element(dialog).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it("closes dialog when close button is clicked and returns focus", async () => {
    render(<TestDialog />);

    const trigger = page.getByTestId("trigger");
    await userEvent.click(trigger);

    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();

    const closeBtn = page.getByTestId("close-button");
    await expect.element(closeBtn).toBeVisible();
    closeBtn.element().click();

    await expect.element(dialog).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it("supports keyboard tab navigation within the dialog focus trap", async () => {
    render(<TestDialog />);

    const trigger = page.getByTestId("trigger");
    await userEvent.click(trigger);

    const input = page.getByTestId("input-name");
    await expect.element(input).toBeVisible();

    // Type into input
    await userEvent.type(input, "Alex");
    await expect.element(input).toHaveValue("Alex");

    // Tab moves focus within the dialog
    await userEvent.tab();
    const closeBtn = page.getByTestId("close-button");
    await expect.element(closeBtn).toHaveFocus();
  });
});
