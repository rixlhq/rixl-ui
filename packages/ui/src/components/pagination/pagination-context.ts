import {createContext} from "react";
import type {RixlTranslations} from "../locale";
import type {NormalizedPagination} from "./normalize-pagination";

/** Names of the landmark and controls, and the default info text; see `RixlTranslations["pagination"]`. */
export type PaginationLabels = RixlTranslations["pagination"];

export type PaginationContextValue = NormalizedPagination & {
  /** Called with the 1-indexed target page. */
  setPage: (page: number) => void;
  labels: PaginationLabels;
};

export const PaginationContext = createContext<PaginationContextValue | null>(null);
