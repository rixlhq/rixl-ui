import * as React from "react";
import {cn} from "cn";

import {Input} from "../input";
import {Separator} from "../separator";

export function SidebarInset({className, ...props}: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-rixl-bg relative flex w-full min-w-0 flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ms-0 md:peer-data-[variant=inset]:rounded-rixl-xl md:peer-data-[variant=inset]:shadow-rixl-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2",
        className
      )}
      {...props}
    />
  );
}

export function SidebarInput({className, ...props}: React.ComponentProps<typeof Input>) {
  return <Input data-slot="sidebar-input" data-sidebar="input" className={cn("bg-rixl-bg h-8 w-full shadow-none", className)} {...props} />;
}

export function SidebarHeader({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
}

export function SidebarFooter({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-footer" data-sidebar="footer" className={cn("flex flex-col gap-2 pb-2", className)} {...props} />;
}

export function SidebarSeparator({className, ...props}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-rixl-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  );
}

export function SidebarContent({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)}
      {...props}
    />
  );
}

export type SidebarInsetProps = React.ComponentProps<"main">;
export type SidebarInputProps = React.ComponentProps<typeof Input>;
export type SidebarHeaderProps = React.ComponentProps<"div">;
export type SidebarFooterProps = React.ComponentProps<"div">;
export type SidebarSeparatorProps = React.ComponentProps<typeof Separator>;
export type SidebarContentProps = React.ComponentProps<"div">;
