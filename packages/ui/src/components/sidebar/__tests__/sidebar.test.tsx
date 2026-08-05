import {describe, it, expect} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../sidebar";

function Shell() {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader data-testid="header">Header</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel data-testid="group-label">General</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton data-testid="menu-button" isActive>
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    Settings
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton data-testid="sub-button">Profile</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main>
          <SidebarTrigger data-testid="trigger" />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function Outside() {
  const {state, toggleSidebar} = useSidebar();
  return (
    <div data-testid="outside" data-state={state}>
      <button type="button" onClick={toggleSidebar} data-testid="toggle">
        toggle
      </button>
    </div>
  );
}

describe("Sidebar", () => {
  it("sets data-slot markers on the shell", () => {
    render(<Shell />);
    expect(document.querySelector("[data-slot='sidebar']")).toHaveAttribute("data-slot", "sidebar");
    expect(screen.getByTestId("header")).toHaveAttribute("data-slot", "sidebar-header");
    expect(screen.getByTestId("group-label")).toHaveAttribute("data-slot", "sidebar-group-label");
    expect(screen.getByTestId("menu-button")).toHaveAttribute("data-slot", "sidebar-menu-button");
    expect(screen.getByTestId("sub-button")).toHaveAttribute("data-slot", "sidebar-menu-sub-button");
  });

  it("applies rixl sidebar tokens to the shell", () => {
    render(<Shell />);
    const shell = document.querySelector("[data-slot='sidebar-inner']")!;
    expect(shell.className).toContain("bg-rixl-sidebar");
  });

  it("marks an active menu button via data-active", () => {
    render(<Shell />);
    expect(screen.getByTestId("menu-button")).toHaveAttribute("data-active");
  });

  it("marks an active sub-button via data-active", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuSubButton isActive data-testid="sub-active">
                Profile
              </SidebarMenuSubButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Sidebar>
      </SidebarProvider>
    );
    expect(screen.getByTestId("sub-active")).toHaveAttribute("data-active");
  });

  it("renders SidebarMenuSubButton as an anchor", () => {
    render(<Shell />);
    expect(screen.getByTestId("sub-button").tagName).toBe("A");
  });

  it("defaults to the expanded state", () => {
    render(
      <SidebarProvider>
        <Outside />
      </SidebarProvider>
    );
    expect(screen.getByTestId("outside")).toHaveAttribute("data-state", "expanded");
  });

  it("toggles to collapsed on trigger click", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarTrigger data-testid="trigger" />
        </Sidebar>
      </SidebarProvider>
    );
    act(() => screen.getByTestId("trigger").click());
    expect(document.querySelector("[data-slot='sidebar']")).toHaveAttribute("data-state", "collapsed");
  });

  it("exposes sidebarMenuButtonVariants for className merging", () => {
    render(<Shell />);
    const cls = screen.getByTestId("menu-button").className;
    expect(cls).toContain("rounded-rixl-md");
  });
});
