import {forwardRef, type ComponentProps} from "react";
import {cn} from "cn";
import {usePaginationContext} from "./use-pagination-context";
import type {PaginationContextValue} from "./pagination-context";

export type PaginationInfoProps = ComponentProps<"span"> & {
  /** Page indicator text. Defaults to `Page <current> of <total>` (`Page 0 of 0` when empty). */
  getPageLabel?: (current: number, total: number) => string;
};

function getRecordText(pagination: PaginationContextValue | null): string | null {
  if (!pagination?.isRecordModel) return null;
  const {page, pageSize, totalCount} = pagination;
  if (pageSize === undefined || totalCount === undefined) return null;
  if (totalCount === 0) return `Showing 0–0 of ${totalCount}`;
  return `Showing ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, totalCount)} of ${totalCount}`;
}

function getInfoText(pagination: PaginationContextValue | null, getPageLabel: (current: number, total: number) => string) {
  return getRecordText(pagination) ?? getPageLabel(pagination?.page ?? 0, pagination?.totalPages ?? 0);
}

export const PaginationInfo = forwardRef<HTMLSpanElement, PaginationInfoProps>(
  ({className, children, getPageLabel = (current, total) => `Page ${total === 0 ? 0 : current} of ${total}`, ...props}, ref) => {
    const text = getInfoText(usePaginationContext(), getPageLabel);
    return (
      <span
        ref={ref}
        data-slot="pagination-info"
        aria-live="polite"
        aria-atomic="true"
        className={cn("mx-2 text-sm font-medium text-rixl-fg", className)}
        {...props}
      >
        {children ?? text}
      </span>
    );
  }
);
PaginationInfo.displayName = "PaginationInfo";
