import {afterEach, describe, expect, it} from "vitest";
import {page, userEvent} from "vitest/browser";
import {cleanup} from "@testing-library/react";
import {axeViolations} from "../../../../test/a11y";
import {renderRtl, resetDirection} from "../../../../test/rtl";
import {Sidebar, SidebarContent, SidebarProvider, SidebarTrigger} from "../index";

afterEach(async () => {
  cleanup();
  resetDirection();
  await page.viewport(1280, 720);
});

async function openMobile(side: "left" | "right") {
  await page.viewport(320, 320);
  renderRtl(
    <SidebarProvider>
      <Sidebar side={side} aria-label="Navigation">
        <SidebarContent>Nav</SidebarContent>
      </Sidebar>
      <SidebarTrigger aria-label="Toggle sidebar" />
    </SidebarProvider>
  );
  await userEvent.click(page.getByRole("button", {name: "Toggle sidebar"}));
  const panel = page.getByRole("dialog");
  await expect.element(panel).toBeVisible();
  return panel.element();
}

describe("Sidebar in RTL", () => {
  it("puts the start mobile panel on the right edge, flush with the viewport", async () => {
    const panel = await openMobile("left");
    await expect.poll(() => Math.round(panel.getBoundingClientRect().right) - window.innerWidth).toBe(0);
  });

  it("puts the end mobile panel on the left edge, flush with the viewport", async () => {
    const panel = await openMobile("right");
    await expect.poll(() => Math.round(panel.getBoundingClientRect().left)).toBe(0);
  });

  it("draws the start panel's separator on its left, the side facing the page", async () => {
    const panel = await openMobile("left");
    const style = getComputedStyle(panel);
    expect([style.borderLeftWidth, style.borderRightWidth]).toEqual(["1px", "0px"]);
  });

  it("opens a start desktop panel on the right edge", async () => {
    await page.viewport(1280, 800);
    renderRtl(
      <SidebarProvider>
        <Sidebar side="left" aria-label="Navigation">
          <SidebarContent>Nav</SidebarContent>
        </Sidebar>
      </SidebarProvider>
    );
    const container = document.querySelector("[data-slot='sidebar-container']")!;
    expect(Math.round(container.getBoundingClientRect().right) - window.innerWidth).toBe(0);
  });

  it("has no axe violations with the mobile panel open", async () => {
    await openMobile("left");
    expect(await axeViolations(document.body)).toEqual([]);
  });
});
