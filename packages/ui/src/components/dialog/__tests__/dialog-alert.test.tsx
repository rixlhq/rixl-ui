import {describe, it, expect, vi} from "vitest";
import {useState} from "react";
import {act, render, screen} from "@testing-library/react";
import {Button} from "../../button";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../dialog";

function Alert({onOpenChange, onConfirm}: {onOpenChange?: (open: boolean) => void; onConfirm?: () => void} = {}) {
  const [open, setOpen] = useState(true);
  return (
    <Dialog
      role="alertdialog"
      open={open}
      onOpenChange={(next) => {
        onOpenChange?.(next);
        setOpen(next);
      }}
    >
      <DialogTrigger data-testid="trigger" render={<button type="button">Delete</button>} />
      <DialogContent data-testid="content">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose data-testid="cancel" render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button data-testid="action" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("alert dialog", () => {
  it("closes when a DialogClose rendered as a Button is activated", async () => {
    const onOpenChange = vi.fn();
    render(<Alert onOpenChange={onOpenChange} />);
    await act(async () => {});
    act(() => {
      screen.getByTestId("cancel").click();
    });
    await act(async () => {});
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("styles the DialogClose as an outline Button", async () => {
    render(<Alert />);
    await act(async () => {});
    expect(screen.getByTestId("cancel").className).toContain("border-rixl-border");
  });

  it("keeps the dialog open when a plain Button is activated", async () => {
    const onOpenChange = vi.fn();
    const onConfirm = vi.fn();
    render(<Alert onOpenChange={onOpenChange} onConfirm={onConfirm} />);
    await act(async () => {});
    act(() => {
      screen.getByTestId("action").click();
    });
    await act(async () => {});
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("constrains height and scrolls internally without forcing full-screen on mobile", async () => {
    render(<Alert />);
    await act(async () => {});
    const content = screen.getByTestId("content");
    expect(content.className).toContain("max-w-[calc(100%-2rem)]");
    expect(content.className).toContain("max-h-[calc(100dvh-2rem)]");
    expect(content.className).toContain("overflow-y-auto");
    expect(content.className).not.toContain("max-sm:h-dvh");
  });

  it("uses logical text alignment while preserving symmetric centering in RTL", async () => {
    render(
      <div dir="rtl">
        <Alert />
      </div>
    );
    await act(async () => {});
    const header = document.querySelector("[data-slot='dialog-header']");
    const content = screen.getByTestId("content");
    expect(header?.className).toContain("sm:text-start");
    expect(content.className).toContain("left-[50%]");
    expect(content.className).toContain("translate-x-[-50%]");
  });
});
