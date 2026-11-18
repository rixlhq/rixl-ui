import {describe, it, expect} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "../dialog";

type Side = "top" | "right" | "bottom" | "left";

function Sheet({side}: {side?: Side} = {}) {
  return (
    <Dialog open>
      <DialogContent data-testid="content" side={side}>
        <DialogHeader className="gap-1.5 p-4 pe-16">
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-auto flex-col p-4">Footer</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const anchors = {
  right: "data-[side=right]:right-0",
  left: "data-[side=left]:left-0",
  top: "data-[side=top]:top-0",
  bottom: "data-[side=bottom]:bottom-0",
} as const;

describe("edge sheet", () => {
  it("applies the edge surface, drawer easing and width cap", async () => {
    render(<Sheet side="right" />);
    await act(async () => {});
    const cls = screen.getByTestId("content").className;
    expect(cls).toContain("bg-rixl-bg");
    expect(cls).toContain("shadow-rixl-lg");
    expect(cls).toContain("ease-rixl-drawer");
    expect(cls).toContain("overscroll-contain");
    expect(cls).toContain("sm:max-w-sm");
  });

  it.each(["top", "right", "bottom", "left"] as const)("sets data-side and anchors to the %s edge", async (side) => {
    render(<Sheet side={side} />);
    await act(async () => {});
    const content = screen.getByTestId("content");
    expect(content).toHaveAttribute("data-side", side);
    expect(content.className).toContain(anchors[side]);
  });

  it("renders a centered dialog, not an edge sheet, without side", async () => {
    render(<Sheet />);
    await act(async () => {});
    const content = screen.getByTestId("content");
    expect(content).not.toHaveAttribute("data-side");
    expect(content.className).not.toContain("ease-rixl-drawer");
  });

  it("keeps the right side physical in RTL", async () => {
    render(
      <div dir="rtl">
        <Sheet side="right" />
      </div>
    );
    await act(async () => {});
    const content = screen.getByTestId("content");
    expect(content).toHaveAttribute("data-side", "right");
    expect(content.className).toContain("data-[side=right]:right-0");
  });

  it("renders the X close button with an sr-only label", async () => {
    render(<Sheet side="right" />);
    await act(async () => {});
    const close = document.querySelector("[data-slot='dialog-close']");
    expect(close).not.toBeNull();
    expect(close!.className).toContain("ring-offset-rixl-bg");
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("lets the header take consumer padding and a tighter gap", async () => {
    render(<Sheet side="right" />);
    await act(async () => {});
    const cls = document.querySelector("[data-slot='dialog-header']")!.className;
    expect(cls).toContain("p-4");
    expect(cls).toContain("pe-16");
    expect(cls).toContain("gap-1.5");
    expect(cls).not.toContain("gap-2");
  });

  it("lets the footer stack, pin to the bottom and take padding", async () => {
    render(<Sheet side="right" />);
    await act(async () => {});
    const cls = document.querySelector("[data-slot='dialog-footer']")!.className;
    expect(cls).toContain("mt-auto");
    expect(cls).toContain("p-4");
    expect(cls).not.toContain("flex-col-reverse");
  });
});
