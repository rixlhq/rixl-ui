import {forwardRef, type ComponentProps} from "react";
import {Select as SelectPrimitive} from "@base-ui/react/select";
import {Check} from "lucide-react";
import {cn} from "../../lib/cn";
import {menuItem} from "../../lib/classes";

export type SelectItemProps = SelectPrimitive.Item.Props;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem({className, children, ...props}, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn(
        // Selected rows get a touch more weight on top of the checkmark.
        menuItem,
        "data-selected:font-medium [&_svg:not([class*='text-'])]:text-rixl-fg-muted w-full pe-8 ps-2 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
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
          className="scale-50 opacity-0 transition-[scale,opacity] duration-(--rixl-motion-fast) ease-out in-data-selected:scale-100 in-data-selected:opacity-100 motion-reduce:transition-none"
        >
          <Check className="size-4" />
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
