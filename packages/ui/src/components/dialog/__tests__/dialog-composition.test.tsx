import {createRef} from "react";
import {act, render, screen} from "@testing-library/react";
import {expect, it} from "vitest";
import {Dialog, DialogContent, DialogTitle} from "../dialog";

it("uses the semantic scrim token", async () => {
  render(
    <Dialog open>
      <DialogContent>
        <DialogTitle>Settings</DialogTitle>
      </DialogContent>
    </Dialog>
  );
  await act(async () => {});
  expect(document.querySelector("[data-slot=dialog-overlay]")?.className).toContain("bg-rixl-overlay");
});

it("forwards the content ref to the popup", async () => {
  const ref = createRef<HTMLDivElement>();
  render(
    <Dialog open>
      <DialogContent ref={ref}>
        <DialogTitle>Settings</DialogTitle>
      </DialogContent>
    </Dialog>
  );
  await act(async () => {});
  expect(ref.current).toBe(screen.getByRole("dialog"));
});
