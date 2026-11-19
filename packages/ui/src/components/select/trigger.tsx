import {forwardRef} from "react";
import {Select as SelectPrimitive} from "@base-ui/react/select";
import {cva, type VariantProps} from "class-variance-authority";
import {ChevronDown} from "lucide-react";
import {cn} from "../../lib/cn";

import {controlRadius, controlSizes, controlSurface} from "../input/input-variants";

export const selectTriggerVariants = cva(
  cn(
    controlSurface,
    controlRadius,
    "data-[placeholder]:text-rixl-fg-muted [&_svg:not([class*='text-'])]:text-rixl-fg-muted",
    "items-center justify-between gap-2 whitespace-nowrap select-none touch-manipulation",
    // Adds `scale` to the control surface's transition, which already sets the duration and easing.
    "transition-[scale,color,box-shadow,border-color]",
    "enabled:active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100",
    // Opening the popup keeps the hover emphasis on the border.
    "data-[popup-open]:border-rixl-border-strong",
    "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ),
  {
    variants: {size: controlSizes},
    defaultVariants: {size: "base"},
  }
);

export type SelectTriggerProps = SelectPrimitive.Trigger.Props & VariantProps<typeof selectTriggerVariants>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
  {className, size = "base", children, ...props},
  ref
) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({size}), className)}
      {...props}
    >
      {children}
      {/* Chevron flips when the popup is open (ancestor carries data-popup-open). */}
      <SelectPrimitive.Icon
        render={
          <ChevronDown className="size-4 opacity-50 transition-transform duration-rixl-fast ease-rixl-out motion-reduce:transition-none [[data-popup-open]_&]:rotate-180" />
        }
      />
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = "SelectTrigger";

export type SelectValueProps = SelectPrimitive.Value.Props;

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue(props, ref) {
  return <SelectPrimitive.Value ref={ref} data-slot="select-value" {...props} />;
});
SelectValue.displayName = "SelectValue";
