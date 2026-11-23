import {createContext} from "react";
import type {NormalizedPagination} from "./normalize-pagination";
import type {PaginationLabels} from "./pagination-labels";

export type PaginationContextValue = NormalizedPagination & {
  /** Called with the 1-indexed target page. */
  setPage: (page: number) => void;
  labels: PaginationLabels;
};

export const PaginationContext = createContext<PaginationContextValue | null>(null);
