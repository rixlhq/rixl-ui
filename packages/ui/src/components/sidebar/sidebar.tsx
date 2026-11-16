import * as React from "react";
import {cn} from "cn";

import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "../sheet";
import {SidebarSideContext, useSidebar} from "./sidebar-context";

const SIDEBAR_WIDTH_MOBILE = "18rem";

export type SidebarProps = React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
};

type PanelProps = Omit<SidebarProps, "side"> & {side: "left" | "right"};

function StaticSidebar({className, children, ...props}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar"
      className={cn("bg-rixl-sidebar text-rixl-sidebar-fg flex h-full w-(--sidebar-width) flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// className styles the desktop container; the mobile sheet keeps its own classes, as before the split.
function MobileSidebar({side, className: _className, children, ...props}: PanelProps) {
  const {openMobile, setOpenMobile} = useSidebar();

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
      <SheetContent
        data-sidebar="sidebar"
        data-slot="sidebar"
        data-mobile="true"
        className="bg-rixl-sidebar text-rixl-sidebar-fg w-(--sidebar-width) p-0 [&>button]:hidden"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          } as React.CSSProperties
        }
        side={side}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Displays the mobile sidebar.</SheetDescription>
        </SheetHeader>
        <div className="flex h-full w-full flex-col">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

function DesktopSidebar({side, variant = "sidebar", collapsible = "offcanvas", className, children, ...props}: PanelProps) {
  const {state} = useSidebar();
  const isInset = variant === "floating" || variant === "inset";

  return (
    <div
      className="group peer text-rixl-sidebar-fg hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-sidebar ease-curve-sidebar",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          isInset
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[inset-inline-start,inset-inline-end,width] duration-sidebar ease-curve-sidebar md:flex",
          side === "left"
            ? "start-0 group-data-[collapsible=offcanvas]:start-[calc(var(--sidebar-width)*-1)]"
            : "end-0 group-data-[collapsible=offcanvas]:end-[calc(var(--sidebar-width)*-1)]",
          isInset
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-e group-data-[side=right]:border-s",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-rixl-sidebar group-data-[variant=floating]:border-rixl-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-rixl-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-rixl-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarPanel({side = "left", collapsible = "offcanvas", variant, ...props}: SidebarProps) {
  const {isMobile} = useSidebar();
  if (collapsible === "none") return <StaticSidebar {...props} />;
  if (isMobile) return <MobileSidebar side={side} {...props} />;
  return <DesktopSidebar side={side} variant={variant} collapsible={collapsible} {...props} />;
}

export function Sidebar(props: SidebarProps) {
  return (
    <SidebarSideContext.Provider value={props.side ?? "left"}>
      <SidebarPanel {...props} />
    </SidebarSideContext.Provider>
  );
}
