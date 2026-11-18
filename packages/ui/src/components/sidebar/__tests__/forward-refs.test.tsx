import {createRef, type ReactNode} from "react";
import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {describeForwardRefs} from "../../../../test/forward-ref";
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
  SidebarInset,
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

function Shell({children}: {children: ReactNode}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none">{children}</Sidebar>
    </SidebarProvider>
  );
}

function InMenu({children}: {children: ReactNode}) {
  return (
    <Shell>
      <SidebarMenu>
        <SidebarMenuItem>{children}</SidebarMenuItem>
      </SidebarMenu>
    </Shell>
  );
}

describeForwardRefs([
  {name: "SidebarProvider", component: SidebarProvider, element: (ref) => <SidebarProvider ref={ref} />, slot: "sidebar-wrapper"},
  {
    name: "Sidebar",
    component: Sidebar,
    element: (ref) => (
      <SidebarProvider>
        <Sidebar ref={ref} />
      </SidebarProvider>
    ),
    slot: "sidebar-container",
  },
  {
    name: "Sidebar",
    component: Sidebar,
    element: (ref) => (
      <SidebarProvider>
        <Sidebar ref={ref} collapsible="none" />
      </SidebarProvider>
    ),
    slot: "sidebar",
  },
  {
    name: "SidebarTrigger",
    component: SidebarTrigger,
    element: (ref) => (
      <SidebarProvider>
        <SidebarTrigger ref={ref} />
      </SidebarProvider>
    ),
    slot: "sidebar-trigger",
  },
  {
    name: "SidebarRail",
    component: SidebarRail,
    element: (ref) => (
      <SidebarProvider>
        <SidebarRail ref={ref} />
      </SidebarProvider>
    ),
    slot: "sidebar-rail",
  },
  {name: "SidebarInset", component: SidebarInset, element: (ref) => <SidebarInset ref={ref} />, slot: "sidebar-inset"},
  {
    name: "SidebarInput",
    component: SidebarInput,
    element: (ref) => (
      <Shell>
        <SidebarInput ref={ref} aria-label="Search" />
      </Shell>
    ),
    slot: "sidebar-input",
  },
  {
    name: "SidebarHeader",
    component: SidebarHeader,
    element: (ref) => (
      <Shell>
        <SidebarHeader ref={ref} />
      </Shell>
    ),
    slot: "sidebar-header",
  },
  {
    name: "SidebarFooter",
    component: SidebarFooter,
    element: (ref) => (
      <Shell>
        <SidebarFooter ref={ref} />
      </Shell>
    ),
    slot: "sidebar-footer",
  },
  {
    name: "SidebarSeparator",
    component: SidebarSeparator,
    element: (ref) => (
      <Shell>
        <SidebarSeparator ref={ref} />
      </Shell>
    ),
    slot: "sidebar-separator",
  },
  {
    name: "SidebarContent",
    component: SidebarContent,
    element: (ref) => (
      <Shell>
        <SidebarContent ref={ref} />
      </Shell>
    ),
    slot: "sidebar-content",
  },
  {
    name: "SidebarGroup",
    component: SidebarGroup,
    element: (ref) => (
      <Shell>
        <SidebarGroup ref={ref} />
      </Shell>
    ),
    slot: "sidebar-group",
  },
  {
    name: "SidebarGroupLabel",
    component: SidebarGroupLabel,
    element: (ref) => (
      <Shell>
        <SidebarGroup>
          <SidebarGroupLabel ref={ref}>General</SidebarGroupLabel>
        </SidebarGroup>
      </Shell>
    ),
    slot: "sidebar-group-label",
  },
  {
    name: "SidebarGroupAction",
    component: SidebarGroupAction,
    element: (ref) => (
      <Shell>
        <SidebarGroup>
          <SidebarGroupAction ref={ref} aria-label="Add" />
        </SidebarGroup>
      </Shell>
    ),
    slot: "sidebar-group-action",
  },
  {
    name: "SidebarGroupContent",
    component: SidebarGroupContent,
    element: (ref) => (
      <Shell>
        <SidebarGroup>
          <SidebarGroupContent ref={ref} />
        </SidebarGroup>
      </Shell>
    ),
    slot: "sidebar-group-content",
  },
  {
    name: "SidebarMenu",
    component: SidebarMenu,
    element: (ref) => (
      <Shell>
        <SidebarMenu ref={ref} />
      </Shell>
    ),
    slot: "sidebar-menu",
  },
  {
    name: "SidebarMenuItem",
    component: SidebarMenuItem,
    element: (ref) => (
      <Shell>
        <SidebarMenu>
          <SidebarMenuItem ref={ref} />
        </SidebarMenu>
      </Shell>
    ),
    slot: "sidebar-menu-item",
  },
  {
    name: "SidebarMenuButton",
    component: SidebarMenuButton,
    element: (ref) => (
      <InMenu>
        <SidebarMenuButton ref={ref}>Dashboard</SidebarMenuButton>
      </InMenu>
    ),
    slot: "sidebar-menu-button",
  },
  {
    name: "SidebarMenuButton",
    component: SidebarMenuButton,
    element: (ref) => (
      <InMenu>
        <SidebarMenuButton ref={ref} tooltip="Dashboard">
          Dashboard
        </SidebarMenuButton>
      </InMenu>
    ),
    slot: "sidebar-menu-button",
  },
  {
    name: "SidebarMenuAction",
    component: SidebarMenuAction,
    element: (ref) => (
      <InMenu>
        <SidebarMenuAction ref={ref} aria-label="More" />
      </InMenu>
    ),
    slot: "sidebar-menu-action",
  },
  {
    name: "SidebarMenuBadge",
    component: SidebarMenuBadge,
    element: (ref) => (
      <InMenu>
        <SidebarMenuBadge ref={ref}>3</SidebarMenuBadge>
      </InMenu>
    ),
    slot: "sidebar-menu-badge",
  },
  {
    name: "SidebarMenuSkeleton",
    component: SidebarMenuSkeleton,
    element: (ref) => (
      <InMenu>
        <SidebarMenuSkeleton ref={ref} />
      </InMenu>
    ),
    slot: "sidebar-menu-skeleton",
  },
  {
    name: "SidebarMenuSub",
    component: SidebarMenuSub,
    element: (ref) => (
      <InMenu>
        <SidebarMenuSub ref={ref} />
      </InMenu>
    ),
    slot: "sidebar-menu-sub",
  },
  {
    name: "SidebarMenuSubItem",
    component: SidebarMenuSubItem,
    element: (ref) => (
      <InMenu>
        <SidebarMenuSub>
          <SidebarMenuSubItem ref={ref} />
        </SidebarMenuSub>
      </InMenu>
    ),
    slot: "sidebar-menu-sub-item",
  },
  {
    name: "SidebarMenuSubButton",
    component: SidebarMenuSubButton,
    element: (ref) => (
      <InMenu>
        <SidebarMenuSub>
          <SidebarMenuSubItem>
            <SidebarMenuSubButton ref={ref} href="/profile">
              Profile
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </InMenu>
    ),
    slot: "sidebar-menu-sub-button",
  },
]);

describe("Sidebar on a narrow viewport", () => {
  it("forwards its ref to the sheet that holds the sidebar", () => {
    vi.stubGlobal("innerWidth", 500);
    const ref = createRef<HTMLDivElement>();
    render(
      <SidebarProvider>
        <SidebarTrigger />
        <Sidebar ref={ref} />
      </SidebarProvider>
    );
    fireEvent.click(screen.getByRole("button", {name: "Toggle Sidebar"}));
    expect(ref.current).toHaveAttribute("data-mobile", "true");
  });
});
