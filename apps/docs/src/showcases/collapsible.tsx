import {useState} from "react";
import {Badge} from "@rixl/ui/badge";
import {Button} from "@rixl/ui/button";
import {Card, CardContent} from "@rixl/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleDefaultTrigger,
  CollapsibleDefaultPanel,
} from "@rixl/ui/collapsible";
import type {ControlValue, Example} from "./registry";

export const path = "collapsible";
export const title = "Collapsible";
export const description =
  "Expand/collapse region built on Base UI Collapsible. Animates height and opacity smoothly via --collapsible-panel-height.";

export function Showcase() {
  return (
    <Collapsible className="w-full max-w-xs">
      <CollapsibleTrigger
        render={
          <Button variant="outline" size="sm">
            Toggle section
          </Button>
        }
      />
      <CollapsibleContent>
        <div className="pt-2">
          <Card className="py-3">
            <CardContent className="px-3 text-xs text-rixl-fg-muted">Expandable panel content.</CardContent>
          </Card>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function UncontrolledExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Collapsible className="w-full max-w-sm">
      <CollapsibleTrigger render={<Button variant="outline">Toggle section</Button>} />
      <CollapsibleContent>
        <div className="pt-2.5">
          <Card className="py-4">
            <CardContent className="space-y-1.5 px-4">
              <p className="text-sm font-medium text-rixl-fg">Smooth height & opacity transition</p>
              <p className="text-xs text-rixl-fg-muted">
                Driven by Base UI&apos;s <code>--collapsible-panel-height</code> CSS variable.
              </p>
            </CardContent>
          </Card>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function ControlledExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex items-center gap-3">
        <Collapsible open={open} onOpenChange={setOpen} className="w-full">
          <div className="flex items-center justify-between gap-2">
            <CollapsibleTrigger
              render={
                <Button variant="outline" size="sm">
                  {open ? "Hide details" : "Show details"}
                </Button>
              }
            />
            <Badge variant={open ? "success" : "secondary"}>open = {String(open)}</Badge>
          </div>
          <CollapsibleContent>
            <div className="pt-2.5">
              <Card className="py-4">
                <CardContent className="px-4 text-sm text-rixl-fg-muted">
                  Controlled from a <code>useState</code> hook with interruptible height animation.
                </CardContent>
              </Card>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

export const examples: Example[] = [
  {id: "uncontrolled", title: "Uncontrolled", render: UncontrolledExample},
  {id: "controlled", title: "Controlled", render: ControlledExample},
  {id: "multiple-items", title: "Multiple items", render: MultipleItemsExample},
  {id: "accordion", title: "Accordion pattern", render: AccordionExample},
];

const multipleItems = [
  {title: "Shipping", body: "Orders leave the warehouse within two business days."},
  {title: "Returns", body: "Unused items can be returned within 30 days."},
  {title: "Warranty", body: "Every order includes a two-year warranty."},
];

function MultipleItemsExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <div className="w-full max-w-sm space-y-2">
      {multipleItems.map((item) => (
        <Collapsible key={item.title} className="rounded-rixl-md border border-rixl-border px-1 py-1">
          <CollapsibleDefaultTrigger>{item.title}</CollapsibleDefaultTrigger>
          <CollapsibleDefaultPanel>
            <p className="py-2 text-sm text-rixl-fg-muted">{item.body}</p>
          </CollapsibleDefaultPanel>
        </Collapsible>
      ))}
    </div>
  );
}

function AccordionExample(props: {state: Record<string, ControlValue>}) {
  void props;
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  return (
    <div className="w-full max-w-sm space-y-2">
      {multipleItems.map((item, index) => (
        <Collapsible
          key={item.title}
          open={activeIndex === index}
          onOpenChange={(open: boolean) => setActiveIndex(open ? index : null)}
          className="rounded-rixl-md border border-rixl-border px-1 py-1"
        >
          <CollapsibleDefaultTrigger>{item.title}</CollapsibleDefaultTrigger>
          <CollapsibleDefaultPanel keepMounted>
            <p className="py-2 text-sm text-rixl-fg-muted">{item.body}</p>
          </CollapsibleDefaultPanel>
        </Collapsible>
      ))}
    </div>
  );
}
