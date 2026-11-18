import {forwardRef, type ComponentProps} from "react";
import {ChevronRight, MoreHorizontal} from "lucide-react";
import {cn} from "../../lib/cn";
import type {RixlTranslations} from "../locale";
import {useTranslations} from "../locale/use-translations";

export type BreadcrumbSeparatorProps = ComponentProps<"li">;
export type BreadcrumbEllipsisProps = ComponentProps<"span"> & {
  /** Screen-reader text. Defaults to the provider's string, then English. */
  labels?: Partial<RixlTranslations["breadcrumb"]>;
};

export const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(({children, className, ...props}, ref) => (
  <li
    ref={ref}
    data-slot="breadcrumb-separator"
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(({className, labels, ...props}, ref) => {
  const t = useTranslations("breadcrumb", labels);
  return (
    <span
      ref={ref}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-5 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">{t.more}</span>
    </span>
  );
});
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
