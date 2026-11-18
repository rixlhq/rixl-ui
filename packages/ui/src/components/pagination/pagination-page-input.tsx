import {forwardRef, type KeyboardEvent} from "react";
import {cn} from "../../lib/cn";
import {Input, type InputProps} from "../input";
import {usePaginationContext} from "./use-pagination-context";
import {usePageDraft} from "./use-page-draft";

export type PaginationPageInputProps = InputProps;

function parseStrictPage(draft: string): number | null {
  const trimmed = draft.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  return Number(trimmed);
}

/** Strict integer page entry with invalid-draft recovery. */
export const PaginationPageInput = forwardRef<HTMLInputElement, PaginationPageInputProps>(
  ({onChange, onBlur, onKeyDown, className, ...props}, ref) => {
    const pagination = usePaginationContext();
    const totalPages = pagination?.totalPages ?? 0;
    const onPageChange = pagination?.onPageChange ?? (() => {});
    const {value, setDraft, resetDraft} = usePageDraft(pagination?.page ?? 0);

    const commit = (raw: string) => {
      const parsed = parseStrictPage(raw);
      if (parsed === null || totalPages === 0) {
        resetDraft();
        return;
      }
      const target = Math.min(Math.max(1, parsed), totalPages);
      setDraft(String(target));
      onPageChange(target);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") commit((event.target as HTMLInputElement).value);
      else if (event.key === "Escape") resetDraft();
      onKeyDown?.(event);
    };

    return (
      <Input
        ref={ref}
        data-slot="pagination-page-input"
        inputMode="numeric"
        className={cn("w-16", className)}
        value={value}
        onChange={(event) => {
          setDraft(event.target.value);
          onChange?.(event);
        }}
        onBlur={(event) => {
          commit(event.target.value);
          onBlur?.(event);
        }}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);
PaginationPageInput.displayName = "PaginationPageInput";
