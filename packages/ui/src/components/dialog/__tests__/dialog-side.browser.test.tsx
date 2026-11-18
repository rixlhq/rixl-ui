import {describe, it, expect, afterEach} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "../dialog";

function TestSheet({defaultOpen = false}: {defaultOpen?: boolean} = {}) {
  return (
    <div className="p-8">
      <Dialog defaultOpen={defaultOpen}>
        <DialogTrigger data-testid="trigger" render={<button type="button">Open sheet</button>} />
        <DialogContent data-testid="content" side="right">
          <DialogHeader className="p-4 pe-16">
            <DialogTitle data-testid="title">Navigation Menu</DialogTitle>
            <DialogDescription>Explore site sections.</DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <button type="button">Sheet action</button>
          </div>
          <DialogClose data-testid="close" render={<button type="button">Close sheet</button>} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

describe("edge sheet in a browser", () => {
  afterEach(() => {
    cleanup();
  });

  it("keeps the sheet closed until the trigger is clicked, then shows it on the right edge", async () => {
    render(<TestSheet />);
    const content = page.getByTestId("content");
    await expect.element(content).not.toBeInTheDocument();

    await userEvent.click(page.getByTestId("trigger"));
    await expect.element(content).toBeVisible();
    await expect.element(content).toHaveAttribute("data-side", "right");
    await expect.element(page.getByTestId("title")).toHaveTextContent("Navigation Menu");
    await expect.poll(() => Math.round(content.element().getBoundingClientRect().right)).toBe(window.innerWidth);
  });

  it("closes on the close control and restores focus to the trigger", async () => {
    render(<TestSheet defaultOpen />);
    const content = page.getByTestId("content");
    await expect.element(content).toBeVisible();

    // The close control is a <button>, so the element is an HTMLElement.
    (page.getByTestId("close").element() as HTMLElement).click();

    await expect.element(content).not.toBeInTheDocument();
    await expect.element(page.getByTestId("trigger")).toHaveFocus();
  });

  it("closes on Escape and restores focus to the trigger", async () => {
    render(<TestSheet defaultOpen />);
    const content = page.getByTestId("content");
    await expect.element(content).toBeVisible();

    await userEvent.keyboard("{Escape}");

    await expect.element(content).not.toBeInTheDocument();
    await expect.element(page.getByTestId("trigger")).toHaveFocus();
  });

  it("has no WCAG 2.2 AA violations when open", async () => {
    render(<TestSheet />);
    await userEvent.click(page.getByTestId("trigger"));
    await expect.element(page.getByTestId("content")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
