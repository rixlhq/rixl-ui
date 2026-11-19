import {describe, it, expect} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {Dialog, DialogContent, DialogTitle} from "../dialog";
import {dialogContentVariants} from "../dialog-variants";

const SHARED = [
  "[&>*]:min-w-0",
  "auto-rows-min",
  "bg-rixl-bg",
  "border-rixl-border",
  "data-ending-style:duration-(--rixl-motion-fast)",
  "data-ending-style:opacity-0",
  "data-ending-style:scale-95",
  "data-starting-style:opacity-0",
  "data-starting-style:scale-95",
  "duration-(--rixl-motion-base)",
  "ease-out",
  "fixed",
  "gap-4",
  "grid",
  "motion-reduce:transition-none",
  "overflow-x-hidden",
  "overflow-y-auto",
  "overscroll-contain",
  "p-5",
  "sm:max-w-lg",
  "sm:p-6",
  "transition-[scale,opacity]",
  "w-full",
  "wrap-anywhere",
  "z-50",
];

const RESPONSIVE_ONLY = [
  "content-start",
  "h-dvh",
  "left-0",
  "max-h-dvh",
  "max-sm:pb-[max(1.25rem,env(safe-area-inset-bottom))]",
  "max-sm:pl-[max(1.25rem,env(safe-area-inset-left))]",
  "max-sm:pr-[max(1.25rem,env(safe-area-inset-right))]",
  "max-sm:pt-[max(1.25rem,env(safe-area-inset-top))]",
  "max-w-full",
  "sm:border",
  "sm:h-auto",
  "sm:left-1/2",
  "sm:max-h-[calc(100dvh-2rem)]",
  "sm:rounded-lg",
  "sm:shadow-lg",
  "sm:top-1/2",
  "sm:translate-x-[-50%]",
  "sm:translate-y-[-50%]",
  "top-0",
];

const CENTERED_ONLY = [
  "border",
  "left-[50%]",
  "max-h-[calc(100dvh-2rem)]",
  "max-w-[calc(100%-2rem)]",
  "rounded-lg",
  "shadow-lg",
  "top-[50%]",
  "translate-x-[-50%]",
  "translate-y-[-50%]",
];

const classSet = (className: string) => [...new Set(className.split(/\s+/).filter(Boolean))].sort();

async function renderedClasses(role: "dialog" | "alertdialog") {
  render(
    <Dialog role={role} open>
      <DialogContent data-testid="content">
        <DialogTitle>Title</DialogTitle>
      </DialogContent>
    </Dialog>
  );
  await act(async () => {});
  return classSet(screen.getByTestId("content").className);
}

describe("DialogContent placement", () => {
  it("a dialog is full-screen on small viewports and centered from sm up", async () => {
    expect(await renderedClasses("dialog")).toEqual(classSet([...SHARED, ...RESPONSIVE_ONLY].join(" ")));
  });

  it("an alertdialog is centered at every viewport", async () => {
    expect(await renderedClasses("alertdialog")).toEqual(classSet([...SHARED, ...CENTERED_ONLY].join(" ")));
  });

  it("dialogContentVariants places a dialog responsively by default", () => {
    expect(classSet(dialogContentVariants())).toEqual(classSet(dialogContentVariants({placement: "responsive"})));
  });

  it("dialogContentVariants offers the centered placement an alertdialog uses", () => {
    expect(classSet(dialogContentVariants({placement: "centered"}))).toEqual(classSet([...SHARED, ...CENTERED_ONLY].join(" ")));
  });

  it("both placements keep the size classes", () => {
    expect(dialogContentVariants({placement: "centered", size: "xl"})).toContain("sm:max-w-4xl");
  });
});
