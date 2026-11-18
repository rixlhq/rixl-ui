import * as React from "react";
import {cn} from "../../lib/cn";
import {PanelLeftIcon, PanelLeftOpenIcon, PanelRightIcon, PanelRightOpenIcon} from "lucide-react";

import {Button} from "../button";
import {useSidebar} from "./context";

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(function SidebarTrigger(
  {className, onClick, ...props},
  ref
) {
  const {toggleSidebar, open, isMobile} = useSidebar();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-8", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <SidebarTriggerIcon isMobile={isMobile} isHovered={isHovered} isOpened={open} />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

interface SidebarTriggerIconProps {
  isMobile: boolean;
  isOpened: boolean;
  isHovered: boolean;
}

function SidebarTriggerIcon({isMobile, isHovered, isOpened}: SidebarTriggerIconProps) {
  if (isMobile) return <PanelLeftIcon />;
  return isOpened ? isHovered ? <PanelRightOpenIcon /> : <PanelRightIcon /> : isHovered ? <PanelLeftOpenIcon /> : <PanelLeftIcon />;
}

export const SidebarRail = React.forwardRef<HTMLButtonElement, SidebarRailProps>(function SidebarRail({className, ...props}, ref) {
  const {toggleSidebar} = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hover:after:bg-rixl-sidebar-border absolute inset-y-0 z-20 hidden w-4 cursor-ew-resize ltr:-translate-x-1/2 rtl:translate-x-1/2 transition-colors duration-rixl-fast ease-rixl-out group-data-[side=left]:-end-4 group-data-[side=right]:start-0 after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] sm:flex",
        "hover:group-data-[collapsible=offcanvas]:bg-rixl-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:end-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-end-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-start-2",
        className
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

export type SidebarTriggerProps = React.ComponentProps<typeof Button>;
export type SidebarRailProps = React.ComponentProps<"button">;
