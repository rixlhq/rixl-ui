import type {ComponentProps} from "react";
import {Select as SelectPrimitive} from "@base-ui/react/select";
import {cn} from "cn";

import {CheckIcon} from "./icons";

export type SelectItemProps = SelectPrimitive.Item.Props;

export function SelectItem({className, children, ...props}: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Base UI highlights the active option via data-highlighted (keyboard and
        // pointer) — not :focus — so drive the highlight from that. Selected rows
        // get a touch more weight on top of the checkmark.
        "data-highlighted:bg-rixl-surface-muted data-highlighted:text-rixl-fg data-selected:font-medium [&_svg:not([class*='text-'])]:text-rixl-fg-muted relative flex w-full cursor-pointer items-center gap-2 rounded-rixl-sm py-1.5 pe-8 ps-2 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute end-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export type SelectGroupProps = SelectPrimitive.Group.Props;

export function SelectGroup({...props}: SelectGroupProps) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export type SelectLabelProps = ComponentProps<"div">;

export function SelectLabel({className, ...props}: SelectLabelProps) {
  return <div data-slot="select-label" className={cn("text-rixl-fg-muted px-2 py-1.5 text-xs", className)} {...props} />;
}

export type SelectSeparatorProps = SelectPrimitive.Separator.Props;

export function SelectSeparator({className, ...props}: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-rixl-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}
