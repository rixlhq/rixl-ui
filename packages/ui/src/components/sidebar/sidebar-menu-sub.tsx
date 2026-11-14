import * as React from "react";
import {mergeProps} from "@base-ui/react/merge-props";
import {useRender} from "@base-ui/react/use-render";
import {cn} from "cn";

export function SidebarMenuSub({className, ...props}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-rixl-sidebar-border mx-3.5 flex min-w-0 translate-x-px rtl:-translate-x-px flex-col gap-1 border-s px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuSubItem({className, ...props}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
}

export function SidebarMenuSubButton({
  size = "md",
  isActive = false,
  className,
  render,
  ...props
}: useRender.ComponentProps<"a"> & {
  size?: "sm" | "md";
  isActive?: boolean;
}) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "text-rixl-sidebar-fg ring-rixl-sidebar-ring hover:bg-rixl-sidebar-accent hover:text-rixl-sidebar-accent-fg active:scale-97 active:bg-rixl-sidebar-accent active:text-rixl-sidebar-accent-fg [&>svg]:text-rixl-sidebar-accent-fg flex h-7 min-w-0 -translate-x-px rtl:translate-x-px items-center gap-2 overflow-hidden rounded-rixl-md px-2 outline-hidden transition-transform will-change-transform focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
          "data-active:bg-rixl-sidebar-accent data-active:text-rixl-sidebar-accent-fg",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          "group-data-[collapsible=icon]:hidden",
          "cursor-pointer",
          className
        ),
      },
      props
    ),
    render,
    state: {slot: "sidebar-menu-sub-button", sidebar: "menu-sub-button", size, active: isActive},
  });
}

export type SidebarMenuSubProps = React.ComponentProps<"ul">;
export type SidebarMenuSubItemProps = React.ComponentProps<"li">;
export type SidebarMenuSubButtonProps = useRender.ComponentProps<"a"> & {
  size?: "sm" | "md";
  isActive?: boolean;
};
