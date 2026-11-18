import {forwardRef, type ComponentProps} from "react";
import {Select as SelectPrimitive} from "@base-ui/react/select";
import {ChevronDown, ChevronUp} from "lucide-react";
import {cn} from "../../lib/cn";

export type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger">;

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  {className, children, side = "bottom", sideOffset = 4, align = "start", alignOffset = 0, alignItemWithTrigger = false, ...props},
  ref
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          ref={ref}
          data-slot="select-content"
          className={cn(
            "bg-rixl-surface text-rixl-fg relative z-50 max-h-(--available-height) min-w-[8rem] max-w-[calc(100dvw-2rem)] origin-(--transform-origin) overflow-x-hidden overflow-y-auto overscroll-contain wrap-anywhere rounded-rixl-md border border-rixl-border shadow-rixl-md",
            "transition-[scale,opacity] duration-rixl-fast ease-rixl-out motion-reduce:transition-none",
            "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="p-1">{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = "SelectContent";

export type SelectScrollUpButtonProps = ComponentProps<typeof SelectPrimitive.ScrollUpArrow>;

export const SelectScrollUpButton = forwardRef<HTMLDivElement, SelectScrollUpButtonProps>(function SelectScrollUpButton(
  {className, ...props},
  ref
) {
  return (
    <SelectPrimitive.ScrollUpArrow
      ref={ref}
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpArrow>
  );
});
SelectScrollUpButton.displayName = "SelectScrollUpButton";

export type SelectScrollDownButtonProps = ComponentProps<typeof SelectPrimitive.ScrollDownArrow>;

export const SelectScrollDownButton = forwardRef<HTMLDivElement, SelectScrollDownButtonProps>(function SelectScrollDownButton(
  {className, ...props},
  ref
) {
  return (
    <SelectPrimitive.ScrollDownArrow
      ref={ref}
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownArrow>
  );
});
SelectScrollDownButton.displayName = "SelectScrollDownButton";
