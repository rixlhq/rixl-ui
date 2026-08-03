import {useState, useEffect} from "react";
import {Button} from "@rixl/ui/button";
import {showcases} from "./showcases/registry";

/**
 * Playground shell. The sidebar and content area both read from
 * `showcases/registry.ts` — adding a component is a one-line change there.
 * Edit `packages/ui/src/components/<name>/*` and the page hot-reloads.
 */
export function App() {
  const [theme, setTheme] = useTheme();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-12 flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-rixl-fg-muted">@rixl/ui — playground</p>
          <h1 className="mt-2 text-3xl font-semibold text-rixl-fg">Design system, local.</h1>
          <p className="mt-2 max-w-prose text-sm text-rixl-fg-muted">
            Every component in <code className="rounded bg-rixl-surface-muted px-1.5 py-0.5 text-xs">src/</code> is
            rendered here against the current tokens. Edit a variant, save, watch it update.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </Button>
      </header>

      {showcases.map(({path, Showcase}) => (
        <Showcase key={path} />
      ))}
    </div>
  );
}

function useTheme(): [string, (next: string) => void] {
  const [theme, setTheme] = useState<string>(() =>
    typeof document !== "undefined" ? (document.documentElement.dataset.theme ?? "light") : "light"
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return [theme, setTheme];
}
