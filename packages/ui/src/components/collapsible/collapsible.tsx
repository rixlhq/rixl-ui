import {Collapsible as CollapsiblePrimitive} from "@base-ui-components/react/collapsible";

/**
 * Rixl Collapsible — expand/collapse primitive built on Base UI Collapsible.
 * Ported verbatim from dashboard (no styles; the consumer styles its own
 * trigger and panel content).
 */
function Collapsible({...props}: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({...props}: CollapsiblePrimitive.Trigger.Props) {
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />;
}

function CollapsibleContent({...props}: CollapsiblePrimitive.Panel.Props) {
  return <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />;
}

export type CollapsibleProps = CollapsiblePrimitive.Root.Props;
export type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props;
export type CollapsibleContentProps = CollapsiblePrimitive.Panel.Props;

export {Collapsible, CollapsibleTrigger, CollapsibleContent};
