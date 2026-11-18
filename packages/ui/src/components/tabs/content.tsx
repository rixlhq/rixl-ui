import {forwardRef} from "react";
import {Tabs as TabsPrimitive} from "@base-ui/react/tabs";
import {cva} from "class-variance-authority";
import {cn} from "../../lib/cn";
import {focusRingBorderless} from "../../lib/classes";

export type TabsContentProps = TabsPrimitive.Panel.Props;

const contentVariants = cva(
  cn(
    "min-w-0 flex-1 outline-none",
    focusRingBorderless,
    "focus-visible:rounded-rixl-sm",
    // A short fade only: a slide restarts on every keyboard arrow press, and the initial 'none' direction skips the mount fade.
    "not-data-[activation-direction=none]:animate-in not-data-[activation-direction=none]:fade-in-0",
    "duration-rixl-fast ease-rixl-out motion-reduce:animate-none"
  )
);

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent({className, ...props}, ref) {
  return <TabsPrimitive.Panel ref={ref} data-slot="tabs-content" className={cn(contentVariants(), className)} {...props} />;
});
TabsContent.displayName = "TabsContent";
