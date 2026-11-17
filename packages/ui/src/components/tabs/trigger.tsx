import {useContext} from "react";
import {Tabs as TabsPrimitive} from "@base-ui/react/tabs";
import {cva} from "class-variance-authority";
import {cn} from "cn";

import {TabsStyleContext} from "./context";

const triggerVariants = cva(
  cn(
    "relative z-10 inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 font-medium whitespace-nowrap",
    "outline-none select-none touch-manipulation disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
    // Hover changes text intensity only (no background wash), so the
    // travelling indicator pill is the only surface that moves across the
    // bar on hover. Press still depresses like every other pressable
    // (`active:scale`), which is momentary and never fights the indicator.
    // Fast press clock, same as the Button and the indicator's own press
    // scale, so trigger and pill depress and release as one piece.
    "text-rixl-fg-muted hover:text-rixl-fg data-active:text-rixl-fg",
    "active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100",
    "transition-[color,scale] duration-rixl-fast ease-rixl-out"
  ),
  {
    variants: {
      variant: {
        segmented: "rounded-rixl-md",
        underline: "rounded-rixl-sm",
        ghost: "rounded-rixl-md",
      },
      // A floor, not a fixed height: a trigger may stack an icon, a label and a
      // description, and a hard height would let that content spill out of the
      // box the indicator is measured from.
      size: {sm: "min-h-7 px-2.5 py-1 text-xs", md: "min-h-8 px-3 py-1.5 text-sm"},
      fullWidth: {true: "flex-1", false: ""},
    },
    defaultVariants: {variant: "segmented", size: "md", fullWidth: false},
  }
);

export type TabsTriggerProps = TabsPrimitive.Tab.Props;

export function TabsTrigger({className, onClick, ...props}: TabsTriggerProps) {
  const {variant, size, fullWidth} = useContext(TabsStyleContext);
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      onClick={(event) => {
        onClick?.(event);
        event.currentTarget.scrollIntoView?.({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }}
      className={cn(triggerVariants({variant, size, fullWidth}), className)}
      {...props}
    />
  );
}
