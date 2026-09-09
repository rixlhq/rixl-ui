import { Tabs, TabsContent, TabsList, TabsTrigger, type TabsProps } from "@rixl/ui/tabs";
import type { ControlValue, Example } from "./registry";
import { Group } from "./_layout";

export const path = "tabs";
export const title = "Tabs";
export const group = "Navigation";
export const description =
  "Tabbed content built on Base UI Tabs. The active state is one element that travels between tabs rather than a fill repainted on each trigger — three variants, two sizes, and a shared press token.";

const CLOUDFLARE = ["Overview", "Metrics", "Deployments", "Bindings", "Observability", "Domains", "Access", "Settings"];

export function Showcase() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-rixl-fg">Overview panel</p>
      </TabsContent>
    </Tabs>
  );
}

/** A tab row with panels, so every example stays a couple of lines. */
function Row({ labels, ...rest }: { labels: string[] } & Partial<TabsProps>) {
  const value = (label: string) => label.toLowerCase().replace(/\s+/g, "-");
  return (
    <Tabs defaultValue={value(labels[0])} {...rest}>
      <TabsList>
        {labels.map((label) => (
          <TabsTrigger key={label} value={value(label)}>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {labels.map((label) => (
        <TabsContent key={label} value={value(label)}>
          <p className="text-sm text-rixl-fg-muted">{label} panel</p>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function SlideExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <div className="space-y-6">
      <Group label="Click across several tabs — the pill travels, it does not teleport">
        <Row labels={CLOUDFLARE} />
      </Group>
      <p className="text-sm text-rixl-fg-muted">
        Base UI publishes the active tab&apos;s box as{" "}
        <code className="text-rixl-fg">--active-tab-left/top/width/height</code>, so one element
        follows the selection and resizes to it. It is moved with{" "}
        <code className="text-rixl-fg">translate</code> rather than{" "}
        <code className="text-rixl-fg">left</code>, so the movement is composited rather than laid
        out every frame. Cloudflare, DaisyUI and Untitled UI all repaint the active tab instead, so
        their marker jumps. Under{" "}
        <code className="text-rixl-fg">prefers-reduced-motion</code> it snaps.
      </p>
    </div>
  );
}

function VariantsExample({ state }: { state: Record<string, ControlValue> }) {
  const variant = state.variant as TabsProps["variant"];
  const size = state.size as TabsProps["size"];
  const fullWidth = state.fullWidth as boolean;
  return (
    <Group label="Live preview">
      <div className="w-full">
        <Row labels={["Overview", "Metrics", "Deployments", "Settings"]} variant={variant} size={size} fullWidth={fullWidth} />
      </div>
    </Group>
  );
}

function AllVariantsExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <div className="space-y-6">
      <Group label="Segmented — a container, for switching a view in place">
        <Row labels={["Overview", "Metrics", "Settings"]} variant="segmented" />
      </Group>
      <Group label="Underline — no container, for page-level navigation">
        <Row labels={["Overview", "Metrics", "Settings"]} variant="underline" />
      </Group>
      <Group label="Ghost — no chrome until you interact">
        <Row labels={["Overview", "Metrics", "Settings"]} variant="ghost" />
      </Group>
    </div>
  );
}

function SizesExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <div className="space-y-6">
      <Group label="md — 32px triggers">
        <Row labels={["Overview", "Metrics", "Settings"]} size="md" />
      </Group>
      <Group label="sm — 28px triggers, for toolbars and card headers">
        <Row labels={["Overview", "Metrics", "Settings"]} size="sm" />
      </Group>
    </div>
  );
}

function LayoutExample(props: { state: Record<string, ControlValue> }) {
  void props;
  return (
    <div className="space-y-6">
      <Group label="Content width (default)">
        <Row labels={["Overview", "Metrics", "Settings"]} />
      </Group>
      <div className="w-full">
        <p className="mb-2 text-xs font-medium tracking-wide text-rixl-fg-subtle uppercase">
          fullWidth — distributes evenly
        </p>
        <Row labels={["Overview", "Metrics", "Settings"]} fullWidth />
      </div>
      <div className="max-w-sm">
        <p className="mb-2 text-xs font-medium tracking-wide text-rixl-fg-subtle uppercase">
          Overflow — scrolls in one row rather than wrapping
        </p>
        <Row labels={CLOUDFLARE} />
      </div>
    </div>
  );
}

export const examples: Example[] = [
  {
    id: "slide",
    title: "Travelling indicator",
    description: "The differentiator: the active marker moves between tabs instead of being repainted.",
    render: SlideExample,
    code: `/* One element follows the selection, driven by Base UI's measurements */
translate-x-[var(--active-tab-left)]
translate-y-[var(--active-tab-top)]
h-[var(--active-tab-height)]
w-[var(--active-tab-width)]
transition-[translate,width,height] duration-rixl-base ease-rixl-out
motion-reduce:transition-none`,
  },
  {
    id: "variants",
    title: "Playground",
    description: "Cycle variant, size and layout live.",
    render: VariantsExample,
    controls: [
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: [
          { value: "segmented", label: "Segmented" },
          { value: "underline", label: "Underline" },
          { value: "ghost", label: "Ghost" },
        ],
        defaultValue: "segmented",
      },
      {
        name: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
        ],
        defaultValue: "md",
      },
      { name: "fullWidth", label: "Full width", type: "boolean", defaultValue: false },
    ],
    code: `<Tabs defaultValue="overview" variant="segmented" size="md">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="metrics">Metrics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>`,
  },
  {
    id: "all-variants",
    title: "Variants",
    description: "One moving part, three geometries.",
    render: AllVariantsExample,
    code: `<Tabs variant="segmented">…</Tabs>
<Tabs variant="underline">…</Tabs>
<Tabs variant="ghost">…</Tabs>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    render: SizesExample,
    code: `<Tabs size="md">…</Tabs>
<Tabs size="sm">…</Tabs>`,
  },
  {
    id: "layout",
    title: "Layout & overflow",
    description: "Content width by default; even distribution and single-row scrolling on demand.",
    render: LayoutExample,
    code: `<Tabs fullWidth>…</Tabs>

{/* TabsList scrolls rather than wrapping; opt out with scrollable={false} */}
<TabsList scrollable={false}>…</TabsList>`,
  },
];
