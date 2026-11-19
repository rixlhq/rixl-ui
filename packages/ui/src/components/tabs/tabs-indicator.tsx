import {useContext} from "react";
import {Tabs as TabsPrimitive} from "@base-ui/react/tabs";
import {cva} from "class-variance-authority";
import {cn} from "../../lib/cn";
import {TabsStyleContext} from "./context";

const indicatorVariants = cva(
  cn(
    "pointer-events-none absolute top-0 left-0 z-0",
    "translate-x-[var(--active-tab-left)] translate-y-[var(--active-tab-top)]",
    "h-[var(--active-tab-height)] w-[var(--active-tab-width)]",
    // On-screen movement, so ease-in-out; the slow token lets the eye follow the indicator across tabs.
    "transition-[translate,width,height] duration-(--rixl-motion-slow) ease-in-out motion-reduce:transition-none"
  ),
  {
    variants: {
      variant: {
        // The border carries most of the separation: the pill and its container
        // are only a few percent apart in lightness, so colour alone does not
        // read as raised.
        segmented: "bg-rixl-surface-raised border-rixl-border shadow-sm rounded-md border",
        underline: "border-rixl-primary border-b-2",
        ghost: "bg-rixl-surface-raised border-rixl-border shadow-xs rounded-md border",
      },
    },
    defaultVariants: {variant: "segmented"},
  }
);

export function TabsIndicator() {
  const {variant} = useContext(TabsStyleContext);
  return <TabsPrimitive.Indicator data-slot="tabs-indicator" renderBeforeHydration className={indicatorVariants({variant})} />;
}
