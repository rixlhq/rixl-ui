import {createContext} from "react";
import type {NormalizedPagination} from "./normalize-pagination";

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
};

export const DEFAULT_PAGINATION_LABELS: PaginationLabels = {
  navigation: "Pagination",
  firstPage: "Go to first page",
  previousPage: "Go to previous page",
  nextPage: "Go to next page",
  lastPage: "Go to last page",
  pageNumber: "Page number",
  pageSize: "Rows per page",
};

export type PaginationContextValue = NormalizedPagination & {
  /** Called with the 1-indexed target page. */
  setPage: (page: number) => void;
  labels: PaginationLabels;
};

export const PaginationContext = createContext<PaginationContextValue | null>(null);
