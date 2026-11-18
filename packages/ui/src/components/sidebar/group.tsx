import * as React from "react";
import {mergeProps} from "@base-ui/react/merge-props";
import {useRender} from "@base-ui/react/use-render";
import {cn} from "../../lib/cn";

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(function SidebarGroup({className, ...props}, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(function SidebarGroupLabel(
  {className, render, ...props},
  ref
) {
  return useRender({
    defaultTagName: "div",
    ref,
    props: mergeProps<"div">(
      {
        className: cn(
          "text-rixl-sidebar-fg/70 ring-rixl-sidebar-ring flex h-8 shrink-0 items-center rounded-rixl-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-sidebar ease-curve-sidebar focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className
        ),
      },
      props
    ),
    render,
    state: {slot: "sidebar-group-label", sidebar: "group-label"},
  });
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export const SidebarGroupAction = React.forwardRef<HTMLButtonElement, SidebarGroupActionProps>(function SidebarGroupAction(
  {className, render, ...props},
  ref
) {
  return useRender({
    defaultTagName: "button",
    ref,
    props: mergeProps<"button">(
      {
        className: cn(
          "text-rixl-sidebar-fg ring-rixl-sidebar-ring hover:bg-rixl-sidebar-accent hover:text-rixl-sidebar-accent-fg absolute top-3.5 end-3 flex aspect-square w-5 items-center justify-center rounded-rixl-md p-0 outline-hidden focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
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
});
SidebarGroupAction.displayName = "SidebarGroupAction";

export const SidebarGroupContent = React.forwardRef<HTMLDivElement, SidebarGroupContentProps>(function SidebarGroupContent(
  {className, ...props},
  ref
) {
  return (
    <div ref={ref} data-slot="sidebar-group-content" data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";

export type SidebarGroupProps = React.ComponentProps<"div">;
export type SidebarGroupLabelProps = useRender.ComponentProps<"div">;
export type SidebarGroupActionProps = useRender.ComponentProps<"button">;
export type SidebarGroupContentProps = React.ComponentProps<"div">;
