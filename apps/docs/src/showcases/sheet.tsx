import {Badge} from "@rixl/ui/badge";
import {Button} from "@rixl/ui/button";
import {Input} from "@rixl/ui/input";
import {Label} from "@rixl/ui/label";
import {Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@rixl/ui/sheet";
import type {ControlValue, Example} from "./registry";

export const path = "sheet";
export const title = "Sheet";
export const group = "Overlays";
export const description =
  "Edge-anchored slide-in panel. Base UI Dialog; slides from top/right/bottom/left using the Vaul/iOS drawer curve (`ease-rixl-drawer`), closes on Escape / backdrop.";

export function Showcase() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm">
            Open sheet
          </Button>
        }
      />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 px-4">
          <div className="grid gap-1.5">
            <Label htmlFor="sheet-name-preview">Name</Label>
            <Input id="sheet-name-preview" defaultValue="Alex Morgan" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function LiveExample({state}: {state: Record<string, ControlValue>}) {
  const side = state.side as "top" | "right" | "bottom" | "left";
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open from {side}</Button>} />
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when you are done.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 px-4">
          <div className="grid gap-1.5">
            <Label htmlFor="sheet-name">Display name</Label>
            <Input id="sheet-name" defaultValue="Alex Morgan" />
          </div>
        </div>
        <SheetFooter>
          <Button size="sm" className="w-full">
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function WithBodyExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Side panel (right)</Button>} />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Assets</SheetTitle>
          <SheetDescription>Manage files in this project.</SheetDescription>
        </SheetHeader>
        <div className="space-y-2.5 px-4">
          {[
            {name: "hero-cover.png", meta: "1.2 MB", ext: "PNG"},
            {name: "brand-lockup.svg", meta: "48 KB", ext: "SVG"},
            {name: "press-kit.pdf", meta: "3.4 MB", ext: "PDF"},
          ].map((f) => (
            <div
              key={f.name}
              className="flex items-center justify-between gap-3 rounded-rixl-md border border-rixl-border bg-rixl-surface p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{f.name}</p>
                <p className="text-xs text-rixl-fg-muted">{f.meta}</p>
              </div>
              <Badge variant="secondary">{f.ext}</Badge>
            </div>
          ))}
        </div>
        <SheetFooter>
          <Button className="w-full">Upload files</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Pick the edge the sheet slides in from.",
    render: LiveExample,
    controls: [
      {
        name: "side",
        label: "Side",
        type: "select",
        options: [
          {value: "right", label: "Right"},
          {value: "left", label: "Left"},
          {value: "top", label: "Top"},
          {value: "bottom", label: "Bottom"},
        ],
        defaultValue: "right",
      },
    ],
    code: `<Sheet>
  <SheetTrigger render={<Button variant="outline">Open</Button>} />
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
  },
  {id: "body", title: "With body content", render: WithBodyExample},
];
