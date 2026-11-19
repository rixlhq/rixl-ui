import {forwardRef} from "react";
import {mergeProps} from "@base-ui/react/merge-props";
import {useRender} from "@base-ui/react/use-render";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../../lib/cn";
import {feedbackTint, focusRing} from "../../lib/classes";

/**
 * Rixl Badge — a compact status / count label.
 *
 * Ported from dashboard's shadcn Badge. Uses Base UI's `useRender`
 * hook so the badge can be rendered as any element (default `<span>`;
 * pass `render={<a href=".."/>}` for interactive badges).
 *
 * Class names swapped to `--rixl-*` tokens; dark:* variants dropped
 * (rixl handles dark via `[data-theme="dark"]`). The focus ring is the one
 * every other interactive component draws.
 */
const badgeVariants = cva(
  cn(
    "inline-flex items-center justify-center rounded-md border border-rixl-border px-2 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none",
    "outline-none aria-invalid:focus-visible:ring-0",
    focusRing,
    "transition-[color,background-color,border-color,box-shadow] duration-(--rixl-motion-fast) ease-out"
  ),
  {
    variants: {
      variant: {
        default: "border-transparent bg-rixl-primary text-rixl-primary-fg shadow-sm [a&]:hover:bg-rixl-primary-hover",
        secondary: "border-transparent bg-rixl-secondary text-rixl-secondary-fg [a&]:hover:bg-rixl-secondary-hover",
        destructive: "border-transparent bg-rixl-danger text-rixl-danger-fg shadow-sm [a&]:hover:bg-rixl-danger-hover",
        success: cn(feedbackTint.success, "[a&]:hover:bg-rixl-success/20"),
        warning: cn(feedbackTint.warning, "[a&]:hover:bg-rixl-warning/20"),
        outline: "text-rixl-fg [a&]:hover:bg-rixl-surface-muted [a&]:hover:text-rixl-fg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({className, variant = "default", render, ...props}, ref) =>
  useRender({
    defaultTagName: "span",
    props: mergeProps<"span">({className: cn(badgeVariants({variant}), className)}, props),
    ref,
    render,
    state: {slot: "badge", variant},
  })
);
Badge.displayName = "Badge";

export {Badge, badgeVariants};
export type BadgeProps = useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;
