import {createContext} from "react";

export type PaginationContextValue = {
  /** 1-based effective page, clamped into range (0 when there are no pages). */
  page: number;
  /** Total page count (0 when empty). */
  totalPages: number;
  /** Page size when the record model is used. */
  pageSize?: number;
  /** Total record count when the record model is used. */
  totalCount?: number;
  /** True when the record model (`totalCount`) supplies the totals. */
  isRecordModel: boolean;
  /** Called with the 1-based target page. */
  onPageChange: (page: number) => void;
  firstLabel: string;
  prevLabel: string;
  nextLabel: string;
  lastLabel: string;
};

export const PaginationContext = createContext<PaginationContextValue | null>(null);
