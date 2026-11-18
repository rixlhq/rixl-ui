import {forwardRef, type ComponentProps} from "react";
import {Select as SelectPrimitive} from "@base-ui/react/select";
import {cn} from "../../lib/cn";

import {CheckIcon} from "./icons";

export type SelectItemProps = SelectPrimitive.Item.Props;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem({className, children, ...props}, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn(
        // Base UI highlights the active option via data-highlighted (keyboard and
        // pointer) — not :focus — so drive the highlight from that. Selected rows
        // get a touch more weight on top of the checkmark. cursor-default, like the
        // menu items and a native <option>: a pointer cursor is for links.
        "data-highlighted:bg-rixl-surface-muted data-highlighted:text-rixl-fg data-selected:font-medium [&_svg:not([class*='text-'])]:text-rixl-fg-muted relative flex w-full cursor-default items-center gap-2 rounded-rixl-sm py-1.5 pe-8 ps-2 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute end-2 flex size-3.5 items-center justify-center">
        {/*
          Same scale and fade as the DropdownMenu indicators. Base UI mounts this
          indicator only while selected and mounts it already settled, so
          data-starting-style never fires; keep it mounted and let the item's
          data-selected drive a plain CSS transition instead.
        */}
        <SelectPrimitive.ItemIndicator
          keepMounted
          className="scale-50 opacity-0 transition-[scale,opacity] duration-rixl-fast ease-rixl-out in-data-selected:scale-100 in-data-selected:opacity-100 motion-reduce:transition-none"
        >
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = "SelectItem";

export type SelectGroupProps = SelectPrimitive.Group.Props;

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(function SelectGroup(props, ref) {
  return <SelectPrimitive.Group ref={ref} data-slot="select-group" {...props} />;
});
SelectGroup.displayName = "SelectGroup";

export type SelectLabelProps = ComponentProps<"div">;

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(function SelectLabel({className, ...props}, ref) {
  return <div ref={ref} data-slot="select-label" className={cn("text-rixl-fg-muted px-2 py-1.5 text-xs", className)} {...props} />;
});
SelectLabel.displayName = "SelectLabel";

export type SelectSeparatorProps = SelectPrimitive.Separator.Props;

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(function SelectSeparator({className, ...props}, ref) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      data-slot="select-separator"
      className={cn("bg-rixl-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
});
SelectSeparator.displayName = "SelectSeparator";
