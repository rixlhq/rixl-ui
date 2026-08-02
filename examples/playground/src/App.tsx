import {useState, useEffect} from "react";
import {Button} from "@rixl/ui/button";

/**
 * Playground shell. Add a new <Section> per component as we ship them.
 * This file is the fastest place to see your visual changes — edit
 * `src/components/<name>/*` and the page hot-reloads.
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

      <ButtonSection />
    </div>
  );
}

function ButtonSection() {
  return (
    <Section title="Button" description="Primary action primitive. Six variants × four sizes × loading state.">
      <Group label="Variants (size=md)">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </Group>

      <Group label="Sizes (variant=primary)">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Search">
          <SearchIcon />
        </Button>
      </Group>

      <Group label="With leading icon">
        <Button variant="primary">
          <PlusIcon /> New feed
        </Button>
        <Button variant="secondary">
          <PlusIcon /> Invite member
        </Button>
        <Button variant="outline">
          <PlusIcon /> Add domain
        </Button>
      </Group>

      <Group label="States">
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
        <LoadingDemo />
      </Group>
    </Section>
  );
}

function LoadingDemo() {
  const [busy, setBusy] = useState(false);
  return (
    <Button
      variant="primary"
      loading={busy}
      onClick={() => {
        setBusy(true);
        window.setTimeout(() => setBusy(false), 1400);
      }}
    >
      Click me
    </Button>
  );
}

// ── layout helpers ─────────────────────────────────────────────

function Section({title, description, children}: {title: string; description?: string; children: React.ReactNode}) {
  return (
    <section className="mb-16 rounded-rixl-lg border border-rixl-border bg-rixl-surface p-6 shadow-rixl-xs">
      <header className="mb-6 border-b border-rixl-border pb-4">
        <h2 className="text-xl font-semibold text-rixl-fg">{title}</h2>
        {description ? <p className="mt-1 text-sm text-rixl-fg-muted">{description}</p> : null}
      </header>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Group({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-rixl-fg-subtle">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
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

// ── icons (inline to keep the playground zero-dep) ────────────

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
