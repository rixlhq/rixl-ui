import {afterEach, describe, expect, it} from "vitest";
import {page} from "vitest/browser";
import {cleanup, render} from "@testing-library/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "../index";

afterEach(cleanup);

async function renderEverything() {
  await page.viewport(1280, 800);
  render(
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader>
          <SidebarInput aria-label="Search" />
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Group</SidebarGroupLabel>
            <SidebarGroupAction aria-label="Add" />
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton data-testid="with-action">Item</SidebarMenuButton>
                  <SidebarMenuAction aria-label="More" />
                  <SidebarMenuBadge>3</SidebarMenuBadge>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#">Sub</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton data-testid="without-action">Plain</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>Footer</SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}

describe("Sidebar slots", () => {
  it("marks every part with data-slot and none with data-sidebar", async () => {
    await renderEverything();
    expect(document.querySelectorAll("[data-sidebar]")).toHaveLength(0);
    expect(document.querySelectorAll("[data-slot^='sidebar-']").length).toBeGreaterThan(15);
  });

  it("gives a menu button end padding only when its item holds a menu action", async () => {
    await renderEverything();
    const padding = (id: string) => getComputedStyle(page.getByTestId(id).element()).paddingInlineEnd;
    expect(padding("with-action")).toBe("32px");
    expect(padding("without-action")).toBe("8px");
  });
});
