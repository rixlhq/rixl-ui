import {forwardRef, type ComponentProps} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

/**
 * Rixl Skeleton — a placeholder for loading UI.
 *
 * Size and shape come from consumer classes (`<Skeleton className="h-4 w-32" />`,
 * `rounded-full` for avatars). Pick the loading motion via `animation`:
 *
 * - `shimmer` (default) → a highlight band sweeps across the placeholder (the
 *   Facebook / Linear / Stripe style), using `--rixl-surface-raised` over the
 *   muted base.
 * - `pulse` → the classic opacity pulse.
 * - `none` → a static muted fill.
 *
 * Motion is dropped under `prefers-reduced-motion`: the sweep/pulse stops and a
 * flat muted fill remains (WCAG 2.3.3), rather than freezing mid-animation.
 *
 * The atom is decorative, so it defaults to `aria-hidden`. Pair a group of
 * skeletons with a `role="status"` container that carries an sr-only "Loading…".
 */
const skeletonVariants = cva("bg-rixl-surface-muted rounded-rixl-md", {
  variants: {
    animation: {
      pulse: "animate-pulse motion-reduce:animate-none",
      shimmer: cn(
        "bg-[linear-gradient(90deg,transparent,var(--rixl-surface-raised),transparent)] bg-[length:200%_100%] bg-no-repeat",
        "animate-rixl-shimmer motion-reduce:animate-none motion-reduce:bg-none"
      ),
      none: "",
    },
  },
  defaultVariants: {animation: "shimmer"},
});

export type SkeletonProps = ComponentProps<"div"> & VariantProps<typeof skeletonVariants>;

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({className, animation, ...props}, ref) => (
  <div ref={ref} data-slot="skeleton" aria-hidden="true" className={cn(skeletonVariants({animation}), className)} {...props} />
));
Skeleton.displayName = "Skeleton";

export {Skeleton, skeletonVariants};
