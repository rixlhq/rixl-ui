import {useState} from "react";
import {Label} from "@rixl/ui/label";
import {RadioGroup, RadioGroupItem} from "@rixl/ui/radio-group";
import {Group, Section} from "./_layout";

export const path = "radio-group";
export const title = "Radio Group";
export const group = "Forms";

export function Showcase() {
  return (
    <Section title="Radio Group" description="Single-selection group. Compose each item with a Label for accessible labelling.">
      <Group label="Basic">
        <RadioGroup defaultValue="comfortable" name="density">
          <div className="flex items-center gap-2">
            <RadioGroupItem id="d-compact" value="compact" />
            <Label htmlFor="d-compact">Compact</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="d-comfortable" value="comfortable" />
            <Label htmlFor="d-comfortable">Comfortable</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="d-spacious" value="spacious" />
            <Label htmlFor="d-spacious">Spacious</Label>
          </div>
        </RadioGroup>
      </Group>

      <Group label="Disabled options">
        <RadioGroup defaultValue="pro" name="plan">
          <div className="flex items-center gap-2">
            <RadioGroupItem id="p-free" value="free" />
            <Label htmlFor="p-free">Free</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="p-pro" value="pro" />
            <Label htmlFor="p-pro">Pro</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="p-enterprise" value="enterprise" disabled />
            <Label htmlFor="p-enterprise">Enterprise (contact sales)</Label>
          </div>
        </RadioGroup>
      </Group>

      <Group label="Invalid (aria-invalid on items)">
        <RadioGroup name="delivery">
          <div className="flex items-center gap-2">
            <RadioGroupItem id="s-standard" value="standard" aria-invalid />
            <Label htmlFor="s-standard" className="text-rixl-danger">
              Standard (unavailable to your region)
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="s-express" value="express" aria-invalid />
            <Label htmlFor="s-express" className="text-rixl-danger">
              Express (unavailable to your region)
            </Label>
          </div>
        </RadioGroup>
      </Group>

      <Group label="Controlled">
        <ControlledDemo />
      </Group>
    </Section>
  );
}

function ControlledDemo() {
  const [value, setValue] = useState<string>("apple");
  return (
    <div className="flex flex-col gap-3">
      <RadioGroup value={value} onValueChange={setValue} name="fruit">
        <div className="flex items-center gap-2">
          <RadioGroupItem id="f-apple" value="apple" />
          <Label htmlFor="f-apple">Apple</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="f-banana" value="banana" />
          <Label htmlFor="f-banana">Banana</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="f-cherry" value="cherry" />
          <Label htmlFor="f-cherry">Cherry</Label>
        </div>
      </RadioGroup>
      <p className="text-xs text-rixl-fg-muted">Selected: {value}</p>
    </div>
  );
}
