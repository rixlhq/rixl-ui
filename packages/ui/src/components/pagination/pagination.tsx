import {forwardRef, type ComponentProps, type ReactNode} from "react";
import {cn} from "cn";
import {PaginationInfo} from "./pagination-info";
import {PaginationControls} from "./pagination-controls";
import {PaginationLimitNode} from "./pagination-limit-node";
import {PaginationProvider} from "./pagination-provider";
import {usePaginationView} from "./use-pagination-view";

export type PaginationProps = ComponentProps<"nav"> & {
  /** 1-based current page. Clamped for display when out of range. */
  page?: number;
  /** Legacy alias for `page`. */
  currentPage?: number;
  /** Total page count; 0 renders the empty state with next/last disabled. */
  totalPages?: number;
  /** Page size for the record model. */
  pageSize?: number;
  /** Total record count for the record model. */
  totalCount?: number;
  /** Called with the 1-based target page. */
  onPageChange: (page: number) => void;
  /** Controlled page size. Shown only together with `setLimit`. */
  limit?: number;
  /** Called with the newly selected page size. */
  setLimit?: (limit: number) => void;
  /** Page-size choices offered by the built-in limit selector. */
  limitOptions?: number[];
  /** Force the built-in limit selector on/off. Defaults to on when `limit` and `setLimit` are both set. */
  showLimitSelector?: boolean;
  /** Replaces the built-in limit selector (e.g. with an `@rixl/ui/select`). */
  renderLimitSelector?: ReactNode;
  /** Accessible name of the nav landmark. */
  navLabel?: string;
  /** Accessible names of the four navigation buttons. */
  firstLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  lastLabel?: string;
  /** Visible + accessible label of the built-in limit selector. */
  limitLabel?: string;
  /** Page indicator text. Defaults to `Page <current> of <total>` (`Page 0 of 0` when empty). */
  getPageLabel?: (current: number, total: number) => string;
};

/**
 * Rixl Pagination — first/prev/next/last pager with an optional page-size selector.
 *
 * A base primitive with no dashboard or i18n dependencies: every user-facing
 * string arrives via props (`navLabel`, `*Label`, `getPageLabel`), so consumers
 * wire their own message layer (e.g. paraglide `m["pagination.*"]`).
 *
 * Composes `PaginationInfo`, `PaginationControls`, `PaginationPageSize` and
 * `PaginationPageInput` from a single normalized page model; the legacy
 * `currentPage`/`totalPages` props keep rendering the same parts.
 *
 * Press feedback comes from `Button` (shared `--rixl-press-scale` token,
 * `duration-rixl-fast ease-rixl-out`, transform/opacity only, reduced-motion
 * snap); chevrons mirror in RTL via `rtl:-scale-x-100`.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>((props, ref) => {
  const {className, children, navLabel, getPageLabel, normalized, onPageChange, labels, limitNodeProps, navProps} =
    usePaginationView(props);
  return (
    <nav
      ref={ref}
      data-slot="pagination"
      aria-label={navLabel}
      className={cn("flex w-full flex-col items-center justify-end gap-6 md:flex-row", className)}
      {...navProps}
    >
      <PaginationProvider normalized={normalized} onPageChange={onPageChange} labels={labels}>
        <PaginationLimitNode {...limitNodeProps} />
        {children ?? (
          <>
            <PaginationInfo getPageLabel={getPageLabel} />
            <PaginationControls />
          </>
        )}
      </PaginationProvider>
    </nav>
  );
});
Pagination.displayName = "Pagination";
