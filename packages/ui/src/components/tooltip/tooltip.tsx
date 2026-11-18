import {forwardRef} from "react";
import {Tooltip as TooltipPrimitive} from "@base-ui/react/tooltip";
import {cn} from "../../lib/cn";

/**
 * Rixl Tooltip — a small contextual label anchored to a trigger.
 *
 * Ported from dashboard's shadcn Tooltip (Base UI Tooltip). Composition:
 * - `<TooltipProvider>` — timing context shared by the tooltips under it
 *   (default hover-intent delay of 500ms). While one tooltip is open its
 *   neighbours open instantly. Pass `delay={0}` for instant tooltips.
 * - `<Tooltip>` — the root. It does not wrap a provider, so it uses the
 *   delay of the nearest `TooltipProvider`; without one, Base UI's own
 *   default delay applies.
 * - `<TooltipTrigger>` — the anchor element.
 * - `<TooltipContent>` — the portalled popup with an arrow. Positioning
 *   props (side/align/offset) are pass-through.
 *
 * Class names swapped to `--rixl-*` tokens; the tooltip surface uses
 * `bg-rixl-primary` / `text-rixl-primary-fg` for the classic dark chip
 * pattern.
 */
const TOOLTIP_DEFAULT_DELAY_MS = 500;

function TooltipProvider({delay = TOOLTIP_DEFAULT_DELAY_MS, ...props}: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} {...props} />;
}

function Tooltip({...props}: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipPrimitive.Trigger.Props>(function TooltipTrigger(props, ref) {
  return <TooltipPrimitive.Trigger ref={ref} data-slot="tooltip-trigger" {...props} />;
});
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
  {className, side = "top", sideOffset = 8, align = "center", alignOffset = 0, children, ...props},
  ref
) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner align={align} alignOffset={alignOffset} side={side} sideOffset={sideOffset} className="isolate z-50">
        <TooltipPrimitive.Popup
          ref={ref}
          data-slot="tooltip-content"
          className={cn(
            "bg-rixl-primary text-rixl-primary-fg z-50 w-fit max-w-[calc(100dvw-2rem)] origin-(--transform-origin) rounded-rixl-md px-3 py-1.5 text-xs text-balance shadow-rixl-sm",
            "transition-[scale,opacity] duration-rixl-fast ease-rixl-out data-instant:duration-0 motion-reduce:transition-none",
            "data-starting-style:scale-[0.97] data-starting-style:opacity-0 data-ending-style:scale-[0.97] data-ending-style:opacity-0",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="bg-rixl-primary fill-rixl-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] data-[side=bottom]:top-1 data-[side=left]:top-1/2! ltr:data-[side=left]:-end-1 rtl:data-[side=left]:-start-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! ltr:data-[side=right]:-start-1 rtl:data-[side=right]:-end-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-start-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-end-1 data-[side=inline-start]:-translate-y-1/2" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = "TooltipContent";

export {Tooltip, TooltipTrigger, TooltipContent, TooltipProvider};
export type TooltipProps = TooltipPrimitive.Root.Props;
export type TooltipProviderProps = TooltipPrimitive.Provider.Props;
export type TooltipTriggerProps = TooltipPrimitive.Trigger.Props;
export type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<TooltipPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">;
