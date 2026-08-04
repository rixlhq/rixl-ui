import {useState} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@rixl/ui/collapsible";
import {Group, Section} from "./_layout";

export const path = "collapsible";
export const title = "Collapsible";
export const group = "Navigation";

export function Showcase() {
  const [open, setOpen] = useState(false);
  return (
    <Section
      title="Collapsible"
      description="Expand/collapse region built on Base UI Collapsible. Unstyled primitive — style the trigger and content as needed."
    >
      <Group label="Uncontrolled">
        <Collapsible>
          <CollapsibleTrigger className="select-none rounded-rixl-md border border-rixl-border bg-rixl-surface px-4 py-2 text-sm font-medium text-rixl-fg hover:bg-rixl-surface-muted">
            Toggle section
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 max-w-sm rounded-rixl-md border border-rixl-border bg-rixl-surface p-4 shadow-rixl-xs">
            <p className="text-sm text-rixl-fg">This content expands and collapses.</p>
            <p className="mt-2 text-sm text-rixl-fg-muted">The panel keeps its mounted state; height is animated by Base UI.</p>
          </CollapsibleContent>
        </Collapsible>
      </Group>

      <Group label="Controlled">
        <div className="flex items-center gap-3">
          <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger className="select-none rounded-rixl-md border border-rixl-border bg-rixl-surface px-4 py-2 text-sm font-medium text-rixl-fg hover:bg-rixl-surface-muted">
              {open ? "Hide details" : "Show details"}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 max-w-sm rounded-rixl-md border border-rixl-border bg-rixl-surface p-4 shadow-rixl-xs">
              <p className="text-sm text-rixl-fg">Controlled from a useState hook.</p>
            </CollapsibleContent>
          </Collapsible>
          <span className="text-xs text-rixl-fg-subtle">open = {String(open)}</span>
        </div>
      </Group>
    </Section>
  );
}