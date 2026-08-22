import { CopyBlock } from "@rixl/ui/copy-block";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "copy-block";
export const title = "CopyBlock";
export const group = "Content";
export const description =
  "Inline label + value with a copy button and tooltip feedback. Copies the value to the clipboard.";

export function Showcase() {
  return <CopyBlock title="API Key" value="sk_live_51H3xQ9kP2e0R8m" className="max-w-md" />;
}

function ValueExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Value copy">
      <CopyBlock title="API Key" value="sk_live_51H3xQ9kP2e0R8m" className="max-w-md" />
    </Group>
  );
}

function CustomContentExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Custom content">
      <CopyBlock title="Endpoint" className="max-w-md">
        <span className="p-2 font-mono text-sm whitespace-nowrap">
          https://api.rixl.dev/v1/media
        </span>
      </CopyBlock>
    </Group>
  );
}

export const examples: Example[] = [
  { id: "value", title: "Value copy", render: ValueExample },
  { id: "custom", title: "Custom content", render: CustomContentExample },
];
