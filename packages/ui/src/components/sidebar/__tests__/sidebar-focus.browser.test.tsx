import {afterEach, describe, expect, it} from "vitest";
import {page, userEvent} from "vitest/browser";
import {cleanup, render} from "@testing-library/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "../index";

afterEach(cleanup);

const FOCUSABLES = ["group-label", "group-action", "menu-button", "menu-action", "sub-button"] as const;

async function renderSidebar() {
  await page.viewport(1280, 800);
  render(
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel render={<button type="button" data-testid="group-label" />}>Group</SidebarGroupLabel>
            <SidebarGroupAction data-testid="group-action" aria-label="Add" />
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton data-testid="menu-button">Item</SidebarMenuButton>
                  <SidebarMenuAction data-testid="menu-action" aria-label="More" />
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#" data-testid="sub-button">
                        Sub
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

/** The spread ring among a box-shadow's layers: its colour and its width in px. */
function spreadRing(boxShadow: string) {
  const match = boxShadow.match(/([a-z]+\([^)]*\)) 0px 0px 0px ((?!0px)[\d.]+)px/);
  return match ? {color: match[1], width: Number(match[2])} : undefined;
}

/** The computed colour of a token, serialised the way a box-shadow colour is. */
function tokenColor(token: string) {
  const probe = document.createElement("div");
  probe.style.color = `var(${token})`;
  document.body.append(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
}

describe("Sidebar focus ring", () => {
  it.each(["light", "dark"] as const)("draws a 2px ring in --rixl-sidebar-ring on every focusable part (%s)", async (theme) => {
    document.documentElement.dataset.theme = theme;
    await renderSidebar();
    const expectedColor = tokenColor("--rixl-sidebar-ring");
    for (const id of FOCUSABLES) {
      await userEvent.tab();
      const element = page.getByTestId(id).element();
      expect(element).toHaveFocus();
      // The ring transitions in on some parts; measure it once it has settled.
      await Promise.all(element.getAnimations().map((animation) => animation.finished));
      expect({id, ring: spreadRing(getComputedStyle(element).boxShadow)}).toEqual({id, ring: {color: expectedColor, width: 2}});
    }
    delete document.documentElement.dataset.theme;
  });
});
