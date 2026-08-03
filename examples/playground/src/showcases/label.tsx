import {Label} from "@rixl/ui/label";
import {Group, Section} from "./_layout";

export const path = "label";
export const title = "Label";
export const group = "Forms";

export function Showcase() {
  return (
    <Section title="Label" description="Form-field label. Dims automatically when a peer or ancestor field is disabled.">
      <Group label="Basic">
        <Label htmlFor="email">Email address</Label>
      </Group>

      <Group label="Wired to an input">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="playground-email">Email address</Label>
          <input
            id="playground-email"
            type="email"
            placeholder="you@example.com"
            className="peer h-9 rounded-rixl-md border border-rixl-border bg-rixl-surface px-3 text-sm text-rixl-fg placeholder:text-rixl-fg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rixl-ring"
          />
        </div>
      </Group>

      <Group label="Peer-disabled (label dims when input is disabled)">
        <div className="flex flex-col gap-1.5">
          <input
            id="playground-disabled"
            type="text"
            disabled
            defaultValue="Read only"
            className="peer h-9 rounded-rixl-md border border-rixl-border bg-rixl-surface px-3 text-sm text-rixl-fg disabled:opacity-50"
          />
          <Label htmlFor="playground-disabled">Field label</Label>
        </div>
      </Group>

      <Group label="Group-disabled (data-disabled ancestor)">
        <div data-disabled="true" className="group flex flex-col gap-1.5">
          <Label htmlFor="playground-group">Grouped label</Label>
          <input
            id="playground-group"
            type="text"
            defaultValue="Under a disabled group"
            className="h-9 rounded-rixl-md border border-rixl-border bg-rixl-surface px-3 text-sm text-rixl-fg"
          />
        </div>
      </Group>
    </Section>
  );
}
