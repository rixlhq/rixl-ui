import type {ComponentProps} from "react";
import {cn} from "../../lib/cn";

/**
 * Rixl Skeleton — a pulsing placeholder for loading UI.
 *
 * Ported verbatim from dashboard's shadcn Skeleton. Size and shape
 * come from consumer classes (e.g. `<Skeleton className="h-4 w-32" />`).
 * Composed presets (list rows, table rows, page layouts) will land as
 * v0.2 recipes.
 */
function Skeleton({className, ...props}: ComponentProps<"div">) {
  return <div data-slot="skeleton" className={cn("bg-rixl-surface-muted animate-pulse rounded-rixl-md", className)} {...props} />;
}

export {Skeleton};
export type SkeletonProps = ComponentProps<"div">;
