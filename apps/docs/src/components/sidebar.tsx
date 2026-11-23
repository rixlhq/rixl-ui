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
import type {Showcase} from "../showcases/registry";

export const AppSidebar = memo(function AppSidebar({showcases, activePath}: {showcases: Showcase[]; activePath?: string}) {
  const {setOpenMobile} = useSidebar();
  const [components, providers] = useMemo(() => {
    const sorted = [...showcases].sort((a, b) => a.title.localeCompare(b.title));
    return [sorted.filter((s) => !s.group), sorted.filter((s) => s.group === "providers")];
  }, [showcases]);

  return (
    <Sidebar collapsible="offcanvas" aria-label="Components">
      <SidebarHeader className="docs-brand">
        <a href="#/" className="flex items-center justify-between gap-2 text-rixl-sidebar-fg">
          <div className="flex items-center gap-2.5">
            <span className="flex size-6 items-center justify-center rounded-sm bg-rixl-primary text-xs font-bold text-rixl-primary-fg">
              R
            </span>
            <span className="text-sm font-semibold tracking-tight">Rixl UI</span>
          </div>
          <Badge variant="secondary">{components.length}</Badge>
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

        <NavGroup label="Components" items={components} activePath={activePath} onNavigate={() => setOpenMobile(false)} />
        <NavGroup label="Providers" items={providers} activePath={activePath} onNavigate={() => setOpenMobile(false)} />
      </SidebarContent>

      <SidebarFooter className="docs-sidebar-footer">
        <p className="text-xs text-rixl-fg-muted">React · Base UI · Tailwind CSS</p>
      </SidebarFooter>
      <SidebarRail aria-label="Toggle sidebar" />
    </Sidebar>
  );
});

function NavGroup({label, items, activePath, onNavigate}: {label: string; items: Showcase[]; activePath?: string; onNavigate: () => void}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
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
                    onClick={onNavigate}
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
  );
}
