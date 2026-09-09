import {createContext, useContext} from "react";
import {Tabs as TabsPrimitive} from "@base-ui/react/tabs";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

/**
 * Rixl Tabs — built on Base UI Tabs.
 *
 * The active state is drawn by a single element that *travels* between tabs
 * rather than being repainted on each trigger. Base UI's Indicator publishes the
 * active tab's box as --active-tab-left/top/width/height, so the same moving
 * part serves every variant: a pill for `segmented`, a bar for `underline`.
 * Cloudflare, DaisyUI and Untitled UI all repaint instead, so their active
 * marker teleports.
 *
 * It is translated rather than positioned with left/top so the movement is
 * composited, and it is rendered by TabsList automatically — a tab set cannot
 * be assembled without its indicator.
 */

type TabsVariant = "segmented" | "underline" | "ghost";
type TabsSize = "sm" | "md";

const TabsStyleContext = createContext<{variant: TabsVariant; size: TabsSize; fullWidth: boolean}>({
  variant: "segmented",
  size: "md",
  fullWidth: false,
});

const listVariants = cva("relative isolate flex items-center", {
  variants: {
    variant: {
      segmented: "bg-rixl-surface-muted rounded-rixl-lg gap-1 p-1",
      underline: "border-rixl-border gap-4 border-b",
      ghost: "gap-1",
    },
    fullWidth: {true: "w-full", false: "w-fit"},
    // Many tabs in a narrow column scroll rather than wrap, so a tab row is
    // always one row and the indicator never has to jump between lines.
    scrollable: {true: "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", false: ""},
  },
  defaultVariants: {variant: "segmented", fullWidth: false, scrollable: true},
});

const triggerVariants = cva(
  "relative z-10 inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 font-medium whitespace-nowrap " +
    "outline-none select-none disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 " +
    "focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px] " +
    // Same press token as Button, so every pressable surface depresses alike.
    "active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100 " +
    "transition-[color,background-color,scale] duration-rixl-fast ease-rixl-out",
  {
    variants: {
      variant: {
        // The wash is a foreground tint rather than a fixed colour so one value
        // works on the muted ground in light and dark. It is suppressed on the
        // active tab, which already has the pill behind it.
        segmented:
          "text-rixl-fg-muted hover:bg-rixl-fg/5 hover:text-rixl-fg data-active:bg-transparent data-active:text-rixl-fg rounded-rixl-md",
        underline:
          "text-rixl-fg-muted hover:bg-rixl-fg/5 hover:text-rixl-fg data-active:bg-transparent data-active:text-rixl-fg rounded-rixl-sm",
        ghost:
          "text-rixl-fg-muted hover:bg-rixl-fg/5 hover:text-rixl-fg data-active:bg-transparent data-active:text-rixl-fg rounded-rixl-md",
      },
      size: {sm: "h-7 px-2.5 text-xs", md: "h-8 px-3 text-sm"},
      fullWidth: {true: "flex-1", false: ""},
    },
    defaultVariants: {variant: "segmented", size: "md", fullWidth: false},
  }
);

const indicatorVariants = cva(
  "pointer-events-none absolute top-0 left-0 z-0 " +
    "translate-x-[var(--active-tab-left)] translate-y-[var(--active-tab-top)] " +
    "h-[var(--active-tab-height)] w-[var(--active-tab-width)] " +
    // Base UI renders nothing until it has measured a tab, so there is no
    // unpositioned first paint to guard against.
    "transition-[translate,width,height] duration-rixl-base ease-rixl-out motion-reduce:transition-none",
  {
    variants: {
      variant: {
        // The border carries most of the separation: the pill and its container
        // are only a few percent apart in lightness, in this palette as in
        // Cloudflare's, so colour alone does not read as raised.
        segmented: "bg-rixl-surface-raised border-rixl-border shadow-rixl-sm rounded-rixl-md border",
        underline: "border-rixl-primary border-b-2",
        ghost: "bg-rixl-surface-raised border-rixl-border shadow-rixl-xs rounded-rixl-md border",
      },
    },
    defaultVariants: {variant: "segmented"},
  }
);

export type TabsProps = TabsPrimitive.Root.Props & {
  variant?: TabsVariant;
  size?: TabsSize;
  /** Distribute triggers evenly across the available width. */
  fullWidth?: boolean;
};

function Tabs({className, variant = "segmented", size = "md", fullWidth = false, ...props}: TabsProps) {
  return (
    <TabsStyleContext.Provider value={{variant, size, fullWidth}}>
      <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-3", className)} {...props} />
    </TabsStyleContext.Provider>
  );
}

export type TabsListProps = TabsPrimitive.List.Props & {
  /** Let the row scroll instead of wrapping when the tabs overflow. */
  scrollable?: boolean;
};

function TabsList({className, children, scrollable = true, ...props}: TabsListProps) {
  const {variant, fullWidth} = useContext(TabsStyleContext);
  return (
    <TabsPrimitive.List data-slot="tabs-list" className={cn(listVariants({variant, fullWidth, scrollable}), className)} {...props}>
      {children}
      <TabsPrimitive.Indicator data-slot="tabs-indicator" renderBeforeHydration className={indicatorVariants({variant})} />
    </TabsPrimitive.List>
  );
}

export type TabsTriggerProps = TabsPrimitive.Tab.Props;

function TabsTrigger({className, ...props}: TabsTriggerProps) {
  const {variant, size, fullWidth} = useContext(TabsStyleContext);
  return <TabsPrimitive.Tab data-slot="tabs-trigger" className={cn(triggerVariants({variant, size, fullWidth}), className)} {...props} />;
}

export type TabsContentProps = TabsPrimitive.Panel.Props;

function TabsContent({className, ...props}: TabsContentProps) {
  return <TabsPrimitive.Panel data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}

export type TabsVariantProps = VariantProps<typeof triggerVariants>;

export {Tabs, TabsList, TabsTrigger, TabsContent, listVariants, triggerVariants, indicatorVariants};
