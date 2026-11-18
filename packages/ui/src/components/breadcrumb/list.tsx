import type {ComponentProps} from "react";
import {cn} from "../../lib/cn";

export type BreadcrumbListProps = ComponentProps<"ol">;

export function BreadcrumbList({className, ...props}: BreadcrumbListProps) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("text-rixl-fg-muted flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5", className)}
      {...props}
    />
  );
}
