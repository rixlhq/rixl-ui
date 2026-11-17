import {Badge} from "@rixl/ui/badge";
import {Button} from "@rixl/ui/button";
import {Input} from "@rixl/ui/input";
import {Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@rixl/ui/sheet";
import type {Example} from "./registry";

export const path = "sheet";
export const title = "Sheet";
export const description = "Open a supporting panel from the edge of the screen.";
export const notes =
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
        <Input label="Name" defaultValue="Alex Morgan" />
      </SheetContent>
    </Sheet>
  );
}

function SidesExample() {
  return (
    <div className="flex flex-wrap gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline">Open from {side}</Button>} />
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here. Click save when you are done.</SheetDescription>
            </SheetHeader>
            <Input label="Display name" defaultValue="Alex Morgan" />
            <SheetFooter>
              <Button size="sm">Save changes</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}

function WithBodyExample() {
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
          <Button>Upload files</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export const examples: Example[] = [
  {
    id: "sides",
    title: "Sides",
    description: "One trigger per edge the sheet slides in from.",
    render: SidesExample,
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
