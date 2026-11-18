import {forwardRef} from "react";
import {Collapsible as CollapsiblePrimitive} from "@base-ui/react/collapsible";
import {cn} from "../../lib/cn";

export type CollapsiblePanelProps = CollapsiblePrimitive.Panel.Props;
export const CollapsiblePanel = forwardRef<HTMLDivElement, CollapsiblePanelProps>(function CollapsiblePanel({className, ...props}, ref) {
  return (
    <CollapsiblePrimitive.Panel
      ref={ref}
      data-slot="collapsible-content"
      className={cn(
        "h-[var(--collapsible-panel-height)] overflow-hidden",
        "transition-[height,opacity] duration-rixl-base ease-rixl-out motion-reduce:transition-none",
        "data-starting-style:h-0 data-starting-style:opacity-0",
        "data-ending-style:h-0 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  );
});
CollapsiblePanel.displayName = "CollapsiblePanel";
