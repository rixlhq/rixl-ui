import type {ReactNode} from "react";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from "@rixl/ui/breadcrumb";
import {DirectionProvider} from "@rixl/ui/direction-provider";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@rixl/ui/input-group";
import {Pagination, PaginationControls} from "@rixl/ui/pagination";
import {Switch} from "@rixl/ui/switch";
import {Tabs, TabsList, TabsTrigger} from "@rixl/ui/tabs";
import {Group} from "../components/showcase-layout";
import type {Example} from "./registry";

export const path = "direction";
export const title = "Direction (RTL)";
export const description = 'Layouts and icons mirror under dir="rtl".';
export const notes =
  'Set dir on the document (or any ancestor) and every component lays out from the inline start: spacing, edges and borders use logical utilities, and directional chevrons carry rtl:-scale-x-100. Base UI reads direction from its own DirectionProvider, not from the DOM, so render DirectionProvider from @rixl/ui/direction-provider with the same value; it makes arrow keys, the slider and popup alignment follow. Popups render in a portal outside the example, so they only inherit dir from the document: the RTL button in the header sets it on <html>. Sidebar side="left" and side="right" mean the inline start and end. A few things stay physical on purpose: dialog centring, safe-area padding, and the Toaster position prop.';

function RtlRegion({children}: {children: ReactNode}) {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="w-full max-w-md space-y-4">
        {children}
      </div>
    </DirectionProvider>
  );
}

export function Showcase() {
  return (
    <RtlRegion>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </RtlRegion>
  );
}

function InlineExample() {
  return (
    <RtlRegion>
      <Group label="Tabs: the indicator and arrow keys follow the direction">
        <Tabs defaultValue="b">
          <TabsList aria-label="Sections">
            <TabsTrigger value="a">Overview</TabsTrigger>
            <TabsTrigger value="b">Metrics</TabsTrigger>
            <TabsTrigger value="c">Settings</TabsTrigger>
          </TabsList>
        </Tabs>
      </Group>
      <Group label="Pagination: previous and next chevrons mirror">
        <Pagination page={2} setPage={() => {}} perPage={10} totalCount={80}>
          <PaginationControls controls="simple" />
        </Pagination>
      </Group>
      <Group label="Input group: the start addon sits at the inline start">
        <InputGroup aria-label="Price">
          <InputGroupAddon>$</InputGroupAddon>
          <InputGroupInput aria-label="Amount" defaultValue="42" />
          <InputGroupAddon align="end">USD</InputGroupAddon>
        </InputGroup>
      </Group>
      <Group label="Switch: the thumb travels toward the inline end">
        <Switch aria-label="Notifications" defaultChecked />
      </Group>
    </RtlRegion>
  );
}

export const examples: Example[] = [
  {
    id: "inline",
    title: "Components in RTL",
    description:
      "This region sets dir and DirectionProvider on its own wrapper. In an app, set dir on <html> so portalled popups and the mobile sidebar sheet inherit it too.",
    render: InlineExample,
    code: `import {DirectionProvider} from "@rixl/ui/direction-provider";

// Once per app: portalled popups read the document, not the wrapper.
document.documentElement.dir = "rtl";

<DirectionProvider direction="rtl">
  <Tabs defaultValue="b">...</Tabs>
</DirectionProvider>`,
  },
];
