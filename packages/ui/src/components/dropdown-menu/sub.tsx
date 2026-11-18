import {forwardRef, type ComponentProps} from "react";
import {Menu as MenuPrimitive} from "@base-ui/react/menu";
import {ChevronRight} from "lucide-react";
import {cn} from "../../lib/cn";
import {menuItem, rtlFlip} from "../../lib/classes";

import {DropdownMenuContent} from "./content";

export type DropdownMenuSubProps = MenuPrimitive.SubmenuRoot.Props;

export function DropdownMenuSub({...props}: DropdownMenuSubProps) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

export type DropdownMenuSubTriggerProps = MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
};

export const DropdownMenuSubTrigger = forwardRef<HTMLElement, DropdownMenuSubTriggerProps>(function DropdownMenuSubTrigger(
  {className, inset, children, ...props},
  ref
) {
  return (
    <MenuPrimitive.SubmenuTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(menuItem, "data-popup-open:bg-rixl-surface-muted data-popup-open:text-rixl-fg px-2 data-[inset]:ps-8", className)}
      {...props}
    >
      {children}
      <ChevronRight className={cn("ms-auto size-4", rtlFlip)} />
    </MenuPrimitive.SubmenuTrigger>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export type DropdownMenuSubContentProps = ComponentProps<typeof DropdownMenuContent>;

export const DropdownMenuSubContent = forwardRef<HTMLDivElement, DropdownMenuSubContentProps>(function DropdownMenuSubContent(
  {className, align = "start", alignOffset = -3, side = "inline-end", sideOffset = 0, ...props},
  ref
) {
  return (
    <DropdownMenuContent
      ref={ref}
      data-slot="dropdown-menu-sub-content"
      className={cn("min-w-[8rem] shadow-rixl-lg", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
});
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
