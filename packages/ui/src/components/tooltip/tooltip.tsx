import {Tooltip as TooltipPrimitive} from "@base-ui-components/react/tooltip";
import {cn} from "cnfast";

/**
 * Rixl Tooltip — a small contextual label anchored to a trigger.
 *
 * Ported from dashboard's shadcn Tooltip (Base UI Tooltip). Composition:
 * - `<TooltipProvider>` — timing context (default delay=0).
 * - `<Tooltip>` — the root; wraps its own Provider so consumers can drop
 *   a single Tooltip anywhere without wiring a provider first.
 * - `<TooltipTrigger>` — the anchor element.
 * - `<TooltipContent>` — the portalled popup with an arrow. Positioning
 *   props (side/align/offset) are pass-through.
 *
 * Class names swapped to `--rixl-*` tokens; the tooltip surface uses
 * `bg-rixl-primary` / `text-rixl-primary-fg` for the classic dark chip
 * pattern.
 */
function TooltipProvider({delay = 0, ...props}: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />;
}

function Tooltip({...props}: TooltipPrimitive.Root.Props) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({...props}: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 0,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props & Pick<TooltipPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className="isolate z-50">
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "bg-rixl-primary text-rixl-primary-fg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 z-50 w-fit origin-(--transform-origin) rounded-rixl-md px-3 py-1.5 text-xs text-balance",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="bg-rixl-primary fill-rixl-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export {Tooltip, TooltipTrigger, TooltipContent, TooltipProvider};
export type TooltipProps = TooltipPrimitive.Root.Props;
export type TooltipProviderProps = TooltipPrimitive.Provider.Props;
export type TooltipTriggerProps = TooltipPrimitive.Trigger.Props;
export type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;
