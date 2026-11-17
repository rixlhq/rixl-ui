import {forwardRef} from "react";
import {Tabs as TabsPrimitive} from "@base-ui/react/tabs";
import {cva} from "class-variance-authority";
import {cn} from "cn";

export type TabsContentProps = TabsPrimitive.Panel.Props;

const contentVariants = cva(
  cn(
    "min-w-0 flex-1 outline-none",
    "focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px] focus-visible:rounded-rixl-sm",
    "data-[activation-direction=left]:animate-in data-[activation-direction=left]:fade-in-0 data-[activation-direction=left]:slide-in-from-left-1",
    "data-[activation-direction=right]:animate-in data-[activation-direction=right]:fade-in-0 data-[activation-direction=right]:slide-in-from-right-1",
    "data-[activation-direction=up]:animate-in data-[activation-direction=up]:fade-in-0 data-[activation-direction=up]:slide-in-from-top-1",
    "data-[activation-direction=down]:animate-in data-[activation-direction=down]:fade-in-0 data-[activation-direction=down]:slide-in-from-bottom-1",
    "duration-rixl-base ease-rixl-out motion-reduce:animate-none"
  )
);

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent({className, ...props}, ref) {
  return <TabsPrimitive.Panel ref={ref} data-slot="tabs-content" className={cn(contentVariants(), className)} {...props} />;
});
TabsContent.displayName = "TabsContent";
