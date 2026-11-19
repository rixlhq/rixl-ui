import {describe, it, expect} from "vitest";
import {useState} from "react";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
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
  type DialogRole,
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

  it("applies base classes to the popup", async () => {
    render(<Basic open />);
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("bg-rixl-bg");
    expect(cls).toContain("rounded-lg");
    expect(cls).toContain("border-rixl-border");
    expect(cls).toContain("shadow-lg");
  });

  it.each<DialogRole>(["dialog", "alertdialog"])("renders no close button of its own for role=%s", async (role) => {
    render(
      <Dialog open role={role}>
        <DialogContent>
          <DialogTitle>Plain</DialogTitle>
        </DialogContent>
      </Dialog>
    );
    await act(async () => {});
    expect(screen.queryAllByRole("button")).toEqual([]);
  });

  it("closes through a DialogClose the app names", async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent data-testid="content">
          <DialogTitle>Title</DialogTitle>
          <DialogClose aria-label="Dismiss" />
        </DialogContent>
      </Dialog>
    );
    await act(async () => {});
    fireEvent.click(screen.getByRole("button", {name: "Dismiss"}));
    await waitFor(() => expect(screen.queryByTestId("content")).toBeNull());
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

  it("uses a lighter, blurred backdrop with interruptible starting/ending transitions", async () => {
    render(<Basic open />);
    await act(async () => {});
    const overlay = document.querySelector("[data-slot='dialog-overlay']");
    expect(overlay!.className).toContain("bg-rixl-overlay");
    expect(overlay!.className).toContain("backdrop-blur-sm");
    expect(overlay!.className).toContain("data-starting-style:opacity-0");
    expect(overlay!.className).toContain("data-ending-style:opacity-0");
    const content = screen.getByTestId("content");
    expect(content.className).toContain("data-starting-style:scale-95");
    expect(content.className).toContain("data-ending-style:scale-95");
    expect(content.className).not.toContain("data-open:animate-in");
  });

  it("exits faster than it enters", async () => {
    render(<Basic open />);
    await act(async () => {});
    const overlay = document.querySelector("[data-slot='dialog-overlay']");
    for (const cls of [overlay!.className, screen.getByTestId("content").className]) {
      expect(cls).toContain("duration-(--rixl-motion-base)");
      expect(cls).toContain("data-ending-style:duration-(--rixl-motion-fast)");
    }
  });

  describe("size", () => {
    it("defaults to the base max-width", async () => {
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

    it("names the middle size base", () => {
      expect(dialogContentVariants({size: "base"})).toContain("sm:max-w-lg");
    });

    it("dialogContentVariants is exported and produces size classes", () => {
      expect(dialogContentVariants({size: "xl"})).toContain("sm:max-w-4xl");
    });
  });
});

describe("role", () => {
  function RoleDialog({
    role,
    contentProps,
  }: {role?: DialogRole; contentProps?: {size?: "sm" | "base" | "lg" | "xl"; className?: string}} = {}) {
    return (
      <Dialog open role={role}>
        <DialogTrigger data-testid="trigger" render={<button type="button">Open</button>} />
        <DialogContent data-testid="content" {...contentProps}>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }

  it("renders role='dialog' by default", async () => {
    render(<RoleDialog />);
    await act(async () => {});
    expect(screen.getByTestId("content")).toHaveAttribute("role", "dialog");
    expect(screen.getByTestId("trigger")).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("renders role='alertdialog' when role='alertdialog'", async () => {
    render(<RoleDialog role="alertdialog" />);
    await act(async () => {});
    expect(screen.getByTestId("content")).toHaveAttribute("role", "alertdialog");
    // Base UI hardcodes aria-haspopup="dialog" on the trigger (its
    // AlertDialogTrigger is the same component); the alert semantics live on
    // the popup role, which is what axe checks.
    expect(screen.getByTestId("trigger")).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("uses the centered inset alert presentation for alertdialog instead of the fullscreen dialog sheet", async () => {
    render(<RoleDialog role="alertdialog" />);
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("max-w-[calc(100%-2rem)]");
    expect(cls).toContain("translate-x-[-50%]");
    expect(cls).toContain("rounded-lg");
    expect(cls).not.toContain("h-dvh");
  });

  it("exits an alertdialog faster than it enters", async () => {
    render(<RoleDialog role="alertdialog" />);
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("duration-(--rixl-motion-base)");
    expect(cls).toContain("data-ending-style:duration-(--rixl-motion-fast)");
  });

  it("respects size in alertdialog mode, defaulting to the dialog default width", async () => {
    render(<RoleDialog role="alertdialog" />);
    await act(async () => {});
    expect(screen.getByTestId("content").className).toContain("sm:max-w-lg");
  });

  it("applies the requested size in alertdialog mode", async () => {
    render(<RoleDialog role="alertdialog" contentProps={{size: "lg"}} />);
    await act(async () => {});
    expect(screen.getByTestId("content").className).toContain("sm:max-w-2xl");
  });

  it("lets a consumer className win over the alert defaults", async () => {
    render(<RoleDialog role="alertdialog" contentProps={{className: "sm:max-w-sm"}} />);
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("sm:max-w-sm");
    expect(cls).not.toContain("sm:max-w-lg");
  });
});

it("fills phones and scrolls internally", async () => {
  render(<Basic open />);
  await act(async () => {});
  const content = screen.getByTestId("content");
  expect(content.className).toContain("h-dvh");
  expect(content.className).toContain("sm:h-auto");
  expect(content.className).toContain("sm:max-h-[calc(100dvh-2rem)]");
  expect(content.className).toContain("overflow-y-auto");
});
