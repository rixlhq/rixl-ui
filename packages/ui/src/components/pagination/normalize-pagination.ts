/** Either a known total (`totalCount` with the `perPage` that splits it), or an unknown one (`hasNextPage`). */
export type PaginationTotals =
  | {
      /** Total number of items across all pages. */
      totalCount: number;
      /** Number of items per page. */
      perPage: number;
      /** Ignored: with a total, the last page is known. */
      hasNextPage?: boolean;
    }
  | {
      totalCount?: undefined;
      perPage?: number;
      /** Whether another page exists when the total is unknown. */
      hasNextPage?: boolean;
    };

export type PaginationModel = {
  /** 1-indexed requested page. */
  page?: number;
  totalCount?: number;
  perPage?: number;
  hasNextPage?: boolean;
};

export type NormalizedPagination = {
  /** Effective 1-indexed page, clamped into range when the total is known. */
  page: number;
  perPage?: number;
  totalCount?: number;
  /** Page count, at least 1; `undefined` when the total is unknown. */
  totalPages?: number;
  hasNextPage: boolean;
  /** Items on the current page, such as `11–20`; `undefined` when the total is unknown. */
  pageShowingRange?: string;
};

export function normalizePagination({page = 1, perPage, totalCount, hasNextPage = false}: PaginationModel): NormalizedPagination {
  const requested = Math.max(1, Math.floor(page));
  if (totalCount === undefined || !perPage) return {page: requested, perPage, hasNextPage};
  const count = Math.max(0, Math.floor(totalCount));
  const totalPages = Math.max(1, Math.ceil(count / perPage));
  const current = Math.min(requested, totalPages);
  const first = (current - 1) * perPage + 1;
  return {
    page: current,
    perPage,
    totalCount: count,
    totalPages,
    hasNextPage: current < totalPages,
    pageShowingRange: count === 0 ? "0–0" : `${first}–${Math.min(current * perPage, count)}`,
  };
}
