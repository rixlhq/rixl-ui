import {Label} from "@rixl/ui/label";
import {Textarea} from "@rixl/ui/textarea";
import {Group, Section} from "./_layout";

export const path = "textarea";
export const title = "Textarea";
export const group = "Forms";

export function Showcase() {
  return (
    <Section title="Textarea" description="Multi-line text input. Auto-grows with content via field-sizing.">
      <Group label="Basic">
        <div className="flex w-full max-w-md flex-col gap-1.5">
          <Label htmlFor="msg">Message</Label>
          <Textarea id="msg" placeholder="Tell us what you think…" />
        </div>
      </Group>

      <Group label="With initial value (grows with content)">
        <Textarea
          className="max-w-md"
          defaultValue={
            "The field-sizing:content utility makes the textarea grow to fit the text you type without JS. Try adding a few more lines here — the box expands automatically."
          }
        />
      </Group>

      <Group label="Fixed rows (rows=6)">
        <Textarea className="max-w-md" rows={6} placeholder="Six rows tall by default" />
      </Group>

      <Group label="Disabled">
        <Textarea className="max-w-md" disabled defaultValue="Read-only description." />
      </Group>

      <Group label="Invalid (aria-invalid)">
        <div className="flex w-full max-w-md flex-col gap-1.5">
          <Label htmlFor="bad-msg">Message</Label>
          <Textarea id="bad-msg" aria-invalid defaultValue="Too short." />
          <p className="text-xs text-rixl-danger">Please write at least 20 characters.</p>
        </div>
      </Group>
    </Section>
  );
}
