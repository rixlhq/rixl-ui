import {describe, it, expect} from "vitest";
import {useState} from "react";
import {act, render, screen} from "@testing-library/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  dialogContentVariants,
} from "../dialog";

function Basic({open, defaultOpen}: {open?: boolean; defaultOpen?: boolean} = {}) {
  return (
    <Dialog open={open} defaultOpen={defaultOpen}>
      <DialogTrigger data-testid="trigger" render={<button type="button">Open</button>} />
      <DialogContent data-testid="content">
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<button type="button">Close</button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Controlled() {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<button type="button">Open</button>} />
      <DialogContent data-testid="content">
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("sets data-slot='dialog-trigger' on the trigger", () => {
    render(<Basic />);
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-slot", "dialog-trigger");
  });

  it("does not render content while closed", () => {
    render(<Basic />);
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
  });

  it("renders content, title and description when open", async () => {
    render(<Basic open />);
    await act(async () => {});
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("sets data-slot on content and title", async () => {
    render(<Basic open />);
    await act(async () => {});
    expect(screen.getByTestId("content")).toHaveAttribute("data-slot", "dialog-content");
    expect(screen.getByText("Title")).toHaveAttribute("data-slot", "dialog-title");
  });

  it("applies base classes to the popup and renders the close button by default", async () => {
    render(<Basic open />);
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("bg-rixl-bg");
    expect(cls).toContain("rounded-rixl-lg");
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("shadow-rixl-lg");
    // Default close (X) button present with sr-only label.
    expect(screen.queryAllByText("Close").length).toBeGreaterThan(0);
  });

  it("omits the close button when showCloseButton=false", async () => {
    render(
      <Dialog open>
        <DialogTrigger render={<button type="button">Open</button>} />
        <DialogContent data-testid="content" showCloseButton={false}>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    await act(async () => {});
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(document.querySelector("[data-slot='dialog-close']")).toBeNull();
  });

  it("closes (unmounts) when controlled open flips false", async () => {
    const {rerender} = render(<Controlled />);
    await act(async () => {});
    expect(screen.getByTestId("content")).toBeInTheDocument();
    rerender(
      <Dialog open={false} onOpenChange={() => {}}>
        <DialogTrigger render={<button type="button">Open</button>} />
        <DialogContent data-testid="content">
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    await act(async () => {});
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("footer renders with flex-col-reverse on small screens", async () => {
    render(<Basic open />);
    await act(async () => {});
    // DialogContent portals to document.body, so query the document.
    const footer = document.querySelector("[data-slot='dialog-footer']");
    expect(footer).not.toBeNull();
    expect(footer!.className).toContain("flex-col-reverse");
  });

  it("uses a lighter, blurred backdrop", async () => {
    render(<Basic open />);
    await act(async () => {});
    const overlay = document.querySelector("[data-slot='dialog-overlay']");
    expect(overlay!.className).toContain("bg-black/50");
    expect(overlay!.className).toContain("backdrop-blur-sm");
  });

  describe("size", () => {
    it("defaults to the lg max-width", async () => {
      render(<Basic open />);
      await act(async () => {});
      expect(screen.getByTestId("content").className).toContain("sm:max-w-lg");
    });

    it("applies a larger size when requested", async () => {
      render(
        <Dialog open>
          <DialogTrigger render={<button type="button">Open</button>} />
          <DialogContent data-testid="content" size="lg">
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      await act(async () => {});
      expect(screen.getByTestId("content").className).toContain("sm:max-w-2xl");
    });

    it("dialogContentVariants is exported and produces size classes", () => {
      expect(dialogContentVariants({size: "xl"})).toContain("sm:max-w-4xl");
    });
  });
});
