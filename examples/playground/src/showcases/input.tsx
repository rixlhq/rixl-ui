import {Input} from "@rixl/ui/input";
import {Label} from "@rixl/ui/label";
import {Group, Section} from "./_layout";

export const path = "input";
export const title = "Input";
export const group = "Forms";

export function Showcase() {
  return (
    <Section title="Input" description="Single-line text input. Base UI Input primitive with rixl-token styling for focus and invalid states.">
      <Group label="Basic">
        <div className="flex w-full max-w-sm flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </Group>

      <Group label="Types">
        <div className="grid w-full max-w-sm grid-cols-1 gap-3">
          <Input placeholder="Text" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="number" placeholder="Number" />
          <Input type="tel" placeholder="Phone" />
          <Input type="url" placeholder="URL" />
        </div>
      </Group>

      <Group label="Disabled">
        <Input placeholder="Read only" disabled defaultValue="Prefilled and locked" className="max-w-sm" />
      </Group>

      <Group label="Invalid (aria-invalid)">
        <div className="flex w-full max-w-sm flex-col gap-1.5">
          <Label htmlFor="bad-email">Email</Label>
          <Input id="bad-email" type="email" defaultValue="not-an-email" aria-invalid />
          <p className="text-xs text-rixl-danger">Please enter a valid email address.</p>
        </div>
      </Group>

      <Group label="File input">
        <Input type="file" className="max-w-sm" />
      </Group>
    </Section>
  );
}
