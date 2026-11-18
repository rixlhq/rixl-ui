import type {PaginationProps} from "./pagination";
import {normalizePagination, type NormalizedPagination} from "./normalize-pagination";
import {DEFAULT_PAGINATION_LABELS, type PaginationLabels} from "./pagination-context";

export type PaginationView = {
  className?: string;
  children?: PaginationProps["children"];
  controls: PaginationProps["controls"];
  text: PaginationProps["text"];
  normalized: NormalizedPagination;
  setPage: (page: number) => void;
  labels: PaginationLabels;
  navProps: Record<string, unknown>;
};

export function usePaginationView({
  className,
  children,
  page,
  setPage,
  perPage,
  totalCount,
  hasNextPage,
  controls,
  labels,
  text,
  ...navProps
}: PaginationProps): PaginationView {
  return {
    className,
    children,
    controls,
    text,
    normalized: normalizePagination({page, perPage, totalCount, hasNextPage}),
    setPage,
    labels: {...DEFAULT_PAGINATION_LABELS, ...labels},
    navProps,
  };
}
