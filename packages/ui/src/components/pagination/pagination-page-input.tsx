import {forwardRef, type ComponentProps, type KeyboardEvent} from "react";
import {usePaginationContext} from "./use-pagination-context";
import {usePageDraft} from "./use-page-draft";

export type PaginationPageInputProps = ComponentProps<"input">;

function parseStrictPage(draft: string): number | null {
  const trimmed = draft.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  return Number(trimmed);
}

/** Strict integer page entry with invalid-draft recovery. */
export const PaginationPageInput = forwardRef<HTMLInputElement, PaginationPageInputProps>(
  ({onChange, onBlur, onKeyDown, ...props}, ref) => {
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
      <input
        ref={ref}
        data-slot="pagination-page-input"
        inputMode="numeric"
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
