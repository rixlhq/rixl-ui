import { memo, useMemo } from "react";
import { Badge } from "@rixl/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@rixl/ui/card";
import { EmptyState } from "@rixl/ui/empty-state";
import { matchesShowcase } from "../hooks/use-hash-route";
import type { Showcase } from "../showcases/registry";

export function HomeGrid({
  showcases,
  query,
  onClearQuery,
}: {
  showcases: Showcase[];
  query: string;
  onClearQuery: () => void;
}) {
  const filtered = useMemo(
    () => showcases.filter((s) => matchesShowcase(s, query)),
    [showcases, query],
  );

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
