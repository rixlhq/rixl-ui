import {CopyBlock} from "@rixl/ui/copy-block";
import {Group, Section} from "./_layout";

export const path = "copy-block";
export const title = "CopyBlock";
export const group = "Content";

export function Showcase() {
  return (
    <Section
      title="CopyBlock"
      description="Inline label + value with a copy button and tooltip feedback. Copies the value to the clipboard."
    >
      <Group label="Value copy">
        <CopyBlock title="API Key" value="sk_live_51H3xQ9kP2e0R8m" className="max-w-md" />
      </Group>

      <Group label="Custom content">
        <CopyBlock title="Endpoint" className="max-w-md">
          <span className="text-sm font-mono p-2 whitespace-nowrap">https://api.rixl.dev/v1/media</span>
        </CopyBlock>
      </Group>
    </Section>
  );
}