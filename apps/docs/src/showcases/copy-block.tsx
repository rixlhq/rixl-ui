import {CopyBlock} from "@rixl/ui/copy-block";
import type {ControlValue, Example} from "./registry";

export const path = "copy-block";
export const title = "Copy Block";
export const description = "Display a value that can be copied to the clipboard.";
export const notes =
  "labels takes copy(title), copying, copied and error. The button name and the idle tooltip both use labels.copy(title). Strings you leave out come from RixlLocaleProvider (@rixl/ui/locale), then English.";

export function Showcase() {
  return <CopyBlock title="API Key" value="sk_live_51H3xQ9kP2e0R8m" className="w-full max-w-md" />;
}

function ValueExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return <CopyBlock title="API Key" value="sk_live_51H3xQ9kP2e0R8m" className="w-full max-w-md" />;
}

function CustomContentExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <CopyBlock title="Endpoint" value="https://api.rixl.dev/v1/media" className="w-full max-w-md">
      <span className="p-2 font-mono text-sm whitespace-nowrap text-rixl-fg">https://api.rixl.dev/v1/media</span>
    </CopyBlock>
  );
}

function LabelsExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <CopyBlock
      title="API Key"
      value="sk_live_51H3xQ9kP2e0R8m"
      labels={{copy: (title) => `${title} kopieren`, copied: "Kopiert!"}}
      className="w-full max-w-md"
    />
  );
}

export const examples: Example[] = [
  {
    id: "value",
    title: "Value copy",
    description: "Click to copy — CopyIcon morphs into CheckIcon and updates the tooltip.",
    render: ValueExample,
    code: `<CopyBlock title="API Key" value="sk_live_51H3xQ9kP2e0R8m" />`,
  },
  {
    id: "custom",
    title: "Custom content",
    description: "Pass custom children while keeping the copy value.",
    render: CustomContentExample,
    code: `<CopyBlock title="Endpoint" value="https://api.rixl.dev/v1/media">
  <span className="p-2 font-mono text-sm">https://api.rixl.dev/v1/media</span>
</CopyBlock>`,
  },
  {
    id: "labels",
    title: "Translated labels",
    description: "labels replaces the button name, the tooltip and the status text; keys you omit stay English.",
    render: LabelsExample,
    code: `<CopyBlock
  title="API Key"
  value="sk_live_51H3xQ9kP2e0R8m"
  labels={{copy: (title) => \`\${title} kopieren\`, copied: "Kopiert!"}}
/>`,
  },
];
