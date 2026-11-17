export type PaginationModel = {
  /** 1-based requested page. */
  page?: number;
  /** Legacy alias for `page`. */
  currentPage?: number;
  /** Total page count for the legacy model. */
  totalPages?: number;
  /** Page size for the record model (or the legacy `limit`). */
  pageSize?: number;
  /** Legacy alias for `pageSize`. */
  limit?: number;
  /** Total record count for the record model. */
  totalCount?: number;
};

export type NormalizedPagination = {
  /** Effective 1-based page clamped into range (0 when there are no pages). */
  page: number;
  totalPages: number;
  pageSize?: number;
  totalCount?: number;
  /** True when the record model (`totalCount`) supplies the totals. */
  isRecordModel: boolean;
};

export function normalizePagination(model: PaginationModel): NormalizedPagination {
  const {page, currentPage, totalPages, pageSize, limit, totalCount} = model;
  const size = pageSize ?? limit;
  const requested = page ?? currentPage ?? 1;
  if (totalCount !== undefined) {
    const count = Math.max(0, Math.floor(totalCount));
    const total = size !== undefined && size > 0 ? Math.ceil(count / size) : 0;
    return {
      page: total === 0 ? 0 : Math.min(Math.max(1, Math.floor(requested)), total),
      totalPages: total,
      pageSize: size,
      totalCount: count,
      isRecordModel: true,
    };
  }
  const total = Math.max(0, Math.floor(totalPages ?? 0));
  return {
    page: total === 0 ? 0 : Math.min(Math.max(1, Math.floor(requested)), total),
    totalPages: total,
    pageSize: size,
    totalCount: undefined,
    isRecordModel: false,
  };
}
