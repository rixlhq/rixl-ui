import {RadioGroup, RadioGroupItem} from "@rixl/ui/radio-group";
import type {Example} from "./registry";
import {Group} from "../components/showcase-layout";

export const path = "radio-group";
export const title = "Radio Group";
export const description = "Choose one option from a group.";
export const notes =
  'A fieldset that is the radiogroup. legend names it (a node, so it can be sr-only), description and error sit under it and are linked with aria-describedby, and orientation lays the items out vertically or in a row. Give each RadioGroupItem a label: the text names the radio and a click on it selects. controlFirst={false} puts the text first; variant="error" marks the radio aria-invalid.';

export function Showcase() {
  return (
    <RadioGroup defaultValue="monthly" name="overview-billing" className="w-full max-w-56" legend="Billing frequency">
      <RadioGroupItem value="monthly" label="Monthly billing" />
      <RadioGroupItem value="yearly" label="Yearly billing" />
    </RadioGroup>
  );
}

function BasicExample() {
  return (
    <RadioGroup defaultValue="comfortable" name="density" legend="Density">
      <RadioGroupItem value="compact" label="Compact" />
      <RadioGroupItem value="comfortable" label="Comfortable" />
      <RadioGroupItem value="spacious" label="Spacious" />
    </RadioGroup>
  );
}

function ChromeExample() {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup legend="Size" description="Applies to new tables" orientation="horizontal" defaultValue="md" name="size">
        <RadioGroupItem value="sm" label="Small" />
        <RadioGroupItem value="md" label="Medium" />
        <RadioGroupItem value="lg" label="Large" />
      </RadioGroup>
      <RadioGroup legend="Payment method" error="Choose a payment method" name="payment">
        <RadioGroupItem value="card" label="Credit card" variant="error" />
        <RadioGroupItem value="paypal" label="PayPal" variant="error" />
      </RadioGroup>
    </div>
  );
}

function DisabledOptionsExample() {
  return (
    <Group label="Disabled options">
      <RadioGroup defaultValue="pro" name="plan" legend="Plan">
        <RadioGroupItem value="free" label="Free" />
        <RadioGroupItem value="pro" label="Pro" />
        <RadioGroupItem value="enterprise" label="Enterprise (contact sales)" disabled />
      </RadioGroup>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "basic",
    title: "Basic",
    render: BasicExample,
    code: `<RadioGroup defaultValue="comfortable" name="density" legend="Density">
  <RadioGroupItem value="compact" label="Compact" />
  <RadioGroupItem value="comfortable" label="Comfortable" />
</RadioGroup>`,
  },
  {
    id: "chrome",
    title: "Description and error",
    render: ChromeExample,
    code: `<RadioGroup legend="Size" description="Applies to new tables" orientation="horizontal">
  <RadioGroupItem value="sm" label="Small" />
</RadioGroup>
<RadioGroup legend="Payment method" error="Choose a payment method">
  <RadioGroupItem value="card" label="Credit card" variant="error" />
</RadioGroup>`,
  },
  {id: "disabled-options", title: "Disabled options", render: DisabledOptionsExample},
];
