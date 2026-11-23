import {CopyBlock} from "@rixl/ui/copy-block";
import type {ControlValue, Example} from "./registry";

export const path = "copy-block";
export const title = "Copy Block";
export const description = "Display a value that can be copied to the clipboard.";
export const notes =
  "Follows Kumo's ClipboardText. text is shown and copied; textToCopy copies something else. size is sm, base or lg (default lg). masked shows bullets until the reveal button is pressed (labels.revealAction, labels.hideAction); children stay hidden too, and copying still works while masked. The button is named by labels.copyAction (default Copy to clipboard), not by the title; the visible title describes it, so several blocks stay tell-apart-able. labels.copied (default Copied) is announced to screen readers after a copy. There is no tooltip unless you pass tooltip={{text, copiedText, side}}: it shows on hover, then swaps to copiedText after a copy. Strings you leave out come from RixlLocaleProvider (@rixl/ui/locale), then English. CopyBlock shows no pending or error text; the icon morphs to a check on success.";

export function Showcase() {
  return <CopyBlock title="API Key" text="sk_live_51H3xQ9kP2e0R8m" className="w-full max-w-md" />;
}

function ValueExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return <CopyBlock title="API Key" text="sk_live_51H3xQ9kP2e0R8m" className="w-full max-w-md" />;
}

function CustomContentExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <CopyBlock title="Endpoint" text="https://api.rixl.dev/v1/media" className="w-full max-w-md">
      <span className="p-2 font-mono text-sm whitespace-nowrap text-rixl-fg">https://api.rixl.dev/v1/media</span>
    </CopyBlock>
  );
}

function SizesExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <CopyBlock text="sk_live_51H3xQ9kP2e0R8m" size="sm" />
      <CopyBlock text="sk_live_51H3xQ9kP2e0R8m" size="base" />
      <CopyBlock text="sk_live_51H3xQ9kP2e0R8m" size="lg" />
    </div>
  );
}

function MaskedExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return <CopyBlock title="API Key" text="sk_live_51H3xQ9kP2e0R8m" masked className="w-full max-w-md" />;
}

function TextToCopyExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return <CopyBlock title="API Key" text="sk_live_***********" textToCopy="sk_live_51H3xQ9kP2e0R8m" className="w-full max-w-md" />;
}

function TooltipExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <CopyBlock
      title="API Key"
      text="sk_live_51H3xQ9kP2e0R8m"
      tooltip={{text: "Copy", copiedText: "Copied!", side: "top"}}
      className="w-full max-w-md"
    />
  );
}

function LabelsExample(props: {state: Record<string, ControlValue>}) {
  void props;
  return (
    <CopyBlock
      title="API Key"
      text="sk_live_51H3xQ9kP2e0R8m"
      masked
      labels={{
        copyAction: "In die Zwischenablage kopieren",
        copied: "Kopiert!",
        revealAction: "Wert anzeigen",
        hideAction: "Wert verbergen",
      }}
      className="w-full max-w-md"
    />
  );
}

export const examples: Example[] = [
  {
    id: "value",
    title: "Value copy",
    description: "Click to copy — CopyIcon morphs into CheckIcon.",
    render: ValueExample,
    code: `<CopyBlock title="API Key" text="sk_live_51H3xQ9kP2e0R8m" />`,
  },
  {
    id: "text-to-copy",
    title: "Copy other text",
    description: "textToCopy replaces what is copied; text stays what is shown.",
    render: TextToCopyExample,
    code: `<CopyBlock title="API Key" text="sk_live_***********" textToCopy="sk_live_51H3xQ9kP2e0R8m" />`,
  },
  {
    id: "masked",
    title: "Masked",
    description: "Bullets until the eye button is pressed; the copy button still copies the value.",
    render: MaskedExample,
    code: `<CopyBlock title="API Key" text="sk_live_51H3xQ9kP2e0R8m" masked />`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description: "sm, base and lg (default).",
    render: SizesExample,
    code: `<CopyBlock text="sk_live_51H3xQ9kP2e0R8m" size="sm" />
<CopyBlock text="sk_live_51H3xQ9kP2e0R8m" size="base" />
<CopyBlock text="sk_live_51H3xQ9kP2e0R8m" size="lg" />`,
  },
  {
    id: "custom",
    title: "Custom content",
    description: "Pass custom children while keeping the copy value.",
    render: CustomContentExample,
    code: `<CopyBlock title="Endpoint" text="https://api.rixl.dev/v1/media">
  <span className="p-2 font-mono text-sm">https://api.rixl.dev/v1/media</span>
</CopyBlock>`,
  },
  {
    id: "tooltip",
    title: "Tooltip",
    description: "Opt in with tooltip: the text shows on hover, copiedText after a copy.",
    render: TooltipExample,
    code: `<CopyBlock
  title="API Key"
  text="sk_live_51H3xQ9kP2e0R8m"
  tooltip={{text: "Copy", copiedText: "Copied!", side: "top"}}
/>`,
  },
  {
    id: "labels",
    title: "Translated labels",
    description: "labels replaces the button names and the copied status; keys you omit stay English.",
    render: LabelsExample,
    code: `<CopyBlock
  title="API Key"
  text="sk_live_51H3xQ9kP2e0R8m"
  masked
  labels={{copyAction: "In die Zwischenablage kopieren", copied: "Kopiert!", revealAction: "Wert anzeigen", hideAction: "Wert verbergen"}}
/>`,
  },
];
