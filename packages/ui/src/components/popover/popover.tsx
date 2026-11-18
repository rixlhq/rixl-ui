import {forwardRef} from "react";
import {Popover as PopoverPrimitive} from "@base-ui/react/popover";
import {cn} from "../../lib/cn";
import {popupSurface} from "../../lib/classes";

/**
 * Rixl Popover — a floating, dismissible surface anchored to a trigger.
 *
 * Ported from dashboard's shadcn Popover (Base UI Popover). Composition:
 * - `<Popover>` — root (open/dismissible control).
 * - `<PopoverTrigger>` — the anchor element.
 * - `<PopoverContent>` — the portalled popup with a default bottom
 *   placement, `w-72` width, border, and soft shadow. Positioning props
 *   (side/align/offset) are pass-through.
 *
 * Class names swapped to `--rixl-*` tokens; the popup surface uses the
 * `bg-rixl-surface` / `text-rixl-fg` panel pattern.
 */
function Popover({...props}: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverPrimitive.Trigger.Props>(function PopoverTrigger(props, ref) {
  return <PopoverPrimitive.Trigger ref={ref} data-slot="popover-trigger" {...props} />;
});
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  {className, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, ...props},
  ref
) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className="isolate z-50">
        <PopoverPrimitive.Popup ref={ref} data-slot="popover-content" className={cn(popupSurface, "w-72 p-4", className)} {...props} />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = "PopoverContent";

export {Popover, PopoverTrigger, PopoverContent};
export type PopoverProps = PopoverPrimitive.Root.Props;
export type PopoverTriggerProps = PopoverPrimitive.Trigger.Props;
export type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;
