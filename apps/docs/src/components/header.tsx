import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@rixl/ui/breadcrumb";
import {Input} from "@rixl/ui/input";
import {Separator} from "@rixl/ui/separator";
import {SidebarTrigger} from "@rixl/ui/sidebar";
import {Tabs, TabsList, TabsTrigger} from "@rixl/ui/tabs";
import type {Theme} from "../hooks/use-theme";
import type {Showcase} from "../showcases/registry";
import {MonitorIcon, MoonIcon, SearchIcon, SunIcon} from "./icons";

export function Header({
  theme,
  onThemeChange,
  query,
  onQueryChange,
  active,
}: {
  theme: Theme;
  onThemeChange: (next: Theme) => void;
  query: string;
  onQueryChange: (value: string) => void;
  active: Showcase | null;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 sm:gap-4 border-b border-rixl-border bg-rixl-bg/85 px-4 sm:px-6 backdrop-blur-md lg:px-10">
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
                <BreadcrumbItem className="hidden sm:inline-flex">
                  <span className="text-rixl-fg-muted">{active.group}</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:inline-flex" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{active.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : null}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-28 xs:w-36 sm:w-64">
          <Input
            inputSize="sm"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search components…"
            startIcon={<SearchIcon />}
          />
        </div>
        <ThemeToggle theme={theme} onChange={onThemeChange} />
      </div>
    </header>
  );
}

function ThemeToggle({theme, onChange}: {theme: Theme; onChange: (next: Theme) => void}) {
  return (
    <Tabs value={theme} onValueChange={(value) => onChange(value as Theme)} variant="segmented" size="sm">
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
