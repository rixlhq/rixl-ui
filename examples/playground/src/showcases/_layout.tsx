import type {ReactNode} from "react";

/**
 * Layout helpers shared across component showcases.
 * Kept in the playground (not in @rixl/ui) — these are demo scaffolding, not
 * library primitives.
 */

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
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

export function Group({label, children}: {label: string; children: ReactNode}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-rixl-fg-subtle">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
