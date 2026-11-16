import {describe, it, expect, afterEach, vi} from "vitest";
import {page, userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../alert-dialog";

function TestAlertDialog({onConfirm = vi.fn()}: {onConfirm?: () => void} = {}) {
  return (
    <div className="p-8">
      <AlertDialog>
        <AlertDialogTrigger data-testid="alert-trigger" render={<button type="button">Delete project</button>} />
        <AlertDialogContent data-testid="alert-content">
          <AlertDialogHeader>
            <AlertDialogTitle data-testid="alert-title">Delete project?</AlertDialogTitle>
            <AlertDialogDescription data-testid="alert-desc">This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="alert-cancel">Cancel</AlertDialogCancel>
            <AlertDialogAction data-testid="alert-action" onClick={onConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

describe("AlertDialog Browser Mode", () => {
  afterEach(() => {
    cleanup();
  });

  it("opens on trigger click, fires action, and closes on Cancel", async () => {
    const onConfirm = vi.fn();
    render(<TestAlertDialog onConfirm={onConfirm} />);

    const trigger = page.getByTestId("alert-trigger");
    await userEvent.click(trigger);

    const content = page.getByTestId("alert-content");
    await expect.element(content).toBeVisible();
    await expect.element(page.getByTestId("alert-title")).toHaveTextContent("Delete project?");

    await userEvent.click(page.getByTestId("alert-action"));
    expect(onConfirm).toHaveBeenCalledOnce();

    await userEvent.click(page.getByTestId("alert-cancel"));
    await expect.element(content).not.toBeInTheDocument();
  });

  it("has no WCAG 2.2 AA violations when open", async () => {
    render(<TestAlertDialog />);
    await userEvent.click(page.getByTestId("alert-trigger"));
    await expect.element(page.getByTestId("alert-content")).toBeVisible();

    expect(await axeViolations(document.body)).toEqual([]);
  });
});
