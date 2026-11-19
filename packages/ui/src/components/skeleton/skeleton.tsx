import {forwardRef, type ComponentProps} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../../lib/cn";

/**
 * Rixl Skeleton — a placeholder for loading UI.
 *
 * Size comes from consumer classes (`<Skeleton className="h-4 w-32" />`). `shape`
 * is `rect` (rounded rectangle, the default) or `circle` for avatars. Pick the
 * loading motion via `animation`:
 *
 * - `shimmer` (default) → a highlight band sweeps across the placeholder (the
 *   Facebook / Linear / Stripe style), using `--rixl-surface-raised` over the
 *   muted base. The band is an `::after` element moved with `translate`, so
 *   the sweep is composited instead of repainting every skeleton each frame.
 * - `pulse` → the classic opacity pulse.
 * - `none` → a static muted fill.
 *
 * Motion is dropped under `prefers-reduced-motion`: the band is removed and a
 * flat muted fill remains (WCAG 2.3.3), rather than freezing mid-animation.
 *
 * The atom is decorative, so it defaults to `aria-hidden`. Pair a group of
 * skeletons with a `role="status"` container that carries an sr-only "Loading…".
 */
const skeletonVariants = cva("bg-rixl-surface-muted", {
  variants: {
    shape: {
      rect: "rounded-rixl-md",
      circle: "rounded-full",
    },
    animation: {
      pulse: "animate-pulse motion-reduce:animate-none",
      shimmer: cn(
        "relative overflow-hidden",
        "after:absolute after:inset-0 after:bg-[linear-gradient(90deg,transparent,var(--rixl-surface-raised),transparent)]",
        "after:animate-rixl-shimmer motion-reduce:after:hidden"
      ),
      none: "",
    },
  },
  defaultVariants: {shape: "rect", animation: "shimmer"},
});

export type SkeletonProps = ComponentProps<"div"> & VariantProps<typeof skeletonVariants>;

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({className, shape, animation, ...props}, ref) => (
  <div ref={ref} data-slot="skeleton" aria-hidden="true" className={cn(skeletonVariants({shape, animation}), className)} {...props} />
));
Skeleton.displayName = "Skeleton";

export {Skeleton, skeletonVariants};
