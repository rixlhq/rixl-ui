import {forwardRef, type ComponentProps} from "react";

import {cn} from "../../lib/cn";
import {useTranslations} from "../locale/use-translations";
import {DEFAULT_BREADCRUMB_LABELS} from "./breadcrumb-labels";
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

const SIZE_CLASSES = {sm: "text-xs", base: "text-sm"} as const;

export type BreadcrumbSize = keyof typeof SIZE_CLASSES;

export type BreadcrumbProps = ComponentProps<"nav"> & {
  /** Text size of the whole trail. @default "base" */
  size?: BreadcrumbSize;
};

/**
 * Rixl Breadcrumb — navigation trail built on Base UI `useRender`.
 * Ported verbatim from dashboard; token-mapped to rixl tokens.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(({size = "base", className, ...props}, ref) => {
  const {label} = useTranslations("breadcrumb", DEFAULT_BREADCRUMB_LABELS);
  return <nav ref={ref} aria-label={label} data-slot="breadcrumb" className={cn(SIZE_CLASSES[size], className)} {...props} />;
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
