import {forwardRef} from "react";
import {Collapsible as CollapsiblePrimitive} from "@base-ui/react/collapsible";

export type CollapsibleProps = CollapsiblePrimitive.Root.Props;
export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(function Collapsible(props, ref) {
  return <CollapsiblePrimitive.Root ref={ref} data-slot="collapsible" {...props} />;
});
Collapsible.displayName = "Collapsible";

export {CollapsibleTrigger, type CollapsibleTriggerProps} from "./collapsible-trigger";
export {CollapsiblePanel, type CollapsiblePanelProps} from "./collapsible-panel";
export {CollapsibleDefaultTrigger, type CollapsibleDefaultTriggerProps} from "./collapsible-default-trigger";
export {CollapsibleDefaultPanel, type CollapsibleDefaultPanelProps} from "./collapsible-default-panel";
