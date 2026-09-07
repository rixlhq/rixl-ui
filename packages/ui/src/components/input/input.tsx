import type {ComponentProps} from "react";
import {Input as InputPrimitive} from "@base-ui-components/react/input";
import {cn} from "cn";

/**
 * Rixl Input — the single-line text input primitive.
 *
 * Ported from dashboard's shadcn Input (Base UI Input). Class names
 * swapped to `--rixl-*` tokens; `dark:*` variants dropped (rixl
 * re-evaluates every token under `[data-theme="dark"]`).
 *
 * Focus and invalid states follow the dashboard pattern:
 * - `focus-visible` → 3px ring in the primary color.
 * - `aria-invalid="true"` → 3px danger ring + faint danger tint.
 */
function Input({className, type, ...props}: ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "file:text-rixl-fg placeholder:text-rixl-fg-muted selection:bg-rixl-primary selection:text-rixl-primary-fg border-rixl-border flex h-9 w-full min-w-0 rounded-rixl-md border bg-transparent px-3 py-1 text-base shadow-rixl-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger aria-invalid:ring-[3px] aria-invalid:bg-rixl-danger/10",
        className
      )}
      {...props}
    />
  );
}

export {Input};
export type InputProps = ComponentProps<"input">;
