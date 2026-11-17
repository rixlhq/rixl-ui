import type {ComponentProps} from "react";
import {Menu as MenuPrimitive} from "@base-ui/react/menu";
import {cn} from "cn";

import {DropdownMenuContent} from "./content";
import {ChevronRightIcon} from "./icons";

export type DropdownMenuSubProps = MenuPrimitive.SubmenuRoot.Props;

export function DropdownMenuSub({...props}: DropdownMenuSubProps) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

export type DropdownMenuSubTriggerProps = MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
};

export function DropdownMenuSubTrigger({className, inset, children, ...props}: DropdownMenuSubTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "data-highlighted:bg-rixl-surface-muted data-highlighted:text-rixl-fg data-popup-open:bg-rixl-surface-muted data-popup-open:text-rixl-fg flex cursor-default items-center rounded-rixl-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:ps-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto size-4 rtl:-scale-x-100" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

export type DropdownMenuSubContentProps = ComponentProps<typeof DropdownMenuContent>;

export function DropdownMenuSubContent({
  className,
  align = "start",
  alignOffset = -3,
  side = "inline-end",
  sideOffset = 0,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("min-w-[8rem] shadow-rixl-lg", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}
