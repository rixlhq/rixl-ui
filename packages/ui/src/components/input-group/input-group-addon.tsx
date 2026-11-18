import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";

export const InputGroupAddon = forwardRef<HTMLSpanElement, ComponentProps<"span">>(({className, ...props}, ref) => (
  <span
    ref={ref}
    data-slot="input-group-addon"
    className={cn("flex shrink-0 items-center gap-1.5 text-rixl-fg-muted select-none [&_svg]:size-4 [&_svg]:shrink-0", className)}
    {...props}
  />
));
InputGroupAddon.displayName = "InputGroupAddon";

export type InputGroupAddonProps = ComponentProps<"span">;
