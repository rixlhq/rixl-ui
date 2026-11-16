import {Collapsible as CollapsiblePrimitive} from "@base-ui/react/collapsible";
import {cn} from "cn";

/**
 * Rixl Collapsible — expand/collapse primitive built on Base UI Collapsible.
 *
 * `CollapsibleContent` animates height and opacity via Base UI's
 * `--collapsible-panel-height` and `data-starting-style` / `data-ending-style`
 * attributes, and snaps under `prefers-reduced-motion`.
 */
function Collapsible({...props}: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({...props}: CollapsiblePrimitive.Trigger.Props) {
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />;
}

function CollapsibleContent({className, ...props}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
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
}

export type CollapsibleProps = CollapsiblePrimitive.Root.Props;
export type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props;
export type CollapsibleContentProps = CollapsiblePrimitive.Panel.Props;

export {Collapsible, CollapsibleTrigger, CollapsibleContent};
