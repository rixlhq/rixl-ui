import { Label } from "@rixl/ui/label";
import { RadioGroup, RadioGroupItem } from "@rixl/ui/radio-group";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "radio-group";
export const title = "Radio Group";
export const group = "Forms";
export const description =
  "Single-selection group. Compose each item with a Label for accessible labelling.";

export function Showcase() {
  return (
    <RadioGroup defaultValue="comfortable" name="showcase">
      <div className="flex items-center gap-2">
        <RadioGroupItem id="d-comfortable" value="comfortable" />
        <Label htmlFor="d-comfortable">Comfortable</Label>
      </div>
    </RadioGroup>
  );
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const disabled = state.disabled as boolean;
  const invalid = state.invalid as boolean;

  return (
    <RadioGroup defaultValue="comfortable" name="live" disabled={disabled}>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="l-compact" value="compact" aria-invalid={invalid} />
        <Label htmlFor="l-compact">Compact</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="l-comfortable" value="comfortable" aria-invalid={invalid} />
        <Label htmlFor="l-comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="l-spacious" value="spacious" aria-invalid={invalid} />
        <Label htmlFor="l-spacious">Spacious</Label>
      </div>
    </RadioGroup>
  );
}

function DisabledOptionsExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
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
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Tweak disabled and invalid states live.",
    render: LiveExample,
    controls: [
      { name: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
      { name: "invalid", label: "Invalid", type: "boolean", defaultValue: false },
    ],
    code: `<RadioGroup defaultValue="comfortable" name="density">
  <div className="flex items-center gap-2">
    <RadioGroupItem id="d-comfortable" value="comfortable" />
    <Label htmlFor="d-comfortable">Comfortable</Label>
  </div>
</RadioGroup>`,
  },
  { id: "disabled-options", title: "Disabled options", render: DisabledOptionsExample },
];
