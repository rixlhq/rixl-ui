import type {PaginationProps} from "./pagination";
import {normalizePagination, type NormalizedPagination} from "./normalize-pagination";
import type {PaginationLabels} from "./pagination-provider";
import type {PaginationLimitNodeProps} from "./pagination-limit-node";

export type PaginationView = {
  className?: string;
  children?: PaginationProps["children"];
  navLabel: string;
  getPageLabel?: (current: number, total: number) => string;
  normalized: NormalizedPagination;
  onPageChange: (page: number) => void;
  labels: PaginationLabels;
  limitNodeProps: PaginationLimitNodeProps;
  navProps: Record<string, unknown>;
};

export function usePaginationView({
  className,
  children,
  page,
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  onPageChange,
  limit,
  setLimit,
  limitOptions = [10, 20, 50, 100],
  showLimitSelector,
  renderLimitSelector,
  navLabel = "Pagination",
  firstLabel = "Go to first page",
  prevLabel = "Go to previous page",
  nextLabel = "Go to next page",
  lastLabel = "Go to last page",
  limitLabel = "Rows per page",
  getPageLabel,
  ...navProps
}: PaginationProps): PaginationView {
  return {
    className,
    children,
    navLabel,
    getPageLabel,
    normalized: normalizePagination({page, currentPage, totalPages, pageSize, limit, totalCount}),
    onPageChange,
    labels: {firstLabel, prevLabel, nextLabel, lastLabel},
    limitNodeProps: {showLimitSelector, renderLimitSelector, limit, setLimit, limitOptions, limitLabel},
    navProps,
  };
}
