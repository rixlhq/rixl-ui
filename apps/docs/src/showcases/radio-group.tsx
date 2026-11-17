import {Label} from "@rixl/ui/label";
import {RadioGroup, RadioGroupItem} from "@rixl/ui/radio-group";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "radio-group";
export const title = "Radio Group";
export const group = "Forms";
export const description =
  "Single-selection group. Hover-strengthened border, primary border when selected, and a dot that pops in. Compose each item with a Label for accessible labelling.";

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

function BasicExample() {
  return (
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
  );
}

function InvalidExample() {
  return (
    <Group label="Invalid">
      <RadioGroup defaultValue="comfortable" name="density-invalid">
        <div className="flex items-center gap-2">
          <RadioGroupItem id="i-compact" value="compact" aria-invalid />
          <Label htmlFor="i-compact">Compact</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id="i-comfortable" value="comfortable" aria-invalid />
          <Label htmlFor="i-comfortable" className="text-rixl-danger">
            Comfortable
          </Label>
        </div>
      </RadioGroup>
    </Group>
  );
}

function DisabledOptionsExample() {
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
    id: "basic",
    title: "Basic",
    render: BasicExample,
    code: `<RadioGroup defaultValue="comfortable" name="density">
  <div className="flex items-center gap-2">
    <RadioGroupItem id="d-comfortable" value="comfortable" />
    <Label htmlFor="d-comfortable">Comfortable</Label>
  </div>
</RadioGroup>`,
  },
  {
    id: "invalid",
    title: "Invalid",
    render: InvalidExample,
    code: `<RadioGroupItem id="d-compact" value="compact" aria-invalid />`,
  },
  {id: "disabled-options", title: "Disabled options", render: DisabledOptionsExample},
];
