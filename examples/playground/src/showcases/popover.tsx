import { Button } from "@rixl/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@rixl/ui/popover";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "popover";
export const title = "Popover";
export const group = "Overlays";
export const description =
  "Floating, dismissible surface anchored to a trigger. Base UI Popover; open on click, close on outside press / Escape / scroll.";

export function Showcase() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
      <PopoverContent>
        <p className="text-sm font-medium">Placements</p>
        <p className="mt-1 text-sm text-rixl-fg-muted">
          The popover closes on outside press, Escape, and when it loses focus.
        </p>
      </PopoverContent>
    </Popover>
  );
}

function BasicExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Basic">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Open popover</Button>} />
        <PopoverContent>
          <p className="text-sm font-medium">Placements</p>
          <p className="mt-1 text-sm text-rixl-fg-muted">
            The popover closes on outside press, Escape, and when it loses focus.
          </p>
        </PopoverContent>
      </Popover>
    </Group>
  );
}

function SidesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Sides">
      <div className="flex flex-wrap items-center gap-6">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Popover key={side}>
            <PopoverTrigger render={<Button variant="outline">{side}</Button>} />
            <PopoverContent side={side} className="w-56">
              <p className="text-sm font-medium">Side: {side}</p>
              <p className="mt-1 text-sm text-rixl-fg-muted">Popover on the {side}.</p>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </Group>
  );
}

function AlignmentsExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Alignments">
      <div className="flex flex-wrap items-center gap-6">
        {(["start", "center", "end"] as const).map((align) => (
          <Popover key={align}>
            <PopoverTrigger render={<Button variant="outline">align={align}</Button>} />
            <PopoverContent align={align} className="w-56">
              <p className="text-sm font-medium">Align: {align}</p>
              <p className="mt-1 text-sm text-rixl-fg-muted">Aligned {align} to the trigger.</p>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </Group>
  );
}

function FormInsideExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Form inside">
      <Popover>
        <PopoverTrigger render={<Button variant="outline">Customize</Button>} />
        <PopoverContent className="w-80">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label htmlFor="popover-dimensions" className="text-sm font-medium">
                Dimensions
              </label>
              <input
                id="popover-dimensions"
                defaultValue="1000×1000"
                className="h-9 w-full rounded-rixl-md border border-rixl-border bg-rixl-bg px-3 text-sm text-rixl-fg outline-hidden placeholder:text-rixl-fg-placeholder focus:ring-2 focus:ring-rixl-ring"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="popover-crop" className="text-sm text-rixl-fg-muted">
                Automatically crop to source
              </label>
              <input
                id="popover-crop"
                type="checkbox"
                defaultChecked
                className="size-4 accent-rixl-primary"
              />
            </div>
            <Button size="sm" className="w-full">
              Update image
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </Group>
  );
}

export const examples: Example[] = [
  { id: "basic", title: "Basic", render: BasicExample },
  { id: "sides", title: "Sides", render: SidesExample },
  { id: "alignments", title: "Alignments", render: AlignmentsExample },
  { id: "form", title: "Form inside", render: FormInsideExample },
];
