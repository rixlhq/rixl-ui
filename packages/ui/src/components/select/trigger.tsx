import {forwardRef} from "react";
import {Select as SelectPrimitive} from "@base-ui/react/select";
import {cva, type VariantProps} from "class-variance-authority";
import {ChevronDown} from "lucide-react";
import {cn} from "../../lib/cn";

export const selectTriggerVariants = cva(
  cn(
    "border-rixl-border data-[placeholder]:text-rixl-fg-muted [&_svg:not([class*='text-'])]:text-rixl-fg-muted",
    "flex w-fit items-center justify-between gap-2 rounded-rixl-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-rixl-xs outline-none select-none touch-manipulation",
    "transition-[scale,color,box-shadow,border-color] duration-rixl-fast ease-rixl-out",
    "enabled:active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100",
    // Hover strengthens the border; opening the popup keeps it emphasised.
    "enabled:hover:border-rixl-border-strong data-[popup-open]:border-rixl-border-strong",
    "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ),
  {
    variants: {size: {default: "h-9", sm: "h-8"}},
    defaultVariants: {size: "default"},
  }
);

export type SelectTriggerProps = SelectPrimitive.Trigger.Props & VariantProps<typeof selectTriggerVariants>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
  {className, size = "default", children, ...props},
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
