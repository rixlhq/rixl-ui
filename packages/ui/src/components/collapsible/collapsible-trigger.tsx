import {forwardRef} from "react";
import {Collapsible as CollapsiblePrimitive} from "@base-ui/react/collapsible";

export type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props;
export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(function CollapsibleTrigger(props, ref) {
  return <CollapsiblePrimitive.Trigger ref={ref} data-slot="collapsible-trigger" {...props} />;
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";
