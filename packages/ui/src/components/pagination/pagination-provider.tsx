import type {ReactNode} from "react";
import {PaginationContext, type PaginationContextValue} from "./pagination-context";
import type {NormalizedPagination} from "./normalize-pagination";

export type PaginationLabels = Pick<PaginationContextValue, "firstLabel" | "prevLabel" | "nextLabel" | "lastLabel">;

export type PaginationProviderProps = {
  normalized: NormalizedPagination;
  onPageChange: (page: number) => void;
  labels: PaginationLabels;
  children: ReactNode;
};

export function PaginationProvider({normalized, onPageChange, labels, children}: PaginationProviderProps) {
  return (
    <PaginationContext.Provider
      value={{
        page: normalized.page,
        totalPages: normalized.totalPages,
        pageSize: normalized.pageSize,
        totalCount: normalized.totalCount,
        isRecordModel: normalized.isRecordModel,
        onPageChange,
        ...labels,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}
