import {forwardRef, useContext, useMemo} from "react";
import {Tabs as TabsPrimitive} from "@base-ui/react/tabs";
import {mergeProps} from "@base-ui/react/merge-props";
import {mergeTabsListRefs} from "./merge-tabs-list-refs";
import {TabsIndicator} from "./tabs-indicator";
import {cva} from "class-variance-authority";
import {cn} from "../../lib/cn";

import type {RixlTranslations} from "../locale";
import {useTranslations} from "../locale/use-translations";
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

export type TabsListProps = TabsPrimitive.List.Props & {
  /** Let the row scroll instead of wrapping when the tabs overflow. */
  scrollable?: boolean;
  /** Names of the overflow buttons. Each defaults to the provider's string, then English. */
  labels?: Partial<RixlTranslations["tabs"]>;
};

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  {className, children, scrollable = true, labels, ...props},
  forwardedRef
) {
  const {variant, size, fullWidth} = useContext(TabsStyleContext);
  const t = useTranslations("tabs", labels);
  const {ref: listRef, isOverflowing, canScrollStart, canScrollEnd, isRtl} = useOverflowDetect(scrollable);
  const dragHandlers = useHorizontalDragScroll(listRef, isOverflowing);
  const mergedRef = useMemo(() => mergeTabsListRefs(listRef, forwardedRef), [listRef, forwardedRef]);

  return (
    <div data-slot="tabs-list-wrapper" className={cn("relative flex min-w-0 max-w-full items-center", fullWidth ? "w-full" : "w-fit")}>
      <TabsPrimitive.List
        ref={mergedRef}
        data-slot="tabs-list"
        data-overflowing={isOverflowing ? "" : undefined}
        data-overflow-start={canScrollStart ? "" : undefined}
        data-overflow-end={canScrollEnd ? "" : undefined}

        className={cn(listVariants({variant, fullWidth, scrollable}), isOverflowing && "cursor-grab active:cursor-grabbing", className)}
        {...mergeProps(dragHandlers, props)}
      >
        {children}
        <TabsIndicator />
      </TabsPrimitive.List>
      {scrollable ? (
        <>
          <TabsOverflowControl
            isRtl={isRtl}
            labels={t}
            side="start"
            visible={canScrollStart}
            variant={variant}
            size={size}
            onClick={() => scrollTabsByPage(listRef.current, "start")}
          />
          <TabsOverflowControl
            isRtl={isRtl}
            labels={t}
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
});
TabsList.displayName = "TabsList";
