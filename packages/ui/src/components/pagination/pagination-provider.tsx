import type {ReactNode} from "react";
import {PaginationContext} from "./pagination-context";
import type {PaginationLabels} from "./pagination-labels";
import type {NormalizedPagination} from "./normalize-pagination";

export type PaginationProviderProps = {
  normalized: NormalizedPagination;
  setPage: (page: number) => void;
  labels: PaginationLabels;
  children: ReactNode;
};

export function PaginationProvider({normalized, setPage, labels, children}: PaginationProviderProps) {
  return <PaginationContext.Provider value={{...normalized, setPage, labels}}>{children}</PaginationContext.Provider>;
}
