import {describe, it, expect} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "../sheet";

function Basic({open, side}: {open?: boolean; side?: "top" | "right" | "bottom" | "left"} = {}) {
  return (
    <Sheet open={open}>
      <SheetTrigger data-testid="trigger" render={<button type="button">Open</button>} />
      <SheetContent data-testid="content" side={side}>
        <SheetHeader>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
        </SheetHeader>
        <SheetFooter>Footer</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

describe("Sheet", () => {
  it("sets data-slot='sheet-trigger' on the trigger", () => {
    render(<Basic />);
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-slot", "sheet-trigger");
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

  it("defaults to the right side and applies edge classes", async () => {
    render(<Basic open />);
    await act(async () => {});
    const content = screen.getByTestId("content");
    expect(content).toHaveAttribute("data-side", "right");
    const cls = content.className;
    expect(cls).toContain("bg-rixl-bg");
    expect(cls).toContain("shadow-rixl-lg");
    expect(cls).toContain("data-[side=right]:end-0");
    expect(cls).toContain("sm:max-w-sm");
  });

  it("honors an explicit side and sets data-side", async () => {
    render(<Basic open side="left" />);
    await act(async () => {});
    const content = screen.getByTestId("content");
    expect(content).toHaveAttribute("data-side", "left");
    expect(content.className).toContain("data-[side=left]:start-0");
  });

  it("uses logical edges and mirrors slide direction in RTL", async () => {
    render(
      <div dir="rtl">
        <Basic open />
      </div>
    );
    await act(async () => {});
    const content = screen.getByTestId("content");
    expect(content.className).toContain("data-[side=right]:end-0");
    expect(content.className).toContain("data-[side=right]:rtl:data-starting-style:-translate-x-full");
  });

  it("renders the X close button with sr-only label", async () => {
    render(<Basic open />);
    await act(async () => {});
    const close = document.querySelector("[data-slot='sheet-close']");
    expect(close).not.toBeNull();
    expect(close!.className).toContain("ring-offset-rixl-bg");
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("renders header and footer with their layout classes", async () => {
    render(<Basic open />);
    await act(async () => {});
    const header = document.querySelector("[data-slot='sheet-header']");
    const footer = document.querySelector("[data-slot='sheet-footer']");
    expect(header!.className).toContain("p-4");
    expect(footer!.className).toContain("mt-auto");
    expect(footer!.className).toContain("p-4");
  });
});
