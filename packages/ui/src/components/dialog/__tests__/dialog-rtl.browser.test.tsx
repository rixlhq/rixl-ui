import {afterEach, describe, expect, it} from "vitest";
import {page} from "vitest/browser";
import {cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {Dialog, DialogContent, DialogDescription, DialogTitle} from "../dialog";

afterEach(async () => {
  cleanup();
  resetDirection();
  await page.viewport(1280, 720);
});

async function openDialog() {
  renderRtl(
    <Dialog open>
      <DialogContent>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
      </DialogContent>
    </Dialog>
  );
  await expect.element(page.getByRole("dialog")).toBeVisible();
}

describe("Dialog in RTL", () => {
  it.each([320, 1280])("puts the close button on the left of the content at a %i px viewport", async (width) => {
    await page.viewport(width, 720);
    await openDialog();
    const content = page.getByRole("dialog").element().getBoundingClientRect();
    const close = page.getByRole("button", {name: "Close"}).element().getBoundingClientRect();
    expect(close.left - content.left).toBeLessThan(content.right - close.right);
  });

  it("keeps the content centred", async () => {
    await openDialog();
    const content = page.getByRole("dialog").element().getBoundingClientRect();
    expect(Math.abs(content.left + content.width / 2 - window.innerWidth / 2)).toBeLessThan(1);
  });

  it("has no axe violations", async () => {
    await openDialog();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
