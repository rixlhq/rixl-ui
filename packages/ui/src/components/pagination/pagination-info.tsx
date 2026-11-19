import {forwardRef, type ComponentProps, type ReactNode} from "react";
import {cn} from "../../lib/cn";
import {usePaginationContext} from "./use-pagination-context";
import type {PaginationContextValue} from "./pagination-context";
import type {PaginationLabels} from "./pagination-labels";

export type PaginationInfoState = Pick<PaginationContextValue, "page" | "perPage" | "totalCount" | "totalPages" | "pageShowingRange">;

export type PaginationInfoProps = Omit<ComponentProps<"span">, "children"> & {
  /** Text, or a function of the page state. Defaults to `Showing <range> of <total>`, or `Page <n>` when the total is unknown. */
  children?: ReactNode | ((state: PaginationInfoState) => ReactNode);
};

function getDefaultText({page, totalCount, pageShowingRange}: PaginationInfoState, labels: PaginationLabels) {
  return pageShowingRange === undefined || totalCount === undefined ? labels.page(page) : labels.showing(pageShowingRange, totalCount);
}

export const PaginationInfo = forwardRef<HTMLSpanElement, PaginationInfoProps>(({className, children, ...props}, ref) => {
  const {page, perPage, totalCount, totalPages, pageShowingRange, labels} = usePaginationContext();
  const state = {page, perPage, totalCount, totalPages, pageShowingRange};
  const content = typeof children === "function" ? children(state) : (children ?? getDefaultText(state, labels));
  return (
    <span
      ref={ref}
      data-slot="pagination-info"
      aria-live="polite"
      aria-atomic="true"
      className={cn("mx-2 text-sm font-medium text-rixl-fg", className)}
      {...props}
    >
      {content}
    </span>
  );
});
PaginationInfo.displayName = "PaginationInfo";
