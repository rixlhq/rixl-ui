import {Collapsible as CollapsiblePrimitive} from "@base-ui/react/collapsible";
import {ChevronDown} from "lucide-react";
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
export type CollapsibleDefaultTriggerProps = CollapsiblePrimitive.Trigger.Props;
export type CollapsibleDefaultPanelProps = CollapsiblePrimitive.Panel.Props;

export {Collapsible, CollapsibleTrigger, CollapsibleContent};

/**
 * Opinionated trigger: a full-width row with a label and a caret that
 * rotates 180° while its panel is open (`data-panel-open` on the trigger
 * drives `group-data-[panel-open]`). The caret animates transform only
 * with `duration-rixl-base ease-rixl-out` and snaps under reduced motion.
 */
function CollapsibleDefaultTrigger({className, children, ...props}: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-default-trigger"
      className={cn(
        "group flex w-full items-center justify-between gap-2 rounded-rixl-sm px-3 py-2 text-sm font-medium text-rixl-fg outline-none select-none",
        "transition-colors duration-rixl-base ease-rixl-out motion-reduce:transition-none",
        "hover:bg-rixl-secondary",
        "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate text-start">{children}</span>
      <ChevronDown
        aria-hidden="true"
        className="size-4 shrink-0 text-rixl-fg-muted transition-transform duration-rixl-base ease-rixl-out motion-reduce:transition-none group-data-[panel-open]:rotate-180"
      />
    </CollapsiblePrimitive.Trigger>
  );
}

/**
 * Opinionated panel: the same height/opacity animation as
 * `CollapsibleContent` with a `border-s` accent rail around the body.
 * `keepMounted` passes through to Base UI, so closed content can stay in
 * the DOM (e.g. for find-in-page).
 *
 * The trigger lives outside this `overflow-hidden` root, so its
 * focus-visible ring is never clipped by the height animation.
 */
function CollapsibleDefaultPanel({className, children, ...props}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-default-panel"
      className={cn(
        "h-[var(--collapsible-panel-height)] overflow-hidden",
        "transition-[height,opacity] duration-rixl-base ease-rixl-out motion-reduce:transition-none",
        "data-starting-style:h-0 data-starting-style:opacity-0",
        "data-ending-style:h-0 data-ending-style:opacity-0",
        className
      )}
      {...props}
    >
      <div data-slot="collapsible-default-panel-accent" className="ms-2 border-s-2 border-rixl-border ps-4">
        {children}
      </div>
    </CollapsiblePrimitive.Panel>
  );
}

export {CollapsibleDefaultTrigger, CollapsibleDefaultPanel};
