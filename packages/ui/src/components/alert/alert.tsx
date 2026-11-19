import {forwardRef, type ComponentProps} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../../lib/cn";

/**
 * Rixl Alert — an inline banner for status / instructive messages.
 *
 * Ported from dashboard's shadcn Alert. Composition: Alert (root) +
 * AlertTitle + AlertDescription. An optional leading `<svg>` inside
 * the root aligns to a two-column grid via the base classes; sizing
 * is controlled by `[&>svg]:size-4`.
 *
 * Class names swapped to `--rixl-*` tokens; destructive text uses
 * `text-rixl-danger` so it reads legibly on the surface it sits on.
 *
 * The root has no `role`: a banner that is on the page at load needs none, and
 * `role="alert"` would make screen readers announce it assertively on mount.
 * Pass `role="alert"` for an urgent message that appears after the page has
 * loaded (a failed save), or `role="status"` for a polite update (a saved draft).
 */
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "border-rixl-border bg-rixl-bg text-rixl-fg",
        destructive:
          "border-rixl-danger/30 bg-rixl-danger/5 text-rixl-danger [&>svg]:text-current *:data-[slot=alert-description]:text-rixl-danger",
        success:
          "border-rixl-success/30 bg-rixl-success/5 text-rixl-success [&>svg]:text-current *:data-[slot=alert-description]:text-rixl-fg-muted",
        warning:
          "border-rixl-warning/30 bg-rixl-warning/5 text-rixl-warning [&>svg]:text-current *:data-[slot=alert-description]:text-rixl-fg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = forwardRef<HTMLDivElement, AlertProps>(({className, variant, ...props}, ref) => (
  <div ref={ref} data-slot="alert" className={cn(alertVariants({variant}), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(({className, ...props}, ref) => (
  <div
    ref={ref}
    data-slot="alert-title"
    className={cn("col-start-2 min-h-4 min-w-0 text-sm font-medium tracking-tight wrap-anywhere", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(({className, ...props}, ref) => (
  <div
    ref={ref}
    data-slot="alert-description"
    className={cn(
      "text-rixl-fg-muted col-start-2 grid min-w-0 justify-items-start gap-1 text-xs break-words [&_p]:leading-relaxed",
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export {Alert, AlertTitle, AlertDescription, alertVariants};
export type AlertProps = ComponentProps<"div"> & VariantProps<typeof alertVariants>;
export type AlertTitleProps = ComponentProps<"div">;
export type AlertDescriptionProps = ComponentProps<"div">;
