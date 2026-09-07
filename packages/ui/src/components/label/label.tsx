import type {ComponentProps} from "react";
import {cn} from "cn";

/**
 * Rixl Label — the form-field label primitive.
 *
 * Ported verbatim from dashboard's shadcn Label. Renders a real
 * `<label>`; consumers wire it to a control via `htmlFor` (or by
 * nesting a control). Two contextual dim states are supported without
 * extra props:
 *
 * - Inside a `data-disabled="true"` ancestor with class `group`, dims
 *   via `group-data-[disabled=true]:*`.
 * - Adjacent to a `.peer` sibling that is disabled, dims via
 *   `peer-disabled:*`.
 */
function Label({className, ...props}: ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export {Label};
export type LabelProps = ComponentProps<"label">;
