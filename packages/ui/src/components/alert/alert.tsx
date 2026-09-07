import type {ComponentProps} from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

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
 */
const alertVariants = cva(
  "relative w-full rounded-rixl-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-rixl-bg text-rixl-fg",
        destructive: "text-rixl-danger [&>svg]:text-current *:data-[slot=alert-description]:text-rixl-danger/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({className, variant, ...props}: ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" role="alert" className={cn(alertVariants({variant}), className)} {...props} />;
}

function AlertTitle({className, ...props}: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 text-sm line-clamp-1 min-h-4 font-medium tracking-tight", className)}
      {...props}
    />
  );
}

function AlertDescription({className, ...props}: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-rixl-fg-muted col-start-2 grid justify-items-start gap-1 text-xs [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
}

export {Alert, AlertTitle, AlertDescription, alertVariants};
export type AlertProps = ComponentProps<"div"> & VariantProps<typeof alertVariants>;
export type AlertTitleProps = ComponentProps<"div">;
export type AlertDescriptionProps = ComponentProps<"div">;
