import * as React from "react";
import {mergeProps} from "@base-ui/react/merge-props";
import {useRender} from "@base-ui/react/use-render";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

import {Skeleton} from "../skeleton";
import {Tooltip, TooltipContent, TooltipTrigger} from "../tooltip";
import {SidebarSideContext, useSidebar} from "./sidebar-context";

export function SidebarMenu({className, ...props}: React.ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />;
}

export function SidebarMenuItem({className, ...props}: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />;
}

export const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-rixl-md p-2 text-start text-sm outline-hidden ring-rixl-sidebar-ring transition-[width,height,padding,transform] will-change-transform hover:bg-rixl-sidebar-accent hover:text-rixl-sidebar-accent-fg focus-visible:ring-2 active:scale-97 active:bg-rixl-sidebar-accent active:text-rixl-sidebar-accent-fg disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-rixl-sidebar-accent data-active:font-medium data-active:text-rixl-sidebar-accent-fg data-popup-open:hover:bg-rixl-sidebar-accent data-popup-open:hover:text-rixl-sidebar-accent-fg group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-rixl-sidebar-accent hover:text-rixl-sidebar-accent-fg",
        outline:
          "bg-rixl-bg shadow-[0_0_0_1px_hsl(var(--rixl-sidebar-border))] hover:bg-rixl-sidebar-accent hover:text-rixl-sidebar-accent-fg hover:shadow-[0_0_0_1px_hsl(var(--rixl-sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: useRender.ComponentProps<"button"> & {
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const {isMobile, state} = useSidebar();
  const side = React.useContext(SidebarSideContext);

  const button = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">({className: cn(sidebarMenuButtonVariants({variant, size}), className)}, props),
    render,
    state: {slot: "sidebar-menu-button", sidebar: "menu-button", size, active: isActive},
  });

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger render={button as React.ReactElement<Record<string, unknown>>} />
      <TooltipContent
        side={side === "left" ? "inline-end" : "inline-start"}
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

export function SidebarMenuAction({
  className,
  showOnHover = false,
  render,
  ...props
}: useRender.ComponentProps<"button"> & {
  showOnHover?: boolean;
}) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "text-rixl-sidebar-fg ring-rixl-sidebar-ring hover:bg-rixl-sidebar-accent hover:text-rixl-sidebar-accent-fg peer-hover/menu-button:text-rixl-sidebar-accent-fg absolute top-1.5 end-1 flex aspect-square w-5 items-center justify-center rounded-rixl-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 md:after:hidden",
          "peer-data-[size=sm]/menu-button:top-1",
          "peer-data-[size=default]/menu-button:top-1.5",
          "peer-data-[size=lg]/menu-button:top-2.5",
          "group-data-[collapsible=icon]:hidden",
          showOnHover &&
            "peer-data-active/menu-button:text-rixl-sidebar-accent-fg group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 aria-expanded:opacity-100 md:opacity-0",
          className
        ),
      },
      props
    ),
    render,
    state: {slot: "sidebar-menu-action", sidebar: "menu-action"},
  });
}

export function SidebarMenuBadge({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-rixl-sidebar-fg pointer-events-none absolute end-1 flex h-5 min-w-5 items-center justify-center rounded-rixl-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-rixl-sidebar-accent-fg peer-data-active/menu-button:text-rixl-sidebar-accent-fg",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}) {
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-rixl-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-rixl-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton className="h-4 w-[70%]" data-sidebar="menu-skeleton-text" />
    </div>
  );
}

export type SidebarMenuProps = React.ComponentProps<"ul">;
export type SidebarMenuItemProps = React.ComponentProps<"li">;
export type SidebarMenuButtonProps = useRender.ComponentProps<"button"> & {
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>;
export type SidebarMenuActionProps = useRender.ComponentProps<"button"> & {
  showOnHover?: boolean;
};
export type SidebarMenuBadgeProps = React.ComponentProps<"div">;
export type SidebarMenuSkeletonProps = React.ComponentProps<"div"> & {
  showIcon?: boolean;
};
