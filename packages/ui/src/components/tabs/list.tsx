import {useContext} from "react";
import {Tabs as TabsPrimitive} from "@base-ui/react/tabs";
import {cva} from "class-variance-authority";
import {cn} from "cn";

import {TabsStyleContext} from "./context";
import {scrollTabsByPage, TabsOverflowControl, useHorizontalDragScroll, useOverflowDetect} from "./overflow";

const listVariants = cva("relative isolate flex min-w-0 max-w-full items-stretch", {
  variants: {
    variant: {
      segmented: "bg-rixl-surface-muted rounded-rixl-lg gap-1 p-1",
      underline: "border-rixl-border gap-4 border-b",
      ghost: "gap-1",
    },
    fullWidth: {true: "w-full", false: "w-fit"},
    // Many tabs in a narrow column scroll rather than wrap, so a tab row is
    // always one row and the indicator never has to jump between lines.
    scrollable: {
      true: "overflow-x-auto overflow-y-hidden scroll-px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      false: "",
    },
  },
  defaultVariants: {variant: "segmented", fullWidth: false, scrollable: true},
});

const indicatorVariants = cva(
  cn(
    "pointer-events-none absolute top-0 left-0 z-0",
    "translate-x-[var(--active-tab-left)] translate-y-[var(--active-tab-top)]",
    "h-[var(--active-tab-height)] w-[var(--active-tab-width)]",
    // Smooth 300ms glide so the eye follows the indicator across tabs.
    // Press scale rides along on its own fast timing: momentary depress on
    // mousedown, independent of the `translate` the glide runs on.
    "transition-[translate_300ms_cubic-bezier(0.4,0,0.2,1),width_300ms_cubic-bezier(0.4,0,0.2,1),height_300ms_cubic-bezier(0.4,0,0.2,1),scale_120ms_var(--rixl-ease-out)] motion-reduce:transition-none"
  ),
  {
    variants: {
      variant: {
        // The border carries most of the separation: the pill and its container
        // are only a few percent apart in lightness, so colour alone does not
        // read as raised.
        segmented: "bg-rixl-surface-raised border-rixl-border shadow-rixl-sm rounded-rixl-md border",
        underline: "border-rixl-primary border-b-2",
        ghost: "bg-rixl-surface-raised border-rixl-border shadow-rixl-xs rounded-rixl-md border",
      },
    },
    defaultVariants: {variant: "segmented"},
  }
);

export type TabsListProps = TabsPrimitive.List.Props & {
  /** Let the row scroll instead of wrapping when the tabs overflow. */
  scrollable?: boolean;
};

/**
 * Pressing any trigger depresses the indicator with it (the trigger scales
 * via its own press feedback). `scale` is independent of the `translate`
 * the glide runs on, so the two compose instead of fighting. Gated behind
 * no-preference so reduced motion gets no movement; the indicator's own
 * motion-reduce:transition-none covers the release.
 */
const indicatorPress =
  "[@media(prefers-reduced-motion:no-preference)]:[&:has([data-slot=tabs-trigger]:active)_[data-slot=tabs-indicator]]:scale-[var(--rixl-press-scale)]";

export function TabsList({className, children, scrollable = true, ...props}: TabsListProps) {
  const {variant, size, fullWidth} = useContext(TabsStyleContext);
  const {ref: listRef, isOverflowing, canScrollStart, canScrollEnd} = useOverflowDetect(scrollable);
  const dragHandlers = useHorizontalDragScroll(listRef, isOverflowing);

  return (
    <div data-slot="tabs-list-wrapper" className={cn("relative flex min-w-0 max-w-full items-center", fullWidth ? "w-full" : "w-fit")}>
      <TabsPrimitive.List
        ref={listRef}
        data-slot="tabs-list"
        data-overflowing={isOverflowing ? "" : undefined}
        data-overflow-start={canScrollStart ? "" : undefined}
        data-overflow-end={canScrollEnd ? "" : undefined}
        {...dragHandlers}
        className={cn(
          listVariants({variant, fullWidth, scrollable}),
          isOverflowing && "cursor-grab active:cursor-grabbing",
          indicatorPress,
          className
        )}
        {...props}
      >
        {children}
        <TabsPrimitive.Indicator data-slot="tabs-indicator" renderBeforeHydration className={indicatorVariants({variant})} />
      </TabsPrimitive.List>
      {scrollable ? (
        <>
          <TabsOverflowControl
            side="start"
            visible={canScrollStart}
            variant={variant}
            size={size}
            onClick={() => scrollTabsByPage(listRef.current, "start")}
          />
          <TabsOverflowControl
            side="end"
            visible={canScrollEnd}
            variant={variant}
            size={size}
            onClick={() => scrollTabsByPage(listRef.current, "end")}
          />
        </>
      ) : null}
    </div>
  );
}
