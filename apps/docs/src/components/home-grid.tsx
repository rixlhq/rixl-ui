import {memo, useMemo} from "react";
import {SidebarTrigger} from "@rixl/ui/sidebar";
import type {Showcase} from "../showcases/registry";
import {ArrowRightIcon} from "./icons";

export function HomeGrid({showcases}: {showcases: Showcase[]}) {
  const sorted = useMemo(() => [...showcases].sort((a, b) => a.title.localeCompare(b.title)), [showcases]);
  return (
    <div>
      <div className="docs-page-heading">
        <h1 tabIndex={-1}>Components</h1>
        <p>Interactive previews of the Rixl design system.</p>
      </div>
      <div className="docs-index-bar">
        <span>{showcases.length} components</span>
      </div>
      <ul className="docs-demo-grid">
        {sorted.map((showcase) => (
          <Cell key={showcase.path} showcase={showcase} />
        ))}
      </ul>
    </div>
  );
}

const Cell = memo(function Cell({showcase}: {showcase: Showcase}) {
  return (
    <li className="docs-demo-cell">
      <a href={`#/${showcase.path}`} className="docs-demo-caption">
        <span>{showcase.title}</span>
        <ArrowRightIcon />
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
