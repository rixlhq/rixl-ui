import {forwardRef, type ComponentProps} from "react";
import {Field} from "@base-ui/react/field";
import {cn} from "../../lib/cn";

export type InputAreaControlProps = ComponentProps<"textarea">;
export const InputAreaControl = forwardRef<HTMLTextAreaElement, InputAreaControlProps>(({className, ...props}, ref) => (
  <Field.Control
    render={<textarea {...props} />}
    ref={ref}
    data-slot="input-area"
    className={cn(
      "border-rixl-border placeholder:text-rixl-fg-muted flex field-sizing-content min-h-16 w-full rounded-rixl-md border bg-transparent px-3 py-2 text-base sm:text-sm shadow-rixl-xs outline-none",
      "transition-[color,box-shadow,border-color] duration-rixl-fast ease-rixl-out",
      "hover:border-rixl-border-strong",
      "read-only:bg-rixl-surface-muted read-only:cursor-default read-only:hover:border-rixl-border",
      "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
      "aria-invalid:border-rixl-danger aria-invalid:ring-rixl-danger/20 aria-invalid:hover:border-rixl-danger",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
  />
));
InputAreaControl.displayName = "InputAreaControl";
