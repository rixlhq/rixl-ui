import * as React from "react";
import {cn} from "../../lib/cn";

import {Input} from "../input";
import {Separator} from "../separator";

export const SidebarInset = React.forwardRef<HTMLElement, SidebarInsetProps>(function SidebarInset({className, ...props}, ref) {
  return (
    <main
      ref={ref}
      data-slot="sidebar-inset"
      className={cn(
        "bg-rixl-bg relative flex w-full min-w-0 flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ms-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2",
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

export const SidebarInput = React.forwardRef<HTMLInputElement, SidebarInputProps>(function SidebarInput({className, ...props}, ref) {
  return (
    <Input
      ref={ref}
      data-slot="sidebar-input"
      data-sidebar="input"
      surface="flat"
      className={cn("bg-rixl-bg h-8 w-full", className)}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(function SidebarHeader({className, ...props}, ref) {
  return <div ref={ref} data-slot="sidebar-header" data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarHeader.displayName = "SidebarHeader";

export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(function SidebarFooter({className, ...props}, ref) {
  return (
    <div ref={ref} data-slot="sidebar-footer" data-sidebar="footer" className={cn("flex flex-col gap-2 pb-2", className)} {...props} />
  );
});
SidebarFooter.displayName = "SidebarFooter";

export const SidebarSeparator = React.forwardRef<HTMLDivElement, SidebarSeparatorProps>(function SidebarSeparator(
  {className, ...props},
  ref
) {
  return (
    <Separator
      ref={ref}
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-rixl-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(function SidebarContent({className, ...props}, ref) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        // Thin tokenized scrollbar: `border-strong` stays visible against the
        // sidebar fill in both themes, `fg-subtle` on hover. `scrollbar-gutter`
        // reserves the gutter so content never shifts when overflow appears;
        // overlay-scrollbar platforms are unaffected. No scroll animation, so
        // keyboard scrolling and reduced-motion behavior are unchanged.
        "[scrollbar-width:thin]",
        "[scrollbar-color:var(--rixl-border-strong)_transparent]",
        "[scrollbar-gutter:stable]",
        "[&::-webkit-scrollbar]:w-2",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        "[&::-webkit-scrollbar-thumb]:rounded-full",
        "[&::-webkit-scrollbar-thumb]:border-2",
        "[&::-webkit-scrollbar-thumb]:border-transparent",
        "[&::-webkit-scrollbar-thumb]:bg-clip-content",
        "[&::-webkit-scrollbar-thumb]:bg-rixl-border-strong",
        "[&::-webkit-scrollbar-thumb:hover]:bg-rixl-fg-subtle",
        className
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

export type SidebarInsetProps = React.ComponentProps<"main">;
export type SidebarInputProps = React.ComponentProps<typeof Input>;
export type SidebarHeaderProps = React.ComponentProps<"div">;
export type SidebarFooterProps = React.ComponentProps<"div">;
export type SidebarSeparatorProps = React.ComponentProps<typeof Separator>;
export type SidebarContentProps = React.ComponentProps<"div">;
