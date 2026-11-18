import {forwardRef} from "react";
import {ChevronDown} from "lucide-react";
import {cn} from "../../lib/cn";
import {Button} from "../button";
import {CollapsibleTrigger, type CollapsibleTriggerProps} from "./collapsible-trigger";

export type CollapsibleDefaultTriggerProps = CollapsibleTriggerProps;

export const CollapsibleDefaultTrigger = forwardRef<HTMLButtonElement, CollapsibleDefaultTriggerProps>(function CollapsibleDefaultTrigger(
  {className, children, render, ...props},
  ref
) {
  return (
    <CollapsibleTrigger
      ref={ref}
      render={render ?? <Button variant="ghost" />}
      data-slot="collapsible-default-trigger"
      className={cn(
        "group flex w-full items-center justify-between gap-2 rounded-rixl-sm px-3 py-2 text-sm font-medium text-rixl-fg outline-none select-none",
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
    </CollapsibleTrigger>
  );
});
CollapsibleDefaultTrigger.displayName = "CollapsibleDefaultTrigger";
