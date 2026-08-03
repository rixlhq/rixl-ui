import {Separator} from "@rixl/ui/separator";
import {Group, Section} from "./_layout";

export const path = "separator";
export const title = "Separator";
export const group = "Layout";

export function Showcase() {
  return (
    <Section title="Separator" description="Themed divider. Horizontal by default; pass orientation='vertical' inside a flex row.">
      <Group label="Horizontal">
        <div className="w-full">
          <p className="text-sm text-rixl-fg">Above the line</p>
          <Separator className="my-3" />
          <p className="text-sm text-rixl-fg-muted">Below the line</p>
        </div>
      </Group>

      <Group label="Vertical (inside a flex row)">
        <div className="flex h-6 items-center gap-3 text-sm text-rixl-fg">
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Guides</span>
          <Separator orientation="vertical" />
          <span>Reference</span>
        </div>
      </Group>

      <Group label="Custom className (last-write-wins via tailwind-merge)">
        <div className="w-full">
          <Separator className="bg-rixl-primary my-2 h-0.5" />
        </div>
      </Group>
    </Section>
  );
}
