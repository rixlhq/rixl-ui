import {afterEach, describe, expect, it} from "vitest";
import {page} from "vitest/browser";
import {cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {InputGroup, InputGroupAddon, InputGroupInput} from "../index";

afterEach(() => {
  cleanup();
  resetDirection();
});

function renderGroup() {
  renderRtl(
    <InputGroup aria-label="Price">
      <InputGroupAddon data-testid="start">$</InputGroupAddon>
      <InputGroupInput aria-label="Amount" />
      <InputGroupAddon align="end" data-testid="end">
        USD
      </InputGroupAddon>
    </InputGroup>
  );
}

describe("InputGroup in RTL", () => {
  it("puts the start addon on the right and the end addon on the left of the input", async () => {
    renderGroup();
    await expect.element(page.getByRole("textbox", {name: "Amount"})).toBeVisible();
    const input = page.getByRole("textbox", {name: "Amount"}).element().getBoundingClientRect();
    expect(page.getByTestId("start").element().getBoundingClientRect().left).toBeGreaterThanOrEqual(input.right - 1);
    expect(page.getByTestId("end").element().getBoundingClientRect().right).toBeLessThanOrEqual(input.left + 1);
  });

  it("has no axe violations", async () => {
    renderGroup();
    await expect.element(page.getByRole("textbox", {name: "Amount"})).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
