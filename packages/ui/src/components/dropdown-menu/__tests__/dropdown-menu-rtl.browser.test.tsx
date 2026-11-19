import {afterEach, describe, expect, it} from "vitest";
import {page, userEvent} from "vitest/browser";
import {cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../index";

afterEach(() => {
  cleanup();
  resetDirection();
});

function renderMenu() {
  renderRtl(
    <div className="p-8">
      <DropdownMenu>
        <DropdownMenuTrigger render={<button type="button">Options</button>} />
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Nested</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

async function openSubmenu() {
  renderMenu();
  await userEvent.click(page.getByRole("button", {name: "Options"}));
  await userEvent.click(page.getByRole("menuitem", {name: "More"}));
  await expect.element(page.getByRole("menuitem", {name: "Nested"})).toBeVisible();
}

describe("DropdownMenu in RTL", () => {
  it("opens the sub-menu on the left of its trigger", async () => {
    await openSubmenu();
    const trigger = page.getByRole("menuitem", {name: "More"}).element().getBoundingClientRect();
    const nested = page.getByRole("menuitem", {name: "Nested"}).element().getBoundingClientRect();
    expect(nested.right).toBeLessThanOrEqual(trigger.left + 1);
  });

  it("puts the sub-menu chevron at the left of its trigger and mirrors it", async () => {
    await openSubmenu();
    const trigger = page.getByRole("menuitem", {name: "More"}).element();
    const chevron = trigger.querySelector("svg")!;
    expect(chevron.getBoundingClientRect().left - trigger.getBoundingClientRect().left).toBeLessThan(
      trigger.getBoundingClientRect().right - chevron.getBoundingClientRect().right
    );
    expect(getComputedStyle(chevron).scale).toBe("-1 1");
  });

  it("opens the sub-menu with ArrowLeft and closes it with ArrowRight", async () => {
    renderMenu();
    await userEvent.click(page.getByRole("button", {name: "Options"}));
    page.getByRole("menuitem", {name: "More"}).element().focus();
    await userEvent.keyboard("{ArrowLeft}");
    await expect.element(page.getByRole("menuitem", {name: "Nested"})).toBeVisible();
    await userEvent.keyboard("{ArrowRight}");
    await expect.element(page.getByRole("menuitem", {name: "Nested"})).not.toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    await openSubmenu();
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
