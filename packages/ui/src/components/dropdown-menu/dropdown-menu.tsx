import {forwardRef} from "react";
import {Menu as MenuPrimitive} from "@base-ui/react/menu";

import {DropdownMenuContent, type DropdownMenuContentProps} from "./content";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuRadioGroupProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuShortcutProps,
} from "./items";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubProps,
  type DropdownMenuSubTriggerProps,
} from "./sub";

/**
 * Rixl DropdownMenu — a popup menu of actions anchored to a trigger.
 *
 * Ported from dashboard's shadcn DropdownMenu (Base UI Menu). Offers:
 * - `<DropdownMenu>` / `<DropdownMenuTrigger>` / `<DropdownMenuPortal>`.
 * - `<DropdownMenuContent>` — portalled popup; `side`/`align`/offsets
 *   pass through; scrolls when taller than the viewport.
 * - `<DropdownMenuItem>` — action row; `inset` indents it, `variant`
 *   ("default" | "danger") colors it.
 * - `<DropdownMenuCheckboxItem>` / `<DropdownMenuRadioItem>` +
 *   `<DropdownMenuRadioGroup>` — selectable rows with indicators.
 * - `<DropdownMenuLabel>` / `<DropdownMenuSeparator>` /
 *   `<DropdownMenuShortcut>`.
 * - `<DropdownMenuSub>` / `<DropdownMenuSubTrigger>` /
 *   `<DropdownMenuSubContent>` — nested menus.
 *
 * Class names swapped to `--rixl-*` tokens. There is no `accent` token
 * in rixl, so hover/focus highlight maps to `bg-rixl-surface-muted`
 * with `text-rixl-fg`; danger maps to `text-rixl-danger`.
 */
export type DropdownMenuProps = MenuPrimitive.Root.Props;
export type DropdownMenuPortalProps = MenuPrimitive.Portal.Props;
export type DropdownMenuTriggerProps = MenuPrimitive.Trigger.Props;
export type DropdownMenuGroupProps = MenuPrimitive.Group.Props;

export const DropdownMenu = MenuPrimitive.Root;

export function DropdownMenuPortal({...props}: DropdownMenuPortalProps) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(function DropdownMenuTrigger(props, ref) {
  return <MenuPrimitive.Trigger ref={ref} data-slot="dropdown-menu-trigger" {...props} />;
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuGroup = forwardRef<HTMLDivElement, DropdownMenuGroupProps>(function DropdownMenuGroup(props, ref) {
  return <MenuPrimitive.Group ref={ref} data-slot="dropdown-menu-group" {...props} />;
});
DropdownMenuGroup.displayName = "DropdownMenuGroup";

export {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuRadioGroupProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuShortcutProps,
  type DropdownMenuSubProps,
  type DropdownMenuSubTriggerProps,
  type DropdownMenuSubContentProps,
};
