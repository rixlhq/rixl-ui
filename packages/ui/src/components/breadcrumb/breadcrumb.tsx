import * as React from "react";
import {mergeProps} from "@base-ui-components/react/merge-props";
import {useRender} from "@base-ui-components/react/use-render";
import {ChevronRight, MoreHorizontal} from "lucide-react";

import {cn} from "cnfast";

/**
 * Rixl Breadcrumb — navigation trail built on Base UI `useRender`.
 * Ported verbatim from dashboard; token-mapped to rixl tokens.
 */
function Breadcrumb({...props}: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({className, ...props}: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("text-rixl-fg-muted flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5", className)}
      {...props}
    />
  );
}

function BreadcrumbItem({className, ...props}: React.ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

function BreadcrumbLink({className, render, ...props}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">({className: cn("hover:text-rixl-fg transition-colors", className)}, props),
    render,
    state: {slot: "breadcrumb-link"},
  });
}

function BreadcrumbPage({className, ...props}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-rixl-fg font-normal", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({children, className, ...props}: React.ComponentProps<"li">) {
  return (
    <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({className, ...props}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export type BreadcrumbProps = React.ComponentProps<"nav">;
export type BreadcrumbListProps = React.ComponentProps<"ol">;
export type BreadcrumbItemProps = React.ComponentProps<"li">;
export type BreadcrumbLinkProps = useRender.ComponentProps<"a">;
export type BreadcrumbPageProps = React.ComponentProps<"span">;
export type BreadcrumbSeparatorProps = React.ComponentProps<"li">;
export type BreadcrumbEllipsisProps = React.ComponentProps<"span">;

export {Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis};
