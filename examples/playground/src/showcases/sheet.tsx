import {Button} from "@rixl/ui/button";
import {Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@rixl/ui/sheet";
import {Group, Section} from "./_layout";

export const path = "sheet";
export const title = "Sheet";
export const group = "Overlays";

export function Showcase() {
  return (
    <Section
      title="Sheet"
      description="Edge-anchored slide-in panel. Base UI Dialog; slides from top/right/bottom/left, closes on Escape / backdrop / scroll."
    >
      <Group label="Sides">
        <div className="flex flex-wrap items-center gap-6">
          {(["right", "left", "top", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger render={<Button variant="outline">{side}</Button>} />
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
                </SheetHeader>
                <p className="px-4 text-sm text-rixl-fg-muted">Panel content lives here.</p>
                <SheetFooter>
                  <Button size="sm" className="w-full">
                    Save changes
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </Group>

      <Group label="Right sheet with body content">
        <Sheet>
          <SheetTrigger render={<Button variant="outline">Side panel (right)</Button>} />
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Assets</SheetTitle>
              <SheetDescription>Manage files in this project.</SheetDescription>
            </SheetHeader>
            <div className="space-y-3 px-4">
              {[
                {name: "hero-cover.png", meta: "1.2 MB · image"},
                {name: "brand-lockup.svg", meta: "48 KB · vector"},
                {name: "press-kit.pdf", meta: "3.4 MB · document"},
              ].map((f) => (
                <div key={f.name} className="flex items-center gap-3 rounded-rixl-md border border-rixl-border bg-rixl-surface p-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-rixl-primary/10 text-xs font-bold text-rixl-primary">
                    {f.name.split(".")[1]}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-rixl-fg-muted">{f.meta}</p>
                  </div>
                </div>
              ))}
            </div>
            <SheetFooter>
              <Button className="w-full">Upload files</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Group>
    </Section>
  );
}