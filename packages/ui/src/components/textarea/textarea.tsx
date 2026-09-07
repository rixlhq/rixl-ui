import type {ComponentProps} from "react";
import {cn} from "cn";

/**
 * Rixl Textarea — the multi-line text input primitive.
 *
 * Ported from dashboard's shadcn Textarea (native `<textarea>`, no
 * Base UI primitive). Uses `field-sizing-content` so the field grows
 * with its content. Class names swapped to `--rixl-*` tokens; `dark:*`
 * variants dropped.
 */
function Textarea({className, ...props}: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-rixl-border placeholder:text-rixl-fg-muted focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger flex field-sizing-content min-h-16 w-full rounded-rixl-md border bg-transparent px-3 py-2 text-base shadow-rixl-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export {Textarea};
export type TextareaProps = ComponentProps<"textarea">;
