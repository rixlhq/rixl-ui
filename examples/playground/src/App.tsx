import {useState, useEffect} from "react";
import {Button} from "@rixl/ui/button";
import {showcases, type Showcase} from "./showcases/registry";

/**
 * Playground shell. Two-pane layout: left sidebar lists every showcase
 * grouped by category; right pane renders the selected one. Hash routing
 * (`#/button`) keeps deep links working and lets us skip a router dep.
 *
 * Adding a component: create `showcases/<name>.tsx` and append it to
 * `showcases/registry.ts`. The sidebar and content pane both read from
 * that array.
 */
export function App() {
  const [theme, setTheme] = useTheme();
  const active = useHashRoute(showcases);

  return (
    <div className="flex min-h-screen">
      <Sidebar showcases={showcases} activePath={active.path} />

      <main className="flex-1 overflow-x-hidden">
        <header className="flex items-center justify-between gap-6 border-b border-rixl-border bg-rixl-surface px-8 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-rixl-fg-muted">@rixl/ui — playground</p>
            <h1 className="mt-1 text-lg font-semibold text-rixl-fg">{active.title}</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
        </header>

        <div className="mx-auto max-w-5xl px-8 py-10">
          <active.Showcase />
        </div>
      </main>
    </div>
  );
}

// ── sidebar ───────────────────────────────────────────────────

function Sidebar({showcases, activePath}: {showcases: Showcase[]; activePath: string}) {
  const groups = groupByCategory(showcases);

  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 overflow-y-auto border-r border-rixl-border bg-rixl-surface px-4 py-6">
      <div className="mb-6 px-2">
        <p className="text-sm font-semibold text-rixl-fg">Components</p>
        <p className="mt-0.5 text-xs text-rixl-fg-muted">{showcases.length} shipped</p>
      </div>

      <nav className="space-y-6">
        {groups.map(([group, items]) => (
          <div key={group}>
            <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-rixl-fg-subtle">{group}</p>
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
          </div>
        ))}
      </nav>
    </aside>
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

function useHashRoute(showcases: Showcase[]): Showcase {
  const [path, setPath] = useState<string>(() => readHash());

  useEffect(() => {
    const onChange = () => setPath(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return showcases.find((s) => s.path === path) ?? showcases[0]!;
}

function readHash(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#\/?/, "");
}

// ── theme ─────────────────────────────────────────────────────

function useTheme(): [string, (next: string) => void] {
  const [theme, setTheme] = useState<string>(() =>
    typeof document !== "undefined" ? (document.documentElement.dataset.theme ?? "light") : "light"
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return [theme, setTheme];
}
