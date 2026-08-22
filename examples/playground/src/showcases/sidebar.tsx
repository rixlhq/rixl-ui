import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@rixl/ui/sidebar";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "sidebar";
export const title = "Sidebar";
export const group = "Navigation";
export const description =
  "Navigation shell with offcanvas / icon / none collapsibility. Context provider tracks open state, mobile detection, and a Cmd/Ctrl+B shortcut. Renders a Sheet on mobile.";

export function Showcase() {
  return (
    <div className="w-full overflow-hidden rounded-rixl-lg border border-rixl-border shadow-rixl-xs">
      <SidebarProvider defaultOpen>
        <Sidebar collapsible="offcanvas">
          <SidebarHeader className="border-b border-rixl-sidebar-border p-4">
            <span className="text-sm font-semibold text-rixl-sidebar-fg">Acme Inc</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>Overview</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Projects</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <div className="flex h-full flex-col">
            <header className="flex h-12 items-center gap-3 border-b border-rixl-border px-4">
              <SidebarTrigger />
              <span className="text-sm font-medium text-rixl-fg">Dashboard</span>
            </header>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

function FullShellExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Full shell (provider + trigger + menu)">
      <div className="w-full overflow-hidden rounded-rixl-lg border border-rixl-border shadow-rixl-xs">
        <SidebarProvider defaultOpen>
          <Sidebar collapsible="offcanvas">
            <SidebarHeader className="border-b border-rixl-sidebar-border p-4">
              <span className="text-sm font-semibold text-rixl-sidebar-fg">Acme Inc</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>Overview</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Projects</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Billing</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Settings</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
          <SidebarInset>
            <div className="flex h-full flex-col">
              <header className="flex h-12 items-center gap-3 border-b border-rixl-border px-4">
                <SidebarTrigger />
                <span className="text-sm font-medium text-rixl-fg">Dashboard</span>
              </header>
              <main className="flex flex-1 items-center justify-center text-sm text-rixl-fg-muted">
                Collapse via Cmd/Ctrl+B or the trigger
              </main>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </Group>
  );
}

function VariantsExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Collapsible variants">
      <p className="text-sm text-rixl-fg-muted">
        <code className="rounded-rixl-md bg-rixl-surface-muted px-1.5 py-0.5 text-xs">
          offcanvas
        </code>
        , <code className="rounded-rixl-md bg-rixl-surface-muted px-1.5 py-0.5 text-xs">icon</code>,
        and{" "}
        <code className="rounded-rixl-md bg-rixl-surface-muted px-1.5 py-0.5 text-xs">none</code>{" "}
        are supported.
      </p>
    </Group>
  );
}

export const examples: Example[] = [
  { id: "full", title: "Full shell", render: FullShellExample },
  { id: "variants", title: "Collapsible variants", render: VariantsExample },
];
