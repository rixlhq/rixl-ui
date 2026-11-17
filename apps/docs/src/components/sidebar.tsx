import {memo, useMemo} from "react";
import {Badge} from "@rixl/ui/badge";
import {
  Sidebar,
  useSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@rixl/ui/sidebar";
import {matchesShowcase} from "../hooks/use-hash-route";
import type {Showcase} from "../showcases/registry";

export const AppSidebar = memo(function AppSidebar({
  showcases,
  query,
  activePath,
}: {
  showcases: Showcase[];
  query: string;
  activePath?: string;
}) {
  const {setOpenMobile} = useSidebar();
  const filtered = useMemo(() => showcases.filter((s) => matchesShowcase(s, query)), [showcases, query]);
  const items = useMemo(() => [...filtered].sort((a, b) => a.title.localeCompare(b.title)), [filtered]);

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="docs-brand">
        <a href="#/" className="flex items-center justify-between gap-2 text-rixl-sidebar-fg">
          <div className="flex items-center gap-2.5">
            <span className="flex size-6 items-center justify-center rounded-rixl-sm bg-rixl-primary text-xs font-bold text-rixl-primary-fg">
              R
            </span>
            <span className="text-sm font-semibold tracking-tight">Rixl UI</span>
          </div>
          <Badge variant="secondary">{showcases.length}</Badge>
        </a>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={!activePath}
                  render={
                    <a
                      href="#/"
                      aria-label="Overview"
                      aria-current={!activePath ? "page" : undefined}
                      onClick={() => setOpenMobile(false)}
                    />
                  }
                >
                  Overview
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((s) => (
                <SidebarMenuItem key={s.path}>
                  <SidebarMenuButton
                    isActive={s.path === activePath}
                    render={
                      <a
                        href={`#/${s.path}`}
                        aria-label={s.title}
                        aria-current={s.path === activePath ? "page" : undefined}
                        onClick={() => setOpenMobile(false)}
                      />
                    }
                  >
                    {s.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="docs-sidebar-footer">
        <p className="text-xs text-rixl-fg-muted">React · Base UI · Tailwind CSS</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
});
