import { memo, useMemo } from "react";
import { Badge } from "@rixl/ui/badge";
import {
  Sidebar,
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
import { groupShowcasesByCategory, matchesShowcase } from "../hooks/use-hash-route";
import type { Showcase } from "../showcases/registry";

export const AppSidebar = memo(function AppSidebar({
  showcases,
  query,
  activePath,
}: {
  showcases: Showcase[];
  query: string;
  activePath?: string;
}) {
  const filtered = useMemo(
    () => showcases.filter((s) => matchesShowcase(s, query)),
    [showcases, query],
  );
  const groups = useMemo(() => groupShowcasesByCategory(filtered), [filtered]);

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b border-rixl-sidebar-border px-4 py-3.5">
        <a href="#/" className="flex items-center justify-between gap-2 text-rixl-sidebar-fg">
          <div className="flex items-center gap-2.5">
            <span className="flex size-6 items-center justify-center rounded-rixl-sm bg-rixl-primary text-xs font-bold text-rixl-primary-fg">
              R
            </span>
            <span className="text-sm font-semibold tracking-tight">Rixl Studio</span>
          </div>
          <Badge variant="secondary">{showcases.length}</Badge>
        </a>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={!activePath} render={<a href="#/" />}>
                  Overview
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {groups.map(([group, items]) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel>{group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((s) => (
                  <SidebarMenuItem key={s.path}>
                    <SidebarMenuButton
                      isActive={s.path === activePath}
                      render={<a href={`#/${s.path}`} />}
                    >
                      {s.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-rixl-sidebar-border px-4 py-3">
        <p className="text-xs text-rixl-fg-muted">@rixl/ui workspace</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
});
