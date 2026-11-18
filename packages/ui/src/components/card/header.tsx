import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";

export type CardHeaderProps = ComponentProps<"div">;
export type CardTitleProps = ComponentProps<"div">;
export type CardDescriptionProps = ComponentProps<"div">;
export type CardActionProps = ComponentProps<"div">;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({className, ...props}, ref) => (
  <div
    ref={ref}
    data-slot="card-header"
    className={cn(
      "@container/card-header grid min-w-0 auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(({className, ...props}, ref) => (
  <div ref={ref} data-slot="card-title" className={cn("min-w-0 leading-none font-semibold break-words", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLDivElement, CardDescriptionProps>(({className, ...props}, ref) => (
  <div ref={ref} data-slot="card-description" className={cn("text-rixl-fg-muted min-w-0 text-sm break-words", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(({className, ...props}, ref) => (
  <div
    ref={ref}
    data-slot="card-action"
    className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
    {...props}
  />
));
CardAction.displayName = "CardAction";
