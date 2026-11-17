import {Popover as PopoverPrimitive} from "@base-ui/react/popover";
import {cn} from "cn";

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

function PopoverTrigger({...props}: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props & Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className="isolate z-50">
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "bg-rixl-surface text-rixl-fg z-50 w-72 max-h-(--available-height) max-w-[calc(100dvw-2rem)] overflow-x-hidden overflow-y-auto overscroll-contain wrap-anywhere origin-(--transform-origin) rounded-rixl-md border-rixl-border border p-4 shadow-rixl-md outline-hidden",
            "transition-[scale,opacity] duration-rixl-fast ease-rixl-out motion-reduce:transition-none",
            "data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export {Popover, PopoverTrigger, PopoverContent};
export type PopoverProps = PopoverPrimitive.Root.Props;
export type PopoverTriggerProps = PopoverPrimitive.Trigger.Props;
export type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;
