import * as React from "react";
import {Dialog as DialogPrimitive} from "@base-ui/react/dialog";
import {cn} from "../../lib/cn";

import {Dialog} from "../dialog/dialog-root";
import {DialogDescription} from "../dialog/dialog-description";
import {DialogHeader} from "../dialog/dialog-header";
import {DialogOverlay} from "../dialog/dialog-overlay";
import {DialogPortal} from "../dialog/dialog-portal";
import {DialogTitle} from "../dialog/dialog-title";
import {SidebarSideContext, useSidebar} from "./context";

const SIDEBAR_WIDTH_MOBILE = "18rem";

const MOBILE_PANEL_CLASSES = cn(
  "bg-rixl-sidebar text-rixl-sidebar-fg fixed inset-y-0 z-50 flex h-dvh w-(--sidebar-width) flex-col overflow-x-hidden overflow-y-auto overscroll-contain wrap-anywhere [&>*]:min-w-0 [&>*]:shrink-0",
  "shadow-rixl-lg transition-transform duration-rixl-slow data-ending-style:duration-rixl-base ease-rixl-drawer motion-reduce:transition-none"
);

const MOBILE_PANEL_SIDE_CLASSES = {
  left: "left-0 border-r data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
  right: "right-0 border-l data-starting-style:translate-x-full data-ending-style:translate-x-full",
} as const;

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

// className styles the desktop container; the mobile panel keeps its own classes, as before the split.
function MobileSidebar({side, children}: PanelProps) {
  const {openMobile, setOpenMobile} = useSidebar();

  return (
    <Dialog open={openMobile} onOpenChange={setOpenMobile}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Popup
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className={cn(MOBILE_PANEL_CLASSES, MOBILE_PANEL_SIDE_CLASSES[side])}
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Sidebar</DialogTitle>
            <DialogDescription>Displays the mobile sidebar.</DialogDescription>
          </DialogHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
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
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-e group-data-[side=right]:border-s border-rixl-sidebar-border",
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
