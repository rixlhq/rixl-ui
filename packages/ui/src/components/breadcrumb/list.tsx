import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";

export type BreadcrumbListProps = ComponentProps<"ol">;

export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(({className, ...props}, ref) => (
  <ol
    ref={ref}
    data-slot="breadcrumb-list"
    className={cn("text-rixl-fg-muted flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5", className)}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";
