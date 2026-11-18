import {afterEach, describe, expect, it} from "vitest";
import {page, userEvent} from "vitest/browser";
import {cleanup, render} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose} from "../dialog";
import {Popover, PopoverContent, PopoverTrigger} from "../../popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../../dropdown-menu";
import {Input, InputArea} from "../../input";
import {Table, TableBody, TableRow, TableCell} from "../../table";

import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "../../select";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "../../tabs";

const longText = "reference_".repeat(100);

function LongContent() {
  return (
    <>
      <p>{longText}</p>
      {Array.from({length: 25}, (_, index) => (
        <p key={index}>Record {index}: Review this information before continuing.</p>
      ))}
    </>
  );
}

function expectContained(element: Element) {
  const rect = element.getBoundingClientRect();
  expect(rect.top).toBeGreaterThanOrEqual(-1);
  expect(rect.left).toBeGreaterThanOrEqual(-1);
  expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight + 1);
  expect(rect.right).toBeLessThanOrEqual(window.innerWidth + 1);
  expect(element.scrollWidth).toBeLessThanOrEqual(element.clientWidth + 1);
}

async function reachEnd(surface: Element) {
  expect(getComputedStyle(surface).overflowY).toBe("auto");
  expect(surface.scrollHeight).toBeGreaterThan(surface.clientHeight);
  surface.scrollTop = surface.scrollHeight;
  await expect
    .poll(() => {
      const end = page.getByTestId("end").element().getBoundingClientRect();
      const bounds = surface.getBoundingClientRect();
      return end.top >= bounds.top && end.bottom <= bounds.bottom;
    })
    .toBe(true);
}

describe("mobile overlay layout", () => {
  afterEach(async () => {
    cleanup();
    await page.viewport(1280, 720);
  });

  it.each([
    {width: 320, height: 568},
    {width: 568, height: 320},
  ])("fills a phone viewport and scrolls long text and wide data at $width x $height", async ({width, height}) => {
    await page.viewport(width, height);
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{longText}</DialogTitle>
            <DialogDescription>Review records</DialogDescription>
          </DialogHeader>
          <LongContent />
          <Table className="min-w-[60rem]">
            <TableBody>
              <TableRow>
                <TableCell>Wide data</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <DialogFooter>
            <DialogClose data-testid="end">Done</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();
    await expect.poll(() => Math.round(dialog.element().getBoundingClientRect().width)).toBe(width);
    const surface = dialog.element();
    expect(Math.round(surface.getBoundingClientRect().height)).toBe(height);
    expectContained(surface);
    await reachEnd(surface);
    expect(await axeViolations(document.body)).toEqual([]);
    await userEvent.click(page.getByTestId("end"));
    await expect.element(dialog).not.toBeInTheDocument();
  });

  it.each(["sm", "default", "lg", "xl"] as const)("keeps the %s dialog centered on desktop", async (size) => {
    await page.viewport(1280, 800);
    render(
      <Dialog defaultOpen>
        <DialogContent size={size}>
          <DialogTitle>Review</DialogTitle>
          <DialogDescription>Details</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    const dialog = page.getByRole("dialog");
    await expect.element(dialog).toBeVisible();
    const expected = {sm: 384, default: 512, lg: 672, xl: 896}[size];
    await expect.poll(() => Math.round(dialog.element().getBoundingClientRect().width)).toBe(expected);
    expect(Math.round(dialog.element().getBoundingClientRect().left)).toBe((1280 - expected) / 2);
  });

  it("keeps long alerts inset and their cancel action reachable", async () => {
    await page.viewport(320, 320);
    render(
      <Dialog role="alertdialog" defaultOpen>
        <DialogContent>
          <DialogTitle>{longText}</DialogTitle>
          <DialogDescription>Confirm records</DialogDescription>
          <LongContent />
          <DialogClose data-testid="end">Cancel</DialogClose>
        </DialogContent>
      </Dialog>
    );
    const dialog = page.getByRole("alertdialog");
    await expect.element(dialog).toBeVisible();
    expectContained(dialog.element());
    expect(dialog.element().getBoundingClientRect().width).toBeLessThan(320);
    await reachEnd(dialog.element());
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("bounds tall popovers and reaches their final content", async () => {
    await page.viewport(320, 568);
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Records</PopoverTrigger>
        <PopoverContent data-testid="surface">
          <LongContent />
          <button data-testid="end">Done</button>
        </PopoverContent>
      </Popover>
    );
    const popup = page.getByTestId("surface");
    await expect.element(popup).toBeVisible();
    expectContained(popup.element());
    await reachEnd(popup.element());
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("allows long submenus to scroll to their last item", async () => {
    await page.viewport(320, 568);
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub defaultOpen>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent data-testid="surface">
              {Array.from({length: 40}, (_, index) => (
                <DropdownMenuItem key={index} data-testid={index === 39 ? "end" : undefined}>
                  Action {index}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    const popup = page.getByTestId("surface");
    await expect.element(popup).toBeVisible();
    expectContained(popup.element());
    await reachEnd(popup.element());
    expect(getComputedStyle(popup.element()).overflowY).toBe("auto");
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("contains long select options on narrow screens", async () => {
    await page.viewport(320, 568);
    render(
      <Select defaultOpen>
        <SelectTrigger aria-label="Record">
          <SelectValue placeholder="Choose" />
        </SelectTrigger>
        <SelectContent data-testid="surface">
          {Array.from({length: 40}, (_, index) => (
            <SelectItem key={index} value={String(index)}>
              Record {index}: {longText}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
    const popup = page.getByTestId("surface");
    await expect.element(popup).toBeVisible();
    expectContained(popup.element());
    expect(getComputedStyle(popup.element()).overflowY).toBe("auto");
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("scrolls a narrow tab row to the selected panel", async () => {
    await page.viewport(320, 568);
    render(
      <Tabs defaultValue="0">
        <TabsList>
          {Array.from({length: 10}, (_, index) => (
            <TabsTrigger key={index} value={String(index)}>
              Section {index}
            </TabsTrigger>
          ))}
        </TabsList>
        {Array.from({length: 10}, (_, index) => (
          <TabsContent key={index} value={String(index)}>
            Panel {index}
          </TabsContent>
        ))}
      </Tabs>
    );
    const tabs = page.getByRole("tablist");
    await expect.element(tabs).toBeVisible();
    expect(tabs.element().scrollWidth).toBeGreaterThan(tabs.element().clientWidth);
    tabs.element().scrollLeft = tabs.element().scrollWidth;
    await userEvent.click(page.getByRole("tab", {name: "Section 9"}));
    await expect.element(page.getByRole("tabpanel")).toHaveTextContent("Panel 9");
    expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
  });

  it("uses touch-sized close controls and readable phone fields", async () => {
    await page.viewport(320, 568);
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Form</DialogTitle>
          <DialogDescription>Edit details</DialogDescription>
          <Input aria-label="Name" />
          <Input size="sm" aria-label="Code" />
          <InputArea aria-label="Notes" />
        </DialogContent>
      </Dialog>
    );
    const close = page.getByRole("button", {name: "Close"});
    await expect.element(close).toBeVisible();
    expect(close.element().getBoundingClientRect().width).toBeGreaterThanOrEqual(44);
    expect(close.element().getBoundingClientRect().height).toBeGreaterThanOrEqual(44);
    for (const name of ["Name", "Code", "Notes"])
      expect(parseFloat(getComputedStyle(page.getByRole("textbox", {name}).element()).fontSize)).toBeGreaterThanOrEqual(16);
  });
});
