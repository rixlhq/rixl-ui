import { memo, useDeferredValue, useEffect, useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { Badge } from "@rixl/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@rixl/ui/breadcrumb";
import { Button } from "@rixl/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@rixl/ui/card";
import { EmptyState } from "@rixl/ui/empty-state";
import { Input } from "@rixl/ui/input";
import { Label } from "@rixl/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@rixl/ui/select";
import { Separator } from "@rixl/ui/separator";
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
import { Switch } from "@rixl/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@rixl/ui/tabs";
import { Toaster } from "@rixl/ui/toaster";
import { Tooltip, TooltipContent, TooltipTrigger } from "@rixl/ui/tooltip";
import {
  showcases,
  type Control,
  type ControlValue,
  type Example,
  type Showcase,
} from "./showcases/registry";

type Theme = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "rixl-ui-playground-theme";

function getInitialTheme(): Theme {
  if (typeof localStorage === "undefined") return "system";
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
}

/**
 * Rixl Studio — component playground built entirely from @rixl/ui primitives.
 */
export function App() {
  const [theme, setTheme] = useTheme();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const active = useHashRoute(showcases);
  const isHome = active === null;

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar showcases={showcases} query={deferredQuery} activePath={active?.path} />
      <SidebarInset>
        <Header
          theme={theme}
          onThemeChange={setTheme}
          query={query}
          onQueryChange={setQuery}
          active={active}
        />
        <div className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-10">
          {isHome ? (
            <HomeGrid
              showcases={showcases}
              query={deferredQuery}
              onClearQuery={() => setQuery("")}
            />
          ) : (
            <Detail showcase={active} />
          )}
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}

// ── header ────────────────────────────────────────────────────

function Header({
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
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-rixl-border bg-rixl-bg/85 px-6 backdrop-blur-md lg:px-10">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger aria-label="Toggle sidebar" />
        <Separator orientation="vertical" className="h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {active ? (
                <BreadcrumbLink href="#/">Components</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>Components</BreadcrumbPage>
              )}
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

      <div className="flex items-center gap-3">
        <div className="w-44 sm:w-64">
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

function ThemeToggle({ theme, onChange }: { theme: Theme; onChange: (next: Theme) => void }) {
  return (
    <Tabs
      value={theme}
      onValueChange={(value) => onChange(value as Theme)}
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

// ── sidebar ───────────────────────────────────────────────────

function AppSidebar({
  showcases,
  query,
  activePath,
}: {
  showcases: Showcase[];
  query: string;
  activePath?: string;
}) {
  const filtered = useMemo(() => showcases.filter((s) => matches(s, query)), [showcases, query]);
  const groups = useMemo(() => groupByCategory(filtered), [filtered]);

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
}

// ── home grid ─────────────────────────────────────────────────

function HomeGrid({
  showcases,
  query,
  onClearQuery,
}: {
  showcases: Showcase[];
  query: string;
  onClearQuery: () => void;
}) {
  const filtered = useMemo(() => showcases.filter((s) => matches(s, query)), [showcases, query]);

  if (filtered.length === 0) {
    return (
      <EmptyState
        title="No components found"
        description={`No components matched "${query}". Try a different search term.`}
        action={{ label: "Clear search", onClick: onClearQuery }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-rixl-fg">Components</h1>
          <p className="mt-1 text-sm text-rixl-fg-muted">
            Live primitives rendered directly from <code className="text-rixl-fg">@rixl/ui</code>{" "}
            workspace source.
          </p>
        </div>
        <Badge variant="outline">
          {filtered.length} {filtered.length === 1 ? "component" : "components"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s) => (
          <ComponentCard key={s.path} showcase={s} />
        ))}
      </div>
    </div>
  );
}

const ComponentCard = memo(function ComponentCard({ showcase }: { showcase: Showcase }) {
  return (
    <Card
      interactive
      onClick={() => {
        window.location.hash = `#/${showcase.path}`;
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.location.hash = `#/${showcase.path}`;
        }
      }}
      role="link"
      tabIndex={0}
      className="justify-between gap-4 py-5"
    >
      <CardHeader className="px-5">
        <CardTitle className="text-base">{showcase.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs">
          {showcase.description ?? `${showcase.title} component`}
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">{showcase.group}</Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="px-5">
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="presentation"
          className="flex min-h-28 w-full items-center justify-center overflow-hidden rounded-rixl-lg border border-rixl-border bg-rixl-bg p-4"
        >
          <PreviewThumbnail showcase={showcase} />
        </div>
      </CardContent>
    </Card>
  );
});

function PreviewThumbnail({ showcase }: { showcase: Showcase }) {
  // Sidebar's full shell is too large for a small grid thumbnail; render a compact summary badge.
  if (showcase.path === "sidebar") {
    return <Badge variant="outline">App shell · ⌘B</Badge>;
  }
  const Preview = showcase.Showcase;
  return <Preview />;
}

// ── detail ────────────────────────────────────────────────────

function Detail({ showcase }: { showcase: Showcase }) {
  const examples = useMemo<Example[]>(() => {
    if (showcase.examples && showcase.examples.length > 0) return showcase.examples;
    const Legacy: ComponentType<{
      state: Record<string, ControlValue>;
      children?: ReactNode;
    }> = () => <showcase.Showcase />;
    return [{ id: "default", title: "Preview", render: Legacy }];
  }, [showcase]);

  return (
    <div className="space-y-8">
      <div className="space-y-2 border-b border-rixl-border pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{showcase.group}</Badge>
          <code className="text-xs text-rixl-fg-muted">@rixl/ui/{showcase.path}</code>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-rixl-fg">{showcase.title}</h1>
        {showcase.description ? (
          <p className="max-w-3xl text-sm leading-relaxed text-rixl-fg-muted">
            {showcase.description}
          </p>
        ) : null}
      </div>

      <div className="space-y-6">
        {examples.map((example) => (
          <ExampleCard key={example.id} example={example} />
        ))}
      </div>
    </div>
  );
}

function ExampleCard({ example }: { example: Example }) {
  const [mode, setMode] = useState<"preview" | "code">("preview");
  const hasCode = Boolean(example.code?.trim());
  const [state, setState] = useState<Record<string, ControlValue>>(() =>
    defaultState(example.controls),
  );
  const Render = example.render;

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardHeader className="border-b border-rixl-border px-5 py-3.5 [.border-b]:pb-3.5">
        <CardTitle className="text-sm">{example.title}</CardTitle>
        {example.description ? (
          <CardDescription className="text-xs">{example.description}</CardDescription>
        ) : null}
        {hasCode ? (
          <CardAction>
            <Tabs
              value={mode}
              onValueChange={(value) => setMode(value as "preview" | "code")}
              variant="segmented"
              size="sm"
            >
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardAction>
        ) : null}
      </CardHeader>

      {example.controls && mode === "preview" ? (
        <div className="flex flex-wrap items-center gap-5 border-b border-rixl-border bg-rixl-surface-muted/50 px-5 py-3">
          {example.controls.map((control) => (
            <ControlField key={control.name} control={control} state={state} onChange={setState} />
          ))}
        </div>
      ) : null}

      <CardContent className="p-6">
        {mode === "preview" ? (
          <Render state={state} />
        ) : hasCode ? (
          <div className="relative">
            <pre className="overflow-x-auto rounded-rixl-md border border-rixl-border bg-rixl-bg p-4 font-mono text-xs leading-relaxed text-rixl-fg">
              {example.code}
            </pre>
            <CopyButton text={example.code!} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function ControlField({
  control,
  state,
  onChange,
}: {
  control: Control;
  state: Record<string, ControlValue>;
  onChange: (next: Record<string, ControlValue>) => void;
}) {
  const value = state[control.name];
  const controlId = `ctrl-${control.name}`;

  if (control.type === "select") {
    return (
      <div className="flex items-center gap-2">
        <Label htmlFor={controlId} className="text-xs text-rixl-fg-muted">
          {control.label}
        </Label>
        <Select
          value={value as string}
          onValueChange={(next) => onChange({ ...state, [control.name]: next })}
        >
          <SelectTrigger id={controlId} size="sm" aria-label={control.label}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {control.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Switch
        id={controlId}
        checked={Boolean(value)}
        onCheckedChange={(checked) => onChange({ ...state, [control.name]: checked })}
      />
      <Label htmlFor={controlId} className="cursor-pointer text-xs text-rixl-fg-muted">
        {control.label}
      </Label>
    </div>
  );
}

function defaultState(controls?: Control[]): Record<string, ControlValue> {
  const state: Record<string, ControlValue> = {};
  if (!controls) return state;
  for (const control of controls) {
    if (control.type === "select") {
      state[control.name] = control.defaultValue ?? control.options[0]?.value ?? "";
    } else {
      state[control.name] = control.defaultValue ?? false;
    }
  }
  return state;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2.5 end-2.5"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        }
      />
      <TooltipContent>{copied ? "Copied!" : "Copy code"}</TooltipContent>
    </Tooltip>
  );
}

// ── helpers ───────────────────────────────────────────────────

function matches(showcase: Showcase, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    showcase.title.toLowerCase().includes(q) ||
    showcase.group.toLowerCase().includes(q) ||
    (showcase.description?.toLowerCase().includes(q) ?? false)
  );
}

function groupByCategory(items: Showcase[]): [string, Showcase[]][] {
  const map = new Map<string, Showcase[]>();
  for (const item of items) {
    const bucket = map.get(item.group) ?? [];
    bucket.push(item);
    map.set(item.group, bucket);
  }
  return Array.from(map.entries());
}

// ── hash routing ──────────────────────────────────────────────

function useHashRoute(showcases: Showcase[]): Showcase | null {
  const [path, setPath] = useState<string>(() => readHash());

  useEffect(() => {
    const onChange = () => setPath(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  if (path === "") return null;
  return showcases.find((s) => s.path === path) ?? null;
}

function readHash(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#\/?/, "");
}

// ── theme ─────────────────────────────────────────────────────

function useTheme(): [Theme, (next: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = (next: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setThemeState(next);
  };

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      if (theme === "system") {
        const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
        root.dataset.theme = prefersDark ? "dark" : "light";
      } else {
        root.dataset.theme = theme;
      }
    };
    apply();

    if (theme !== "system") return;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  return [theme, setTheme];
}

// ── icons ─────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66 4.93 19.07M19.07 4.93 17.66 6.34" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
