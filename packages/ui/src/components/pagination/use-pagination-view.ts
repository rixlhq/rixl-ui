import type {PaginationProps} from "./pagination";
import {normalizePagination, type NormalizedPagination} from "./normalize-pagination";
import {useTranslations} from "../locale/use-translations";
import type {PaginationLabels} from "./pagination-context";

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
  const mergedLabels = useTranslations("pagination", labels);
  return {
    className,
    children,
    controls,
    text,
    normalized: normalizePagination({page, perPage, totalCount, hasNextPage}),
    setPage,
    labels: mergedLabels,
    navProps,
  };
}
