import {forwardRef, type ComponentProps} from "react";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
import {PaginationNavButton} from "./pagination-nav-button";
import {PaginationPageInput} from "./pagination-page-input";
import {PaginationPageSelect} from "./pagination-page-select";
import {usePaginationContext} from "./use-pagination-context";

export type PaginationControlsProps = Omit<ComponentProps<"div">, "children"> & {
  /** `full` renders first, previous, a page input, next and last; `simple` renders previous and next. Default `full`. */
  controls?: "full" | "simple";
  /** `dropdown` renders a Select of pages in place of the page input. Default `input`. */
  pageSelector?: "input" | "dropdown";
};

export const PaginationControls = forwardRef<HTMLDivElement, PaginationControlsProps>(function PaginationControls(
  {controls = "full", pageSelector = "input", ...props},
  ref
) {
  const {page, totalPages, hasNextPage, setPage, labels} = usePaginationContext();
  // Without a total, users can only step: first, last and the page selector would need pages that are not known.
  const jumpTo = controls === "full" && totalPages !== undefined;
  const atFirst = page <= 1;
  return (
    <div ref={ref} data-slot="pagination-controls" className="flex items-center gap-3" {...props}>
      {jumpTo && <PaginationNavButton target={1} setPage={setPage} Icon={ChevronsLeft} aria-label={labels.firstPage} disabled={atFirst} />}
      <PaginationNavButton target={page - 1} setPage={setPage} Icon={ChevronLeft} aria-label={labels.previousPage} disabled={atFirst} />
      {jumpTo &&
        (pageSelector === "dropdown" ? (
          <PaginationPageSelect totalPages={totalPages} />
        ) : (
          <PaginationPageInput aria-label={labels.pageNumber} />
        ))}
      <PaginationNavButton target={page + 1} setPage={setPage} Icon={ChevronRight} aria-label={labels.nextPage} disabled={!hasNextPage} />
      {jumpTo && (
        <PaginationNavButton
          target={totalPages}
          setPage={setPage}
          Icon={ChevronsRight}
          aria-label={labels.lastPage}
          disabled={!hasNextPage}
        />
      )}
    </div>
  );
});
PaginationControls.displayName = "PaginationControls";
