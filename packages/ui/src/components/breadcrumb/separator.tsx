import type {ComponentProps} from "react";
import {ChevronRight, MoreHorizontal} from "lucide-react";
import {cn} from "../../lib/cn";

export type BreadcrumbSeparatorProps = ComponentProps<"li">;
export type BreadcrumbEllipsisProps = ComponentProps<"span">;

export function BreadcrumbSeparator({children, className, ...props}: BreadcrumbSeparatorProps) {
  return (
    <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}

export function BreadcrumbEllipsis({className, ...props}: BreadcrumbEllipsisProps) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-5 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}
