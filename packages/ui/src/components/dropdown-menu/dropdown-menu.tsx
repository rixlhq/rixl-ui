import * as React from "react";
import {Menu as MenuPrimitive} from "@base-ui/react/menu";
import {cn} from "cn";

/**
 * Rixl DropdownMenu — a popup menu of actions anchored to a trigger.
 *
 * Ported from dashboard's shadcn DropdownMenu (Base UI Menu). Offers:
 * - `<DropdownMenu>` / `<DropdownMenuTrigger>` / `<DropdownMenuPortal>`.
 * - `<DropdownMenuContent>` — portalled popup; `side`/`align`/offsets
 *   pass through; scrolls when taller than the viewport.
 * - `<DropdownMenuItem>` — action row; `inset` indents it, `variant`
 *   ("default" | "destructive") colors it.
 * - `<DropdownMenuCheckboxItem>` / `<DropdownMenuRadioItem>` +
 *   `<DropdownMenuRadioGroup>` — selectable rows with indicators.
 * - `<DropdownMenuLabel>` / `<DropdownMenuSeparator>` /
 *   `<DropdownMenuShortcut>`.
 * - `<DropdownMenuSub>` / `<DropdownMenuSubTrigger>` /
 *   `<DropdownMenuSubContent>` — nested menus.
 *
 * Class names swapped to `--rixl-*` tokens. There is no `accent` token
 * in rixl, so hover/focus highlight maps to `bg-rixl-surface-muted`
 * with `text-rixl-fg`; destructive maps to `text-rixl-danger`.
 * Indicator/submenu icons are inlined local SVGs to keep the library
 * icon-dep-free.
 */
function DropdownMenu({...props}: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({...props}: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({...props}: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  className,
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: MenuPrimitive.Popup.Props & Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "bg-rixl-surface text-rixl-fg data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 z-50 max-h-(--available-height) min-w-[8rem] origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-rixl-md border-rixl-border border p-1 shadow-rixl-md outline-hidden",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({...props}: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-rixl-surface-muted focus:text-rixl-fg data-[variant=destructive]:text-rixl-danger data-[variant=destructive]:focus:bg-rixl-danger/10 data-[variant=destructive]:focus:text-rixl-danger data-[variant=destructive]:*:[svg]:!text-rixl-danger [&_svg:not([class*='text-'])]:text-rixl-fg-muted relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({className, children, checked, ...props}: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-rixl-surface-muted focus:text-rixl-fg relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon className="size-4" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({...props}: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({className, children, ...props}: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-rixl-surface-muted focus:text-rixl-fg relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean;
}) {
  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({className, ...props}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn("bg-rixl-border -mx-1 my-1 h-px", className)} {...props} />
  );
}

function DropdownMenuShortcut({className, ...props}: React.ComponentProps<"span">) {
  return (
    <span data-slot="dropdown-menu-shortcut" className={cn("text-rixl-fg-muted ml-auto text-xs tracking-widest", className)} {...props} />
  );
}

function DropdownMenuSub({...props}: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-rixl-surface-muted focus:text-rixl-fg data-popup-open:bg-rixl-surface-muted data-popup-open:text-rixl-fg flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("min-w-[8rem] overflow-hidden shadow-rixl-lg", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

function CheckIcon({className}: {className?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ChevronRightIcon({className}: {className?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CircleIcon({className}: {className?: string}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
export type DropdownMenuProps = MenuPrimitive.Root.Props;
export type DropdownMenuTriggerProps = MenuPrimitive.Trigger.Props;
export type DropdownMenuContentProps = MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;
export type DropdownMenuItemProps = MenuPrimitive.Item.Props & {inset?: boolean; variant?: "default" | "destructive"};
export type DropdownMenuCheckboxItemProps = MenuPrimitive.CheckboxItem.Props;
export type DropdownMenuRadioGroupProps = MenuPrimitive.RadioGroup.Props;
export type DropdownMenuRadioItemProps = MenuPrimitive.RadioItem.Props;
export type DropdownMenuLabelProps = React.ComponentProps<"div"> & {inset?: boolean};
export type DropdownMenuSeparatorProps = MenuPrimitive.Separator.Props;
export type DropdownMenuShortcutProps = React.ComponentProps<"span">;
export type DropdownMenuSubProps = MenuPrimitive.SubmenuRoot.Props;
export type DropdownMenuSubTriggerProps = MenuPrimitive.SubmenuTrigger.Props & {inset?: boolean};
export type DropdownMenuSubContentProps = React.ComponentProps<typeof DropdownMenuContent>;
