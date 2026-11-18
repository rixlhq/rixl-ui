import {forwardRef, type ComponentProps} from "react";
import {ChevronRight, MoreHorizontal} from "lucide-react";
import {cn} from "../../lib/cn";
import {rtlFlip} from "../../lib/classes";

export type BreadcrumbSeparatorProps = ComponentProps<"li">;
export type BreadcrumbEllipsisProps = ComponentProps<"span">;

export const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(({children, className, ...props}, ref) => (
  <li
    ref={ref}
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight className={rtlFlip} />}
  </li>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(({className, ...props}, ref) => (
  <span
    ref={ref}
    data-slot="breadcrumb-ellipsis"
    role="presentation"
    aria-hidden="true"
    className={cn("flex size-5 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
  </span>
));
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
