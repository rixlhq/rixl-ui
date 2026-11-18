import {describe, it, expect, afterEach, vi} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Button} from "../../button";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../dialog";

function TestDialog({role, onConfirm = vi.fn()}: {role?: "alertdialog"; onConfirm?: () => void} = {}) {
  return (
    <div className="p-8">
      <Dialog role={role}>
        <DialogTrigger data-testid="trigger" render={<button type="button">Delete project</button>} />
        <DialogContent data-testid="content">
          <DialogHeader>
            <DialogTitle data-testid="title">Delete project?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose data-testid="cancel" render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button data-testid="action" onClick={onConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Below 640px a normal dialog fills the screen, so go to desktop width. The popup sits in the middle of the overlay, so its corner is the outside.
async function clickOutside() {
  await page.viewport(1280, 720);
  const overlay = document.querySelector("[data-slot='dialog-overlay']");
  if (!overlay) throw new Error("overlay not rendered");
  await userEvent.click(page.elementLocator(overlay), {position: {x: 4, y: 4}});
}

describe("alert dialog in a browser", () => {
  afterEach(async () => {
    cleanup();
    await page.viewport(1280, 720);
  });

  it("ignores an outside click, then Escape cancels it and restores focus to the trigger", async () => {
    render(<TestDialog role="alertdialog" />);
    const trigger = page.getByTestId("trigger");
    await userEvent.click(trigger);
    const content = page.getByRole("alertdialog");
    await expect.element(content).toBeVisible();

    await clickOutside();
    await expect.element(content).toBeVisible();

    await userEvent.keyboard("{Escape}");
    await expect.element(content).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it("closes a normal dialog on an outside click", async () => {
    render(<TestDialog />);
    await userEvent.click(page.getByTestId("trigger"));
    const content = page.getByRole("dialog");
    await expect.element(content).toBeVisible();

    await clickOutside();
    await expect.element(content).not.toBeInTheDocument();
  });

  it("runs the confirm action without dismissing, and closes on Cancel", async () => {
    const onConfirm = vi.fn();
    render(<TestDialog role="alertdialog" onConfirm={onConfirm} />);
    await userEvent.click(page.getByTestId("trigger"));
    const content = page.getByTestId("content");
    await expect.element(content).toBeVisible();

    await userEvent.click(page.getByTestId("action"));
    expect(onConfirm).toHaveBeenCalledOnce();
    await expect.element(content).toBeVisible();

    await userEvent.click(page.getByTestId("cancel"));
    await expect.element(content).not.toBeInTheDocument();
  });

  it("has no WCAG 2.2 AA violations when open", async () => {
    render(<TestDialog role="alertdialog" />);
    await userEvent.click(page.getByTestId("trigger"));
    await expect.element(page.getByTestId("content")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
