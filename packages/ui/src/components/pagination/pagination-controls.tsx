import type {ComponentProps} from "react";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";
import {PaginationNavButton} from "./pagination-nav-button";
import {usePaginationContext} from "./use-pagination-context";
import type {PaginationContextValue} from "./pagination-context";

export type PaginationControlsProps = Omit<ComponentProps<"div">, "children"> & {
  /** `full` renders first/prev/next/last; `simple` renders prev/next only. */
  mode?: "full" | "simple";
  firstLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  lastLabel?: string;
};

type ControlLabels = {first: string; prev: string; next: string; last: string};

function resolveLabel(override: string | undefined, contextual: string | undefined, fallback: string) {
  return override ?? contextual ?? fallback;
}

function resolveControlLabels(
  pagination: PaginationContextValue | null,
  overrides: Pick<PaginationControlsProps, "firstLabel" | "prevLabel" | "nextLabel" | "lastLabel">
): ControlLabels {
  return {
    first: resolveLabel(overrides.firstLabel, pagination?.firstLabel, "Go to first page"),
    prev: resolveLabel(overrides.prevLabel, pagination?.prevLabel, "Go to previous page"),
    next: resolveLabel(overrides.nextLabel, pagination?.nextLabel, "Go to next page"),
    last: resolveLabel(overrides.lastLabel, pagination?.lastLabel, "Go to last page"),
  };
}

type ControlButton = {label: string; target: number; disabled: boolean; Icon: typeof ChevronLeft};

function getControlButtons(args: {page: number; totalPages: number; mode: "full" | "simple"; labels: ControlLabels}): ControlButton[] {
  const {page, totalPages, mode, labels} = args;
  const empty = totalPages === 0;
  const atFirst = empty || page <= 1;
  const atLast = empty || page >= totalPages;
  const prev = {label: labels.prev, target: Math.max(1, page - 1), disabled: atFirst, Icon: ChevronLeft};
  const next = {label: labels.next, target: Math.min(totalPages, page + 1), disabled: atLast, Icon: ChevronRight};
  if (mode === "simple") return [prev, next];
  return [
    {label: labels.first, target: 1, disabled: atFirst, Icon: ChevronsLeft},
    prev,
    next,
    {label: labels.last, target: Math.max(1, totalPages), disabled: atLast, Icon: ChevronsRight},
  ];
}

export function PaginationControls({mode = "full", firstLabel, prevLabel, nextLabel, lastLabel, ...props}: PaginationControlsProps) {
  const pagination = usePaginationContext();
  const labels = resolveControlLabels(pagination, {firstLabel, prevLabel, nextLabel, lastLabel});
  const buttons = getControlButtons({page: pagination?.page ?? 0, totalPages: pagination?.totalPages ?? 0, mode, labels});
  const onPageChange = pagination?.onPageChange ?? (() => {});
  return (
    <div data-slot="pagination-controls" className="flex items-center gap-3" {...props}>
      {buttons.map((button) => (
        <PaginationNavButton key={button.label} onPageChange={onPageChange} aria-label={button.label} {...button} />
      ))}
    </div>
  );
}
