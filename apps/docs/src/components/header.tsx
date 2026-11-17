import {useEffect, useRef} from "react";
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
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === searchRef.current) {
        onQueryChange("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onQueryChange]);
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
        <div className="docs-search">
          <Input
            ref={searchRef}
            aria-label="Search components"
            inputSize="sm"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search components"
            startIcon={<SearchIcon />}
          />
          <kbd aria-hidden="true">⌘ K</kbd>
        </div>
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
