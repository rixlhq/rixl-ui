import {forwardRef, useMemo} from "react";
import {Tabs as TabsPrimitive} from "@base-ui/react/tabs";
import {cn} from "../../lib/cn";

import {TabsStyleContext, type TabsSize, type TabsVariant} from "./context";

export type TabsProps = TabsPrimitive.Root.Props & {
  variant?: TabsVariant;
  size?: TabsSize;
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs({className, variant = "segmented", size = "md", ...props}, ref) {
  const styleValue = useMemo(() => ({variant, size}), [variant, size]);
  return (
    <TabsStyleContext.Provider value={styleValue}>
      <TabsPrimitive.Root ref={ref} data-slot="tabs" className={cn("flex min-w-0 flex-col gap-3", className)} {...props} />
    </TabsStyleContext.Provider>
  );
});
Tabs.displayName = "Tabs";
