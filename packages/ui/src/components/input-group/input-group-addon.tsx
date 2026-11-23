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
      align === "end" ? "order-last pe-2" : "order-first ps-2",
      // A button carries its own hit area and sits on the group's inset.
      "has-[[data-slot=input-group-button]]:self-stretch has-[[data-slot=input-group-button]]:p-0",
      className
    )}
    {...props}
  />
));
InputGroupAddon.displayName = "InputGroupAddon";
