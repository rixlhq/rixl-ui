import {forwardRef, type ComponentProps} from "react";

import {useTranslations} from "../locale/use-translations";
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
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>((props, ref) => {
  const {label} = useTranslations("breadcrumb");
  return <nav ref={ref} aria-label={label} data-slot="breadcrumb" {...props} />;
});
Breadcrumb.displayName = "Breadcrumb";

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
