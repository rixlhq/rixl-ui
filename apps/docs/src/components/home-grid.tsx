import {memo, useMemo, useState} from "react";
import {Badge} from "@rixl/ui/badge";
import {EmptyState} from "@rixl/ui/empty-state";
import {groupShowcasesByCategory, matchesShowcase} from "../hooks/use-hash-route";
import type {Showcase} from "../showcases/registry";

export function HomeGrid({showcases, query, onClearQuery}: {showcases: Showcase[]; query: string; onClearQuery: () => void}) {
  const filtered = useMemo(() => showcases.filter((s) => matchesShowcase(s, query)), [showcases, query]);
  const groups = useMemo(() => {
    const grouped = groupShowcasesByCategory(filtered);
    for (const [, items] of grouped) items.sort((a, b) => a.title.localeCompare(b.title));
    grouped.sort(([a], [b]) => a.localeCompare(b));
    return grouped;
  }, [filtered]);

  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const selected = useMemo(() => {
    if (selectedPath !== null) {
      const found = filtered.find((s) => s.path === selectedPath);
      if (found) return found;
    }
    return filtered[0] ?? null;
  }, [filtered, selectedPath]);

  if (filtered.length === 0) {
    return (
      <EmptyState
        title="No components found"
        description={`No components matched "${query}". Try a different search term.`}
        action={{label: "Clear search", onClick: onClearQuery}}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-rixl-fg">Components</h1>
          <p className="mt-1 text-sm text-rixl-fg-muted">
            Live primitives rendered directly from <code className="text-rixl-fg">@rixl/ui</code> workspace source.
          </p>
        </div>
        <Badge variant="outline">
          {filtered.length} {filtered.length === 1 ? "component" : "components"}
        </Badge>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <nav aria-label="Components" className="min-w-0">
          <div className="space-y-8">
            {groups.map(([group, items]) => (
              <section key={group} aria-labelledby={`overview-group-${group}`}>
                <h2 id={`overview-group-${group}`} className="text-xs font-medium tracking-wide text-rixl-fg-muted uppercase">
                  {group}
                </h2>
                <ul className="mt-2 space-y-0.5">
                  {items.map((s) => {
                    const isActive = selected !== null && s.path === selected.path;
                    return (
                      <li key={s.path}>
                        <a
                          href={`#/${s.path}`}
                          aria-current={isActive ? "true" : undefined}
                          data-active={isActive ? "" : undefined}
                          onMouseEnter={() => setSelectedPath(s.path)}
                          onFocus={() => setSelectedPath(s.path)}
                          className="block rounded-rixl-sm px-2 py-1 text-sm text-rixl-fg-muted transition-colors duration-150 ease hover:text-rixl-fg data-[active]:bg-rixl-surface-muted data-[active]:font-medium data-[active]:text-rixl-fg"
                        >
                          {s.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </nav>

        <div className="hidden min-w-0 lg:block">{selected ? <OverviewPreview showcase={selected} /> : null}</div>
      </div>
    </div>
  );
}

const OverviewPreview = memo(function OverviewPreview({showcase}: {showcase: Showcase}) {
  return (
    <div className="sticky top-6 overflow-hidden rounded-rixl-lg border border-rixl-border bg-rixl-surface">
      <div className="flex items-center gap-2 border-b border-rixl-border px-4 py-3">
        <span className="text-sm font-medium text-rixl-fg">{showcase.title}</span>
        <code className="text-xs text-rixl-fg-muted">@rixl/ui/{showcase.path}</code>
      </div>
      <div className="flex min-h-64 items-center justify-center p-8">
        {showcase.path === "sidebar" ? <Badge variant="outline">App shell · ⌘B</Badge> : <showcase.Showcase />}
      </div>
    </div>
  );
});
