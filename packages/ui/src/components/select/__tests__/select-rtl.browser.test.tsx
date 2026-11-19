import {afterEach, describe, expect, it} from "vitest";
import {page, userEvent} from "vitest/browser";
import {cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../select";

afterEach(() => {
  cleanup();
  resetDirection();
});

async function renderSelect() {
  renderRtl(
    <div className="p-8">
      <Select defaultValue="apple">
        <SelectTrigger aria-label="Fruit" className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
  await expect.element(page.getByRole("combobox", {name: "Fruit"})).toBeVisible();
}

describe("Select in RTL", () => {
  it("puts the chevron on the left of the trigger, after the value", async () => {
    await renderSelect();
    const trigger = page.getByRole("combobox", {name: "Fruit"}).element();
    const chevron = trigger.querySelector("svg")!.getBoundingClientRect();
    const bounds = trigger.getBoundingClientRect();
    expect(chevron.left - bounds.left).toBeLessThan(bounds.right - chevron.right);
  });

  it("has no axe violations with the list open", async () => {
    await renderSelect();
    await userEvent.click(page.getByRole("combobox", {name: "Fruit"}));
    await expect.element(page.getByRole("option", {name: "Banana"})).toBeVisible();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
