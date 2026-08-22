import { useEffect, useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { Button } from "@rixl/ui/button";
import { Input } from "@rixl/ui/input";
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
 * Rixl Studio — component playground.
 *
 * Hash routing keeps the build dependency-free:
 *   #/              home grid
 *   #/<path>        component detail
 *
 * The shell is split into a sticky header, collapsible grouped sidebar,
 * and a main area that switches between the home grid and a detail view.
 */
export function App() {
  const [theme, setTheme] = useTheme();
  const [query, setQuery] = useState("");
  const active = useHashRoute(showcases);
  const isHome = active === null;

  return (
    <div className="flex min-h-screen">
      <Sidebar showcases={showcases} query={query} activePath={active?.path} />

      <main className="flex-1 overflow-x-hidden">
        <Header theme={theme} onThemeChange={setTheme} query={query} onQueryChange={setQuery} />

        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
          {isHome ? <HomeGrid showcases={showcases} query={query} /> : <Detail showcase={active} />}
        </div>
      </main>
    </div>
  );
}

// ── header ────────────────────────────────────────────────────

function Header({
  theme,
  onThemeChange,
  query,
  onQueryChange,
}: {
  theme: Theme;
  onThemeChange: (next: Theme) => void;
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-6 border-b border-rixl-border bg-rixl-surface px-6 py-4 lg:px-10">
      <a href="#/" className="flex items-center gap-2 text-rixl-fg">
        <span className="flex h-7 w-7 items-center justify-center rounded-rixl-md bg-rixl-primary text-rixl-primary-fg font-bold text-sm">
          R
        </span>
        <span className="text-lg font-semibold tracking-tight">Rixl Studio</span>
      </a>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="w-full max-w-sm">
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search components…"
            className="h-9"
          />
        </div>
        <ThemeToggle theme={theme} onChange={onThemeChange} />
      </div>
    </header>
  );
}

function ThemeToggle({ theme, onChange }: { theme: Theme; onChange: (next: Theme) => void }) {
  return (
    <div className="flex items-center rounded-rixl-md border border-rixl-border bg-rixl-bg p-0.5">
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        size="icon"
        aria-label="System theme"
        onClick={() => onChange("system")}
      >
        <MonitorIcon />
      </Button>
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        size="icon"
        aria-label="Light theme"
        onClick={() => onChange("light")}
      >
        <SunIcon />
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="icon"
        aria-label="Dark theme"
        onClick={() => onChange("dark")}
      >
        <MoonIcon />
      </Button>
    </div>
  );
}

// ── sidebar ───────────────────────────────────────────────────

function Sidebar({
  showcases,
  query,
  activePath,
}: {
  showcases: Showcase[];
  query: string;
  activePath?: string;
}) {
  const filtered = useMemo(() => showcases.filter((s) => matches(s, query)), [showcases, query]);
  const groups = groupByCategory(filtered);

  return (
    <aside className="sticky top-0 z-10 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-rixl-border bg-rixl-surface px-4 py-6 lg:flex">
      <div className="mb-6 px-2">
        <p className="text-sm font-semibold text-rixl-fg">Components</p>
        <p className="mt-0.5 text-xs text-rixl-fg-muted">{filtered.length} shipped</p>
      </div>

      <nav className="space-y-5">
        <a
          href="#/"
          aria-current={!activePath ? "page" : undefined}
          className="block rounded-rixl-sm px-2 py-1.5 text-sm text-rixl-fg-muted hover:bg-rixl-surface-muted hover:text-rixl-fg aria-[current=page]:bg-rixl-surface-muted aria-[current=page]:text-rixl-fg aria-[current=page]:font-medium"
        >
          Overview
        </a>

        {groups.map(([group, items]) => (
          <details key={group} open>
            <summary className="mb-1.5 cursor-pointer list-none px-2 text-xs font-medium uppercase tracking-wide text-rixl-fg-subtle">
              {group}
            </summary>
            <ul className="space-y-0.5">
              {items.map((s) => (
                <li key={s.path}>
                  <a
                    href={`#/${s.path}`}
                    aria-current={s.path === activePath ? "page" : undefined}
                    className="block rounded-rixl-sm px-2 py-1.5 text-sm text-rixl-fg-muted hover:bg-rixl-surface-muted hover:text-rixl-fg aria-[current=page]:bg-rixl-surface-muted aria-[current=page]:text-rixl-fg aria-[current=page]:font-medium"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </nav>
    </aside>
  );
}

// ── home grid ─────────────────────────────────────────────────

function HomeGrid({ showcases, query }: { showcases: Showcase[]; query: string }) {
  const filtered = useMemo(() => showcases.filter((s) => matches(s, query)), [showcases, query]);

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium text-rixl-fg">No components found</p>
        <p className="mt-1 text-sm text-rixl-fg-muted">Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-rixl-fg">Components</h1>
        <p className="mt-1 text-rixl-fg-muted">
          {filtered.length} showcase{filtered.length === 1 ? "" : "s"} available
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s) => (
          <ComponentCard key={s.path} showcase={s} />
        ))}
      </div>
    </div>
  );
}

function ComponentCard({ showcase }: { showcase: Showcase }) {
  return (
    <a
      href={`#/${showcase.path}`}
      className="group block rounded-rixl-lg border border-rixl-border bg-rixl-surface p-5 shadow-rixl-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-rixl-md hover:border-rixl-border-strong"
    >
      <div className="mb-4 flex h-28 items-center justify-center rounded-rixl-md border border-rixl-border border-dashed bg-rixl-bg">
        <span className="text-3xl font-semibold text-rixl-fg-subtle">{showcase.title[0]}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-medium text-rixl-fg group-hover:text-rixl-primary transition-colors">
            {showcase.title}
          </h3>
          <p className="text-xs text-rixl-fg-muted">{showcase.group}</p>
        </div>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </div>
    </a>
  );
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
      <div className="border-b border-rixl-border pb-6">
        <span className="inline-flex items-center rounded-full bg-rixl-surface-muted px-2.5 py-0.5 text-xs font-medium text-rixl-fg-muted">
          {showcase.group}
        </span>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-rixl-fg">
          {showcase.title}
        </h1>
        {showcase.description ? (
          <p className="mt-2 text-rixl-fg-muted">{showcase.description}</p>
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
    <section className="overflow-hidden rounded-rixl-lg border border-rixl-border bg-rixl-surface shadow-rixl-xs transition-shadow duration-200 hover:shadow-rixl-sm">
      <div className="flex items-center justify-between border-b border-rixl-border px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-rixl-fg">{example.title}</h2>
          {example.description ? (
            <p className="text-xs text-rixl-fg-muted">{example.description}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant={mode === "preview" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setMode("preview")}
          >
            Preview
          </Button>
          <Button
            variant={mode === "code" ? "secondary" : "ghost"}
            size="sm"
            disabled={!hasCode}
            onClick={() => setMode("code")}
          >
            Code
          </Button>
        </div>
      </div>

      {example.controls && mode === "preview" ? (
        <div className="flex flex-wrap gap-4 border-b border-rixl-border bg-rixl-bg px-4 py-3">
          {example.controls.map((control) => (
            <ControlField key={control.name} control={control} state={state} onChange={setState} />
          ))}
        </div>
      ) : null}

      <div className="p-6">
        {mode === "preview" ? (
          <Render state={state} />
        ) : hasCode ? (
          <div className="relative">
            <pre className="overflow-x-auto rounded-rixl-md border border-rixl-border bg-rixl-bg p-4 text-xs text-rixl-fg">
              {example.code}
            </pre>
            <CopyButton text={example.code!} />
          </div>
        ) : (
          <p className="text-rixl-fg-muted">No code available for this example.</p>
        )}
      </div>
    </section>
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

  if (control.type === "select") {
    return (
      <label className="flex items-center gap-2 text-sm text-rixl-fg">
        <span className="text-rixl-fg-muted">{control.label}</span>
        <select
          value={value as string}
          onChange={(e) => onChange({ ...state, [control.name]: e.target.value })}
          className="h-8 rounded-rixl-md border border-rixl-border bg-rixl-surface px-2 text-sm text-rixl-fg outline-none focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]"
        >
          {control.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="flex items-center gap-2 text-sm text-rixl-fg">
      <input
        type="checkbox"
        checked={value as boolean}
        onChange={(e) => onChange({ ...state, [control.name]: e.target.checked })}
        className="size-4 rounded-rixl-sm border-rixl-border accent-rixl-primary"
      />
      <span className="text-rixl-fg-muted">{control.label}</span>
    </label>
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
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  };

  return (
    <Button variant="outline" size="sm" className="absolute top-2 right-2" onClick={handleCopy}>
      {copied ? "Copied" : "Copy"}
    </Button>
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

function MonitorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
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
      className="h-4 w-4"
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
      className="h-4 w-4"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
