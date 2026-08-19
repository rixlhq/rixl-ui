import { Separator, type SeparatorProps } from "@rixl/ui/separator";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "separator";
export const title = "Separator";
export const group = "Layout";
export const description =
  "Themed divider. Horizontal by default; pass orientation='vertical' inside a flex row.";

export function Showcase() {
  return <Separator className="my-3" />;
}

function LiveExample({ state }: { state: Record<string, ControlValue> }) {
  const orientation = state.orientation as SeparatorProps["orientation"];
  return (
    <Group label="Live preview">
      {orientation === "vertical" ? (
        <div className="flex h-6 items-center gap-3 text-sm text-rixl-fg">
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Guides</span>
        </div>
      ) : (
        <div className="w-full">
          <p className="text-sm text-rixl-fg">Above the line</p>
          <Separator className="my-3" />
          <p className="text-sm text-rixl-fg-muted">Below the line</p>
        </div>
      )}
    </Group>
  );
}

function CustomClassExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <Group label="Custom className (last-write-wins via cnfast)">
      <div className="w-full">
        <Separator className="my-2 h-0.5 bg-rixl-primary" />
      </div>
    </Group>
  );
}

export const examples: Example[] = [
  {
    id: "live",
    title: "Interactive",
    description: "Toggle between horizontal and vertical orientation.",
    render: LiveExample,
    controls: [
      {
        name: "orientation",
        label: "Orientation",
        type: "select",
        options: [
          { value: "horizontal", label: "Horizontal" },
          { value: "vertical", label: "Vertical" },
        ],
        defaultValue: "horizontal",
      },
    ],
    code: `<Separator className="my-3" />

<div className="flex h-6 items-center gap-3">
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Guides</span>
</div>`,
  },
  { id: "custom", title: "Custom className", render: CustomClassExample },
];
