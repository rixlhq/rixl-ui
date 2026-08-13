import {Tabs as TabsPrimitive} from "@base-ui-components/react/tabs";

import {cn} from "cnfast";

/**
 * Rixl Tabs — tabbed content shell built on Base UI Tabs.
 * Ported verbatim from dashboard; token-mapped to rixl tokens.
 */
function Tabs({className, ...props}: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function TabsList({className, ...props}: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-rixl-surface-muted text-rixl-fg-muted inline-flex h-10 w-fit items-center justify-center rounded-rixl-lg p-1",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({className, ...props}: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "cursor-pointer",
        "data-active:bg-rixl-bg",
        "data-active:text-rixl-fg",
        "data-active:shadow-rixl-sm",
        "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:outline-rixl-ring focus-visible:ring-[3px] focus-visible:outline-1",
        "inline-flex flex-1 items-center justify-center",
        "gap-1.5 px-2 py-1.5",
        "rounded-rixl-md",
        "text-sm font-medium whitespace-nowrap",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        "transition-[color,box-shadow]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({className, ...props}: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}

export type TabsProps = TabsPrimitive.Root.Props;
export type TabsListProps = TabsPrimitive.List.Props;
export type TabsTriggerProps = TabsPrimitive.Tab.Props;
export type TabsContentProps = TabsPrimitive.Panel.Props;

export {Tabs, TabsList, TabsTrigger, TabsContent};
