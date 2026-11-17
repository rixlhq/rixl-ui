import {forwardRef, type ComponentProps, type ReactNode} from "react";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, type LucideIcon} from "lucide-react";
import {cn} from "cn";
import {Button} from "../button";

export type PaginationProps = ComponentProps<"nav"> & {
  /** 1-based current page. Clamped for display when out of range. */
  currentPage: number;
  /** Total page count; 0 renders the empty state with next/last disabled. */
  totalPages: number;
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

type LimitSelectorProps = {
  limit: number;
  setLimit: (limit: number) => void;
  limitOptions: number[];
  limitLabel: string;
};

/** Native select so the primitive ships no overlay dependency; override via `renderLimitSelector`. */
function PaginationLimitSelector({limit, setLimit, limitOptions, limitLabel}: LimitSelectorProps) {
  return (
    <label
      data-slot="pagination-limit"
      className="flex items-center gap-2 text-sm text-rixl-fg-muted transition-colors duration-rixl-fast ease-rixl-out"
    >
      {limitLabel}
      <select
        aria-label={limitLabel}
        value={limit}
        onChange={(event) => setLimit(Number(event.target.value))}
        className="h-9 cursor-pointer rounded-rixl-md border border-rixl-border bg-rixl-bg px-2 text-sm text-rixl-fg transition-[border-color,background-color,color] duration-rixl-fast ease-rixl-out outline-none focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px] motion-reduce:transition-none"
      >
        {limitOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type LimitNodeProps = {
  showLimitSelector?: boolean;
  renderLimitSelector?: ReactNode;
  limit?: number;
  setLimit?: (limit: number) => void;
  limitOptions: number[];
  limitLabel: string;
};

function PaginationLimitNode({showLimitSelector, renderLimitSelector, limit, setLimit, limitOptions, limitLabel}: LimitNodeProps) {
  if (renderLimitSelector) return <>{renderLimitSelector}</>;
  const showLimit = showLimitSelector ?? (limit !== undefined && setLimit !== undefined);
  if (!showLimit || limit === undefined || setLimit === undefined) return null;
  return <PaginationLimitSelector limit={limit} setLimit={setLimit} limitOptions={limitOptions} limitLabel={limitLabel} />;
}

type NavButtonProps = {
  label: string;
  target: number;
  disabled: boolean;
  onPageChange: (page: number) => void;
  Icon: LucideIcon;
};

function PaginationNavButton({label, target, disabled, onPageChange, Icon}: NavButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="min-h-11 min-w-11"
      onClick={() => onPageChange(target)}
      disabled={disabled}
      aria-label={label}
    >
      <Icon className="rtl:-scale-x-100" />
    </Button>
  );
}

type ControlsProps = {
  currentPage: number;
  safeTotal: number;
  onPageChange: (page: number) => void;
  firstLabel: string;
  prevLabel: string;
  nextLabel: string;
  lastLabel: string;
};

function PaginationControls({currentPage, safeTotal, onPageChange, firstLabel, prevLabel, nextLabel, lastLabel}: ControlsProps) {
  const atFirst = currentPage <= 1;
  const atLast = currentPage >= safeTotal || safeTotal === 0;
  const buttons: Omit<NavButtonProps, "onPageChange">[] = [
    {label: firstLabel, target: 1, disabled: atFirst, Icon: ChevronsLeft},
    {label: prevLabel, target: currentPage - 1, disabled: atFirst, Icon: ChevronLeft},
    {label: nextLabel, target: currentPage + 1, disabled: atLast, Icon: ChevronRight},
    {label: lastLabel, target: safeTotal, disabled: atLast, Icon: ChevronsRight},
  ];
  return (
    <div data-slot="pagination-controls" className="flex items-center gap-3">
      {buttons.map((button) => (
        <PaginationNavButton key={button.label} onPageChange={onPageChange} {...button} />
      ))}
    </div>
  );
}

/**
 * Rixl Pagination — first/prev/next/last pager with an optional page-size selector.
 *
 * A base primitive with no dashboard or i18n dependencies: every user-facing
 * string arrives via props (`navLabel`, `*Label`, `getPageLabel`), so consumers
 * wire their own message layer (e.g. paraglide `m["pagination.*"]`).
 *
 * Press feedback comes from `Button` (shared `--rixl-press-scale` token,
 * `duration-rixl-fast ease-rixl-out`, transform/opacity only, reduced-motion
 * snap); chevrons mirror in RTL via `rtl:-scale-x-100`.
 */
const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      limit,
      setLimit,
      limitOptions = [10, 20, 50, 100],
      showLimitSelector,
      renderLimitSelector,
      navLabel = "Pagination",
      firstLabel = "Go to first page",
      prevLabel = "Go to previous page",
      nextLabel = "Go to next page",
      lastLabel = "Go to last page",
      limitLabel = "Rows per page",
      getPageLabel = (current, total) => `Page ${total === 0 ? 0 : current} of ${total}`,
      ...props
    },
    ref
  ) => {
    const safeTotal = Math.max(0, Math.floor(totalPages));
    const limitNodeProps = {showLimitSelector, renderLimitSelector, limit, setLimit, limitOptions, limitLabel};
    return (
      <nav
        ref={ref}
        data-slot="pagination"
        aria-label={navLabel}
        className={cn("flex w-full flex-col items-center justify-end gap-6 md:flex-row", className)}
        {...props}
      >
        <PaginationLimitNode {...limitNodeProps} />
        <span data-slot="pagination-label" aria-live="polite" aria-atomic="true" className="mx-2 text-sm font-medium text-rixl-fg">
          {getPageLabel(currentPage, safeTotal)}
        </span>
        <PaginationControls
          currentPage={currentPage}
          safeTotal={safeTotal}
          onPageChange={onPageChange}
          firstLabel={firstLabel}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
          lastLabel={lastLabel}
        />
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";

export {Pagination};
