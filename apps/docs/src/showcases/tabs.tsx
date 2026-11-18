import {Badge} from "@rixl/ui/badge";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@rixl/ui/breadcrumb";
import {Button} from "@rixl/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger, type TabsProps} from "@rixl/ui/tabs";
import {Group} from "../components/showcase-layout";
import type {Example} from "./registry";

export const path = "tabs";
export const title = "Tabs";
export const description = "Switch between related views in the same space.";
export const notes =
  "Tabbed content built on Base UI Tabs. Hovering an inactive tab changes text intensity only while a single indicator glides across tabs over 300ms. Overflowing tab lists scroll in one row with fade + chevron controls, drag-to-scroll, and smooth scrollIntoView. TabsList takes labels.scrollLeft and labels.scrollRight for the overflow buttons. Strings you leave out come from RixlLocaleProvider (@rixl/ui/locale), then English.";

const CLOUDFLARE = ["Overview", "Metrics", "Deployments", "Bindings", "Observability", "Domains", "Access", "Settings"];

export function Showcase() {
  return (
    <Tabs defaultValue="overview" variant="segmented">
      <TabsList aria-label="Demo sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Everything in your workspace, at a glance.</TabsContent>
      <TabsContent value="activity">You're all caught up. No recent activity.</TabsContent>
      <TabsContent value="settings">Manage your workspace preferences.</TabsContent>
    </Tabs>
  );
}

/** A tab row with panels, so every example stays a couple of lines. */
function Row({labels, ...rest}: {labels: string[]} & Partial<TabsProps>) {
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

function SlideExample() {
  return (
    <div className="space-y-4">
      <Row labels={CLOUDFLARE} />
      <p className="text-xs text-rixl-fg-muted">
        Hovering an inactive trigger only shifts text intensity (<code className="text-rixl-fg">text-rixl-fg-muted → text-rixl-fg</code>),
        so the travelling pill is the single moving surface across the bar.
      </p>
    </div>
  );
}

function OverflowExample() {
  return (
    <div className="space-y-6">
      <div className="max-w-sm space-y-2">
        <p className="text-xs font-medium text-rixl-fg-muted">
          Segmented overflow (narrow container — use chevrons, drag, or click partially visible tabs)
        </p>
        <Row labels={CLOUDFLARE} variant="segmented" />
      </div>

      <div className="max-w-md space-y-4 rounded-rixl-lg border border-rixl-border bg-rixl-bg p-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#/tabs">Workers &amp; Pages</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>api-gateway-prod</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-semibold text-rixl-fg">api-gateway-prod</h3>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Visit
            </Button>
          </div>
        </div>

        <Row labels={CLOUDFLARE} variant="underline" />
      </div>
    </div>
  );
}

function AllVariantsExample() {
  return (
    <div className="space-y-6">
      <Group label="Segmented — pill indicator on a muted track">
        <Row labels={["Overview", "Metrics", "Settings"]} variant="segmented" />
      </Group>
      <Group label="Underline — bottom bar for page-level navigation">
        <Row labels={["Overview", "Metrics", "Settings"]} variant="underline" />
      </Group>
      <Group label="Ghost — minimal chrome">
        <Row labels={["Overview", "Metrics", "Settings"]} variant="ghost" />
      </Group>
    </div>
  );
}

function SizesExample() {
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

export const examples: Example[] = [
  {
    id: "slide",
    title: "Travelling indicator",
    description: "Hover changes text intensity only; clicking glides the single active pill across tabs over 300ms.",
    render: SlideExample,
    code: `<Tabs defaultValue="overview" variant="segmented">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="metrics">Metrics</TabsTrigger>
    <TabsTrigger value="deployments">Deployments</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview panel</TabsContent>
</Tabs>`,
  },
  {
    id: "overflow",
    title: "Overflow & page header",
    description:
      "When tabs exceed the container width, TabsList scrolls horizontally with start/end fade controls, mouse drag-to-scroll, and auto-scrollIntoView on click.",
    render: OverflowExample,
  },
  {id: "all-variants", title: "Variants", render: AllVariantsExample},
  {id: "sizes", title: "Sizes", render: SizesExample},
];
