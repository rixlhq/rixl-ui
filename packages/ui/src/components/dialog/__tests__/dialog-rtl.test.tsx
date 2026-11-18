import {act, render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {Dialog, DialogContent, DialogDescription, DialogTitle} from "../dialog";

async function closeButtonClasses() {
  render(
    <Dialog open>
      <DialogContent>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
      </DialogContent>
    </Dialog>
  );
  await act(async () => {});
  return screen.getByRole("button", {name: "Close"}).classList;
}

// `env(safe-area-inset-*)` names a physical edge, while `end` follows the reading direction, so the
// inset has to be chosen per direction.
describe("DialogCloseButton safe-area inset", () => {
  it("clears the right inset where `end` is the right edge", async () => {
    expect(await closeButtonClasses()).toContain("ltr:end-[max(0.875rem,env(safe-area-inset-right))]");
  });

  it("clears the left inset where `end` is the left edge", async () => {
    expect(await closeButtonClasses()).toContain("rtl:end-[max(0.875rem,env(safe-area-inset-left))]");
  });
});
