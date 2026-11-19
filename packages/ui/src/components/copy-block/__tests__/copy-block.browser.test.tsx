import {afterEach, describe, expect, it, vi} from "vitest";
import {page, userEvent} from "vitest/browser";
import {cleanup, render} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {CopyBlock} from "../copy-block";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("CopyBlock Browser Mode", () => {
  it("shows the tooltip text on hover and the copied text after a click, with no axe violations", async () => {
    vi.stubGlobal("navigator", {...navigator, clipboard: {writeText: () => Promise.resolve()}});
    render(
      <div className="p-12">
        <CopyBlock title="Token" text="abc" tooltip={{text: "Copy", copiedText: "Copied!"}} />
      </div>
    );
    const button = page.getByRole("button", {name: "Copy to clipboard"});
    await userEvent.hover(button);
    await expect.element(page.getByText("Copy", {exact: true})).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
    await userEvent.click(button);
    await expect.element(page.getByText("Copied!", {exact: true}).first()).toBeVisible();
  });

  it("has no axe violations without a tooltip", async () => {
    render(<CopyBlock title="Token" text="abc" />);
    await expect.element(page.getByRole("button", {name: "Copy to clipboard"})).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });

  it("has no axe violations masked or revealed, and the reveal button swaps the content", async () => {
    render(<CopyBlock title="Token" text="abc" masked />);
    await expect.element(page.getByRole("button", {name: "Reveal value"})).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
    await userEvent.click(page.getByRole("button", {name: "Reveal value"}));
    await expect.element(page.getByText("abc", {exact: true})).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
