import {forwardRef, type ComponentProps} from "react";
import {cn} from "../../lib/cn";

export type InputGroupAddonProps = ComponentProps<"span"> & {
  /** Which side of the input the addon sits on, regardless of its position among the group's children. */
  align?: "start" | "end";
};

export const InputGroupAddon = forwardRef<HTMLSpanElement, InputGroupAddonProps>(({className, align = "start", ...props}, ref) => (
  <span
    ref={ref}
    data-slot="input-group-addon"
    data-align={align}
    className={cn(
      "flex shrink-0 items-center gap-1.5 text-rixl-fg-muted select-none [&_svg]:size-4 [&_svg]:shrink-0",
      align === "end" ? "order-last" : "order-first",
      className
    )}
    {...props}
  />
));
InputGroupAddon.displayName = "InputGroupAddon";
