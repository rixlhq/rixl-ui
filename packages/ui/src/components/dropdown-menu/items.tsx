import {forwardRef, type ComponentProps} from "react";
import {Menu as MenuPrimitive} from "@base-ui/react/menu";
import {cn} from "../../lib/cn";

import {CheckIcon, CircleIcon} from "./icons";

export type DropdownMenuItemProps = MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
};

export const DropdownMenuItem = forwardRef<HTMLElement, DropdownMenuItemProps>(function DropdownMenuItem(
  {className, inset, variant = "default", ...props},
  ref
) {
  return (
    <MenuPrimitive.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        // Base UI highlights via data-highlighted (keyboard + pointer), not :focus.
        // No transition-colors on menu rows: instant highlight prevents a fading trail on fast hover/arrow keys.
        "data-highlighted:bg-rixl-surface-muted data-highlighted:text-rixl-fg data-[variant=destructive]:text-rixl-danger data-[variant=destructive]:data-highlighted:bg-rixl-danger/10 data-[variant=destructive]:data-highlighted:text-rixl-danger data-[variant=destructive]:*:[svg]:!text-rixl-danger [&_svg:not([class*='text-'])]:text-rixl-fg-muted relative flex cursor-default items-center gap-2 rounded-rixl-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:ps-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

export type DropdownMenuCheckboxItemProps = MenuPrimitive.CheckboxItem.Props;

export const DropdownMenuCheckboxItem = forwardRef<HTMLElement, DropdownMenuCheckboxItemProps>(function DropdownMenuCheckboxItem(
  {className, children, checked, ...props},
  ref
) {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "data-highlighted:bg-rixl-surface-muted data-highlighted:text-rixl-fg relative flex cursor-default items-center gap-2 rounded-rixl-sm py-1.5 pe-2 ps-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute start-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator className="transition-[scale,opacity] duration-rixl-fast ease-rixl-out motion-reduce:transition-none data-starting-style:scale-50 data-starting-style:opacity-0 data-ending-style:scale-50 data-ending-style:opacity-0">
          <CheckIcon className="size-4" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export type DropdownMenuRadioGroupProps = MenuPrimitive.RadioGroup.Props;

export const DropdownMenuRadioGroup = forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(function DropdownMenuRadioGroup(props, ref) {
  return <MenuPrimitive.RadioGroup ref={ref} data-slot="dropdown-menu-radio-group" {...props} />;
});
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

export type DropdownMenuRadioItemProps = MenuPrimitive.RadioItem.Props;

export const DropdownMenuRadioItem = forwardRef<HTMLElement, DropdownMenuRadioItemProps>(function DropdownMenuRadioItem(
  {className, children, ...props},
  ref
) {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "data-highlighted:bg-rixl-surface-muted data-highlighted:text-rixl-fg relative flex cursor-default items-center gap-2 rounded-rixl-sm py-1.5 pe-2 ps-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute start-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator className="transition-[scale,opacity] duration-rixl-fast ease-rixl-out motion-reduce:transition-none data-starting-style:scale-50 data-starting-style:opacity-0 data-ending-style:scale-50 data-ending-style:opacity-0">
          <CircleIcon className="size-2 fill-current" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export type DropdownMenuLabelProps = ComponentProps<"div"> & {inset?: boolean};

export const DropdownMenuLabel = forwardRef<HTMLDivElement, DropdownMenuLabelProps>(function DropdownMenuLabel(
  {className, inset, ...props},
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("px-2 py-1.5 text-sm font-medium data-[inset]:ps-8", className)}
      {...props}
    />
  );
});
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export type DropdownMenuSeparatorProps = MenuPrimitive.Separator.Props;

export const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuSeparatorProps>(function DropdownMenuSeparator(
  {className, ...props},
  ref
) {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      data-slot="dropdown-menu-separator"
      className={cn("bg-rixl-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export type DropdownMenuShortcutProps = ComponentProps<"span">;

export const DropdownMenuShortcut = forwardRef<HTMLSpanElement, DropdownMenuShortcutProps>(function DropdownMenuShortcut(
  {className, ...props},
  ref
) {
  return (
    <span
      ref={ref}
      data-slot="dropdown-menu-shortcut"
      className={cn("text-rixl-fg-muted ms-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
});
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
