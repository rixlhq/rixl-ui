import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";
import type {PaginationLabels} from "./pagination-labels";
import {PaginationControls, type PaginationControlsProps} from "./pagination-controls";
import {PaginationInfo, type PaginationInfoProps} from "./pagination-info";
import type {PaginationTotals} from "./normalize-pagination";
import {PaginationProvider} from "./pagination-provider";
import {usePaginationView} from "./use-pagination-view";

export type PaginationProps = ComponentProps<"nav"> &
  PaginationTotals & {
    /** 1-indexed current page. Clamped for display when out of range. Defaults to 1. */
    page?: number;
    /** Called with the 1-indexed target page. */
    setPage: (page: number) => void;
    /** `full` renders first, previous, a page input, next and last; `simple` renders previous and next. Default layout only. */
    controls?: PaginationControlsProps["controls"];
    /** Names for the landmark and the controls, and the default info text. Each defaults to the locale provider's string, then English. */
    labels?: Partial<PaginationLabels>;
    /** Info text for the default layout. Compose `PaginationInfo` instead when you pass `children`. */
    text?: PaginationInfoProps["children"];
  };

/**
 * Rixl Pagination — page navigation with Kumo's props.
 *
 * Pass `totalCount` with `perPage`, or `hasNextPage` when the total is
 * unknown (previous and next only). Without `children` it renders
 * `PaginationInfo` and `PaginationControls`; pass children to compose
 * `PaginationInfo`, `PaginationPageSize`, `PaginationSeparator` and
 * `PaginationControls` in any order. Every string arrives through `labels`
 * (or the render functions of `text` and `PaginationInfo`), so consumers wire
 * their own message layer.
 *
 * Press feedback comes from `Button` (shared `--rixl-press-scale` token,
 * `duration-(--rixl-motion-fast) ease-out`, transform/opacity only, reduced-motion
 * snap); chevrons mirror in RTL via `rtl:-scale-x-100`.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>((props, ref) => {
  const {className, children, controls, text, normalized, setPage, labels, navProps} = usePaginationView(props);
  return (
    <nav
      ref={ref}
      data-slot="pagination"
      aria-label={labels.navigation}
      className={cn("flex w-full flex-col items-center justify-end gap-6 md:flex-row", className)}
      {...navProps}
    >
      <PaginationProvider normalized={normalized} setPage={setPage} labels={labels}>
        {children ?? (
          <>
            <PaginationInfo>{text}</PaginationInfo>
            <PaginationControls controls={controls} />
          </>
        )}
      </PaginationProvider>
    </nav>
  );
});
Pagination.displayName = "Pagination";
