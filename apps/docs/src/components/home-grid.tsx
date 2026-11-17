import {memo, useMemo} from "react";
import {Badge} from "@rixl/ui/badge";
import {EmptyState} from "@rixl/ui/empty-state";
import {matchesShowcase} from "../hooks/use-hash-route";
import type {Showcase} from "../showcases/registry";

export function HomeGrid({showcases, query, onClearQuery}: {showcases: Showcase[]; query: string; onClearQuery: () => void}) {
  const filtered = useMemo(() => {
    const items = showcases.filter((s) => matchesShowcase(s, query));
    items.sort((a, b) => a.title.localeCompare(b.title));
    return items;
  }, [showcases, query]);

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

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((showcase) => (
          <Cell key={showcase.path} showcase={showcase} />
        ))}
      </ul>
    </div>
  );
}

const Cell = memo(function Cell({showcase}: {showcase: Showcase}) {
  return (
    <li className="overflow-hidden rounded-rixl-lg border border-rixl-border bg-rixl-surface transition-[border-color] duration-rixl-fast ease-rixl-out hover:border-rixl-border-strong motion-reduce:transition-none">
      <div className="flex min-h-44 min-w-0 items-center justify-center overflow-hidden p-6">
        {showcase.path === "sidebar" ? <Badge variant="outline">App shell · ⌘B</Badge> : <showcase.Showcase />}
      </div>
      <div className="border-t border-rixl-border px-4 py-2.5">
        <a href={`#/${showcase.path}`} className="text-sm font-medium text-rixl-fg underline-offset-4 hover:underline">
          {showcase.title}
        </a>
      </div>
    </li>
  );
});
