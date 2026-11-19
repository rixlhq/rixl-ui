/** Names of the landmark and controls, and the default info text. */
export type PaginationLabels = {
  /** Accessible name of the nav landmark. */
  navigation: string;
  firstPage: string;
  previousPage: string;
  nextPage: string;
  lastPage: string;
  /** Accessible name of the page input and the page dropdown. */
  pageNumber: string;
  /** Visible and accessible name of the page-size Select. */
  pageSize: string;
  /** Default info text when the total is unknown. */
  page: (page: number) => string;
  /** Default info text for a known total; `range` is already formatted, for example `21–25`. */
  showing: (range: string, total: number) => string;
};

export const DEFAULT_PAGINATION_LABELS: PaginationLabels = {
  navigation: "Pagination",
  firstPage: "Go to first page",
  previousPage: "Go to previous page",
  nextPage: "Go to next page",
  lastPage: "Go to last page",
  pageNumber: "Page number",
  pageSize: "Rows per page",
  page: (page) => `Page ${page}`,
  showing: (range, total) => `Showing ${range} of ${total}`,
};
