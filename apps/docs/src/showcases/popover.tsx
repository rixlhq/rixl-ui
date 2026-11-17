import {Button} from "@rixl/ui/button";
import {Input} from "@rixl/ui/input";
import {Label} from "@rixl/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@rixl/ui/popover";
import {Switch} from "@rixl/ui/switch";
import type {ControlValue, Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "popover";
export const title = "Popover";
export const description = "Show supporting content beside its trigger.";

export function Showcase() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
      <PopoverContent>
        <p className="text-sm font-medium">Placements</p>
        <p className="mt-1 text-sm text-rixl-fg-muted">The popover closes on outside press, Escape, and when it loses focus.</p>
      </PopoverContent>
    </Popover>
  );
}

function BasicExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
      <PopoverContent>
        <p className="text-sm font-medium">Placements</p>
        <p className="mt-1 text-sm text-rixl-fg-muted">The popover closes on outside press, Escape, and when it loses focus.</p>
      </PopoverContent>
    </Popover>
  );
}

function SidesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Sides">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline">{side}</Button>} />
          <PopoverContent side={side} className="w-56">
            <p className="text-sm font-medium">Side: {side}</p>
            <p className="mt-1 text-sm text-rixl-fg-muted">Popover on the {side}.</p>
          </PopoverContent>
        </Popover>
      ))}
    </Group>
  );
}

function AlignmentsExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Group label="Alignments">
      {(["start", "center", "end"] as const).map((align) => (
        <Popover key={align}>
          <PopoverTrigger render={<Button variant="outline">align={align}</Button>} />
          <PopoverContent align={align} className="w-56">
            <p className="text-sm font-medium">Align: {align}</p>
            <p className="mt-1 text-sm text-rixl-fg-muted">Aligned {align} to the trigger.</p>
          </PopoverContent>
        </Popover>
      ))}
    </Group>
  );
}

function FormInsideExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Customize</Button>} />
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="popover-dimensions">Dimensions</Label>
            <Input id="popover-dimensions" defaultValue="1000×1000" />
          </div>
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="popover-crop" className="text-rixl-fg-muted font-normal">
              Automatically crop to source
            </Label>
            <Switch id="popover-crop" defaultChecked />
          </div>
          <Button size="sm" className="w-full">
            Update image
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const examples: Example[] = [
  {id: "basic", title: "Basic", render: BasicExample},
  {id: "sides", title: "Sides", render: SidesExample},
  {id: "alignments", title: "Alignments", render: AlignmentsExample},
  {id: "form", title: "Form inside", render: FormInsideExample},
];
