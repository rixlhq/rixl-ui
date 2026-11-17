import {forwardRef} from "react";
import {cn} from "cn";
import {CollapsiblePanel, type CollapsiblePanelProps} from "./collapsible-panel";

export type CollapsibleDefaultPanelProps = CollapsiblePanelProps;
export const CollapsibleDefaultPanel = forwardRef<HTMLDivElement, CollapsibleDefaultPanelProps>(function CollapsibleDefaultPanel(
  {className, children, ...props},
  ref
) {
  return (
    <CollapsiblePanel ref={ref} data-slot="collapsible-default-panel" className={cn(className)} {...props}>
      <div data-slot="collapsible-default-panel-accent" className="ms-2 border-s-2 border-rixl-border ps-4">
        {children}
      </div>
    </CollapsiblePanel>
  );
});
CollapsibleDefaultPanel.displayName = "CollapsibleDefaultPanel";
