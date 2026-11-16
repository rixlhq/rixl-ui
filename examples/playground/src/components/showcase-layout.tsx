import type { ReactNode } from "react";

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
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold text-rixl-fg">{title}</h2>
        {description ? <p className="mt-1 text-sm text-rixl-fg-muted">{description}</p> : null}
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

export function Group({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="w-full space-y-2.5">
      {label ? (
        <p className="text-xs font-medium tracking-wide text-rixl-fg-muted">{label}</p>
      ) : null}
      <div className="flex w-full flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}
