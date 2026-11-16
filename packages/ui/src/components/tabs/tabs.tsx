import {useMemo} from "react";
import {Tabs as TabsPrimitive} from "@base-ui/react/tabs";
import {cn} from "cn";

import {TabsStyleContext, type TabsSize, type TabsVariant} from "./context";

export type TabsProps = TabsPrimitive.Root.Props & {
  variant?: TabsVariant;
  size?: TabsSize;
  /** Distribute triggers evenly across the available width. */
  fullWidth?: boolean;
};

export function Tabs({className, variant = "segmented", size = "md", fullWidth = false, ...props}: TabsProps) {
  const styleValue = useMemo(() => ({variant, size, fullWidth}), [variant, size, fullWidth]);
  return (
    <TabsStyleContext.Provider value={styleValue}>
      <TabsPrimitive.Root data-slot="tabs" className={cn("flex min-w-0 flex-col gap-3", className)} {...props} />
    </TabsStyleContext.Provider>
  );
}
