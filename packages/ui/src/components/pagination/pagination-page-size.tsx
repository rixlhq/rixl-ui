import {forwardRef, useId} from "react";
import {cn} from "../../lib/cn";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue, type SelectTriggerProps} from "../select";
import {usePaginationContext} from "./use-pagination-context";

const DEFAULT_PAGE_SIZES = [25, 50, 100, 250];

export type PaginationPageSizeProps = Omit<SelectTriggerProps, "children" | "value" | "onChange"> & {
  /** Current page size. */
  value: number;
  /** Called with the chosen page size. Reset `page` here if the new size should start from page 1. */
  onChange: (pageSize: number) => void;
  /** Page-size choices. Default `[25, 50, 100, 250]`. */
  options?: number[];
  /** Visible and accessible name. Defaults to `labels.pageSize` on `Pagination`. */
  label?: string;
};

/** A labelled Select of page sizes. The ref reaches the trigger button, which also receives the remaining props. */
export const PaginationPageSize = forwardRef<HTMLButtonElement, PaginationPageSizeProps>(function PaginationPageSize(
  {value, onChange, options = DEFAULT_PAGE_SIZES, label, className, ...props},
  ref
) {
  const triggerId = useId();
  const {labels} = usePaginationContext();
  return (
    <div data-slot="pagination-page-size" className="flex items-center gap-2 text-sm text-rixl-fg-muted">
      <label htmlFor={triggerId}>{label ?? labels.pageSize}</label>
      {/* Base UI keys items by string, so the number crosses the Select as text. */}
      <Select value={String(value)} onValueChange={(next) => onChange(Number(next))}>
        <SelectTrigger ref={ref} id={triggerId} className={cn("w-20", className)} {...props}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
});
PaginationPageSize.displayName = "PaginationPageSize";
