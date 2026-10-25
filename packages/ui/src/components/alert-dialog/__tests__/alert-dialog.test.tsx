import {describe, it, expect} from "vitest";
import {useState} from "react";
import {act, render, screen} from "@testing-library/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";

function Basic({open}: {open?: boolean} = {}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger data-testid="trigger" render={<button type="button">Delete</button>} />
      <AlertDialogContent data-testid="content">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="cancel">Cancel</AlertDialogCancel>
          <AlertDialogAction data-testid="action">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ControlledCancel() {
  const [open, setOpen] = useState(true);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger data-testid="trigger" render={<button type="button">Delete</button>} />
      <AlertDialogContent data-testid="content">
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="cancel">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

describe("AlertDialog", () => {
  it("sets data-slot='alert-dialog-trigger' on the trigger", () => {
    render(<Basic />);
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-slot", "alert-dialog-trigger");
  });

  it("does not render content while closed", () => {
    render(<Basic />);
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
  });

  it("renders title and description when open", async () => {
    render(<Basic open />);
    await act(async () => {});
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
  });

  it("sets data-slot on content", async () => {
    render(<Basic open />);
    await act(async () => {});
    expect(screen.getByTestId("content")).toHaveAttribute("data-slot", "alert-dialog-content");
  });

  it("applies base classes to the popup", async () => {
    render(<Basic open />);
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("bg-rixl-bg");
    expect(cls).toContain("rounded-rixl-lg");
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("shadow-rixl-lg");
  });

  it("renders Action as a primary-styled Button with data-slot", async () => {
    render(<Basic open />);
    await act(async () => {});
    const action = screen.getByTestId("action");
    expect(action).toHaveAttribute("data-slot", "alert-dialog-action");
    expect(action.className).toContain("bg-rixl-primary");
    expect(action.className).toContain("text-rixl-primary-fg");
  });

  it("renders Cancel as an outline-styled Button with data-slot", async () => {
    render(<Basic open />);
    await act(async () => {});
    const cancel = screen.getByTestId("cancel");
    expect(cancel).toHaveAttribute("data-slot", "alert-dialog-cancel");
    expect(cancel.className).toContain("border-rixl-border");
  });

  it("requests close when Cancel is clicked (controlled onOpenChange)", async () => {
    render(<ControlledCancel />);
    await act(async () => {});
    expect(screen.getByTestId("content")).toBeInTheDocument();
    act(() => {
      screen.getByTestId("cancel").click();
    });
    await act(async () => {});
    // Root flipped closed; Base UI keeps the popup mounted during the exit
    // animation (never completes in jsdom), so assert via the close intent.
    expect(document.querySelector("[data-slot='alert-dialog-content']")).toBeNull();
  });
});

it("fills mobile viewports and constrains scrolling on larger screens", async () => {
  render(<Basic open />);
  await act(async () => {});
  const content = screen.getByTestId("content");
  expect(content.className).toContain("max-sm:h-dvh");
  expect(content.className).toContain("max-sm:rounded-none");
  expect(content.className).toContain("overflow-y-auto");
  expect(content.className).toContain("sm:max-h-[calc(100dvh-2rem)]");
});

it("uses logical text alignment while preserving symmetric centering in RTL", async () => {
  render(
    <div dir="rtl">
      <Basic open />
    </div>
  );
  await act(async () => {});
  const header = document.querySelector("[data-slot='alert-dialog-header']");
  const content = screen.getByTestId("content");
  expect(header?.className).toContain("sm:text-start");
  expect(content.className).toContain("left-[50%]");
  expect(content.className).toContain("translate-x-[-50%]");
});
