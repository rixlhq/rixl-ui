import {describe, it, expect} from "vitest";
import {act, render, screen} from "@testing-library/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
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
} from "../index";

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
          <SidebarTrigger data-testid="trigger" aria-label="Toggle Sidebar" />
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

  it("uses logical layout classes in RTL", () => {
    render(
      <div dir="rtl">
        <Shell />
      </div>
    );
    expect(document.querySelector("[data-slot='sidebar-container']")?.className).toContain("start-0");
    expect(screen.getByTestId("menu-button").className).toContain("text-start");
    expect(document.querySelector("[data-slot='sidebar-inset']")?.className).toContain("ms-0");
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
          <SidebarTrigger data-testid="trigger" aria-label="Toggle Sidebar" />
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

  it("uses tokenized press scale and reduced-motion fallback on menu and sub-menu buttons", () => {
    render(<Shell />);
    const menuBtnCls = screen.getByTestId("menu-button").className;
    const subBtnCls = screen.getByTestId("sub-button").className;
    expect(menuBtnCls).toContain("active:scale-[var(--rixl-press-scale)]");
    expect(menuBtnCls).toContain("motion-reduce:active:scale-100");
    expect(menuBtnCls).not.toContain("will-change-transform");
    expect(subBtnCls).toContain("active:scale-[var(--rixl-press-scale)]");
    expect(subBtnCls).toContain("motion-reduce:active:scale-100");
    expect(subBtnCls).not.toContain("will-change-transform");
  });

  it("uses CSS variables directly (not wrapped in hsl()) for the outline menu button variant", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton variant="outline" data-testid="outline-btn">
                Outline
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Sidebar>
      </SidebarProvider>
    );
    const cls = screen.getByTestId("outline-btn").className;
    expect(cls).toContain("shadow-[0_0_0_1px_var(--rixl-sidebar-border)]");
    expect(cls).not.toContain("hsl(");
  });

  it("paints the desktop edge in the sidebar-border token, not the text color", () => {
    render(<Shell />);
    const cls = document.querySelector("[data-slot='sidebar-container']")?.className ?? "";
    expect(cls).toContain("group-data-[side=left]:border-e");
    expect(cls).toContain("border-rixl-sidebar-border");
  });

  it("paints the right-side desktop edge in the same token", () => {
    render(
      <SidebarProvider>
        <Sidebar side="right">
          <SidebarContent>Nav</SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div>Content</div>
        </SidebarInset>
      </SidebarProvider>
    );
    const cls = document.querySelector("[data-slot='sidebar-container']")?.className ?? "";
    expect(cls).toContain("group-data-[side=right]:border-s");
    expect(cls).toContain("border-rixl-sidebar-border");
  });

  it("gives the nav a thin tokenized scrollbar with a stable gutter", () => {
    render(<Shell />);
    const cls = document.querySelector("[data-slot='sidebar-content']")?.className ?? "";
    expect(cls).toContain("[scrollbar-width:thin]");
    expect(cls).toContain("[scrollbar-color:var(--rixl-border-strong)_transparent]");
    expect(cls).toContain("[scrollbar-gutter:stable]");
    expect(cls).toContain("[&::-webkit-scrollbar]:w-2");
    expect(cls).toContain("[&::-webkit-scrollbar-track]:bg-transparent");
    expect(cls).toContain("[&::-webkit-scrollbar-thumb]:bg-rixl-border-strong");
    expect(cls).toContain("[&::-webkit-scrollbar-thumb:hover]:bg-rixl-fg-subtle");
    expect(cls).not.toContain("scroll-smooth");
  });

  it("fades the group label on the sidebar motion tokens, in step with the collapse", () => {
    render(<Shell />);
    const cls = screen.getByTestId("group-label").className;
    expect(cls).toContain("duration-sidebar");
    expect(cls).toContain("ease-curve-sidebar");
    expect(cls).not.toContain("duration-200");
    expect(cls).not.toContain("ease-linear");
  });

  it("does not declare a transform transition on the group action, which has no transform to animate", () => {
    render(<SidebarGroupAction data-testid="group-action">+</SidebarGroupAction>);
    expect(screen.getByTestId("group-action").className).not.toContain("transition-transform");
  });
});
