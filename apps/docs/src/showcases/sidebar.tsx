import {Badge} from "@rixl/ui/badge";
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
import type {ControlValue, Example} from "./registry";

export const path = "sidebar";
export const title = "Sidebar";
export const group = "Navigation";
export const description =
  "Navigation shell with offcanvas / icon / none collapsibility. Context provider tracks open state, mobile detection, and a Cmd/Ctrl+B shortcut. Renders a Sheet on mobile.";

export function Showcase() {
  return <SidebarPreview collapsible="offcanvas" />;
}

function SidebarPreview({collapsible}: {collapsible: "offcanvas" | "icon" | "none"}) {
  return (
    <div className="h-80 w-full overflow-hidden rounded-rixl-lg border border-rixl-border shadow-rixl-xs [transform:translateZ(0)]">
      <SidebarProvider defaultOpen className="h-full min-h-0">
        <Sidebar collapsible={collapsible} className="h-full">
          <SidebarHeader className="border-b border-rixl-sidebar-border px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-semibold text-rixl-sidebar-fg">Acme Inc</span>
              <Badge variant="secondary">Pro</Badge>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
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
          <SidebarFooter className="border-t border-rixl-sidebar-border p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Settings</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          {collapsible !== "none" ? <SidebarRail /> : null}
        </Sidebar>
        <SidebarInset>
          <div className="flex h-full flex-col">
            <header className="flex h-12 items-center gap-3 border-b border-rixl-border px-4">
              {collapsible !== "none" ? <SidebarTrigger /> : null}
              <span className="text-sm font-medium text-rixl-fg">Dashboard</span>
            </header>
            <div className="flex flex-1 items-center justify-center p-4 text-xs text-rixl-fg-muted">
              {collapsible === "none" ? "Static sidebar (collapsible='none')" : `Click the trigger or press ⌘B to toggle (${collapsible})`}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

function LiveExample({state}: {state: Record<string, ControlValue>}) {
  const collapsible = (state.collapsible as "offcanvas" | "icon" | "none") || "offcanvas";
  return <SidebarPreview key={collapsible} collapsible={collapsible} />;
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive shell",
    description: "Contained preview of SidebarProvider + Sidebar + SidebarInset. Switch collapsible modes live.",
    render: LiveExample,
    controls: [
      {
        name: "collapsible",
        label: "Collapsible",
        type: "select",
        options: [
          {value: "offcanvas", label: "Offcanvas"},
          {value: "icon", label: "Icon rail"},
          {value: "none", label: "None (static)"},
        ],
        defaultValue: "offcanvas",
      },
    ],
    code: `<SidebarProvider defaultOpen>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>Acme Inc</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>Overview</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
  </SidebarInset>
</SidebarProvider>`,
  },
];
