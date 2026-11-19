import {forwardRef} from "react";
import {Separator as SeparatorPrimitive} from "@base-ui/react/separator";
import {cn} from "../../lib/cn";

/**
 * Rixl Separator — a themed horizontal or vertical divider.
 *
 * Ported verbatim from dashboard's shadcn Separator (Base UI). Renders
 * a `<div role="separator">`. Orientation defaults to `"horizontal"`;
 * pass `orientation="vertical"` inside a flex row for a vertical rule.
 */
const Separator = forwardRef<HTMLDivElement, SeparatorProps>(({className, orientation = "horizontal", ...props}, ref) => (
  <SeparatorPrimitive
    ref={ref}
    data-slot="separator"
    orientation={orientation}
    className={cn(
      "bg-rixl-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
      className
    )}
    {...props}
  />
));
Separator.displayName = "Separator";

export {Separator};
export type SeparatorProps = SeparatorPrimitive.Props;
