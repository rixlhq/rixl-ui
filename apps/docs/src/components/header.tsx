import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@rixl/ui/breadcrumb";
import {Separator} from "@rixl/ui/separator";
import {SidebarTrigger} from "@rixl/ui/sidebar";
import {Tabs, TabsList, TabsTrigger} from "@rixl/ui/tabs";
import {ComponentSearch} from "./component-search";
import type {Theme} from "../hooks/use-theme";
import type {Showcase} from "../showcases/registry";
import {MonitorIcon, MoonIcon, SunIcon} from "./icons";

export function Header({theme, onThemeChange, active}: {theme: Theme; onThemeChange: (next: Theme) => void; active: Showcase | null}) {
  return (
    <header className="docs-header">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger aria-label="Toggle sidebar" />
        <Separator orientation="vertical" className="h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {active ? <BreadcrumbLink href="#/">Components</BreadcrumbLink> : <BreadcrumbPage>Components</BreadcrumbPage>}
            </BreadcrumbItem>
            {active ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{active.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : null}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <ComponentSearch />
        <ThemeToggle theme={theme} onChange={onThemeChange} />
      </div>
    </header>
  );
}

function ThemeToggle({theme, onChange}: {theme: Theme; onChange: (next: Theme) => void}) {
  return (
    <Tabs
      value={theme}
      onValueChange={(value) => {
        if (value === "light" || value === "dark" || value === "system") onChange(value);
      }}
      variant="segmented"
      size="sm"
    >
      <TabsList aria-label="Theme">
        <TabsTrigger value="system" aria-label="System theme">
          <MonitorIcon />
        </TabsTrigger>
        <TabsTrigger value="light" aria-label="Light theme">
          <SunIcon />
        </TabsTrigger>
        <TabsTrigger value="dark" aria-label="Dark theme">
          <MoonIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
