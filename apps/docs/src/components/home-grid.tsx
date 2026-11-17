import {memo, useMemo} from "react";
import {SidebarTrigger} from "@rixl/ui/sidebar";
import {EmptyState} from "@rixl/ui/empty-state";
import {matchesShowcase} from "../hooks/use-hash-route";
import type {Showcase} from "../showcases/registry";
import {ArrowUpRightIcon} from "./icons";

export function HomeGrid({showcases, query, onClearQuery}: {showcases: Showcase[]; query: string; onClearQuery: () => void}) {
  const filtered = useMemo(
    () => [...showcases].filter((s) => matchesShowcase(s, query)).sort((a, b) => a.title.localeCompare(b.title)),
    [showcases, query]
  );
  const searching = Boolean(query.trim());

  return (
    <div>
      <div className="docs-page-heading">
        <p className="docs-eyebrow">@rixl/ui</p>
        <h1>{searching ? "Search results" : "Components"}</h1>
        <p>
          {searching
            ? `Matching “${query.trim()}”`
            : "A collection of the building blocks in @rixl/ui. Interact with any preview to try it."}
        </p>
      </div>
      <div className="docs-index-bar">
        <span aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "component" : "components"}
        </span>
        {searching ? (
          <button type="button" onClick={onClearQuery}>
            Clear search ×
          </button>
        ) : (
          <span className="docs-index-hint">Select a component for examples and code</span>
        )}
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          title="No components found"
          description="Try a component name or a shorter search."
          action={{label: "Clear search", onClick: onClearQuery}}
        />
      ) : (
        <ul className="docs-demo-grid">
          {filtered.map((showcase) => (
            <Cell key={showcase.path} showcase={showcase} />
          ))}
        </ul>
      )}
    </div>
  );
}

const Cell = memo(function Cell({showcase}: {showcase: Showcase}) {
  return (
    <li className="docs-demo-cell">
      <a href={`#/${showcase.path}`} className="docs-demo-caption">
        <span>{showcase.title}</span>
        <ArrowUpRightIcon />
      </a>
      <div className="docs-demo-preview">
        <div className="docs-demo-content">
          {showcase.path === "sidebar" ? (
            <div className="docs-mini-shell">
              <div className="docs-mini-sidebar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="docs-mini-main">
                <SidebarTrigger aria-label="Toggle app sidebar" />
                <span className="text-xs text-rixl-fg-muted">Toggle sidebar</span>
              </div>
            </div>
          ) : (
            <showcase.Showcase />
          )}
        </div>
      </div>
    </li>
  );
});
