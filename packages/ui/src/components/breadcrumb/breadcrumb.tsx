import type {ComponentProps} from "react";

import {BreadcrumbList, type BreadcrumbListProps} from "./list";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbPageProps,
} from "./item";
import {BreadcrumbEllipsis, BreadcrumbSeparator, type BreadcrumbEllipsisProps, type BreadcrumbSeparatorProps} from "./separator";

export type BreadcrumbProps = ComponentProps<"nav">;

/**
 * Rixl Breadcrumb — navigation trail built on Base UI `useRender`.
 * Ported verbatim from dashboard; token-mapped to rixl tokens.
 */
export function Breadcrumb({...props}: BreadcrumbProps) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

export {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  type BreadcrumbListProps,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbPageProps,
  type BreadcrumbSeparatorProps,
  type BreadcrumbEllipsisProps,
};
