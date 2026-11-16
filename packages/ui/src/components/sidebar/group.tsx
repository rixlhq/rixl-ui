import * as React from "react";
import {mergeProps} from "@base-ui/react/merge-props";
import {useRender} from "@base-ui/react/use-render";
import {cn} from "cn";

export function SidebarGroup({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div data-slot="sidebar-group" data-sidebar="group" className={cn("relative flex w-full min-w-0 flex-col p-2", className)} {...props} />
  );
}

export function SidebarGroupLabel({className, render, ...props}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "text-rixl-sidebar-fg/70 ring-rixl-sidebar-ring flex h-8 shrink-0 items-center rounded-rixl-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className
        ),
      },
      props
    ),
    render,
    state: {slot: "sidebar-group-label", sidebar: "group-label"},
  });
}

export function SidebarGroupAction({className, render, ...props}: useRender.ComponentProps<"button">) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "text-rixl-sidebar-fg ring-rixl-sidebar-ring hover:bg-rixl-sidebar-accent hover:text-rixl-sidebar-accent-fg absolute top-3.5 end-3 flex aspect-square w-5 items-center justify-center rounded-rixl-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 md:after:hidden",
          "group-data-[collapsible=icon]:hidden",
          className
        ),
      },
      props
    ),
    render,
    state: {slot: "sidebar-group-action", sidebar: "group-action"},
  });
}

export function SidebarGroupContent({className, ...props}: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group-content" data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />;
}

export type SidebarGroupProps = React.ComponentProps<"div">;
export type SidebarGroupLabelProps = useRender.ComponentProps<"div">;
export type SidebarGroupActionProps = useRender.ComponentProps<"button">;
export type SidebarGroupContentProps = React.ComponentProps<"div">;
