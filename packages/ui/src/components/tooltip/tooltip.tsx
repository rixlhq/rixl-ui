import type {ReactNode} from "react";
import {Tooltip as TooltipPrimitive} from "@base-ui/react/tooltip";
import {cn} from "../../lib/cn";

/**
 * Rixl Tooltip — a small contextual label anchored to a trigger, shaped like
 * Kumo's: `<Tooltip content="Save" render={<Button />}>Save</Tooltip>`.
 *
 * - `content` is the popup; `children` go inside the trigger.
 * - `render` is the trigger element, a `<button>` when omitted.
 * - `<TooltipProvider>` — timing context shared by the tooltips under it
 *   (default hover-intent delay of 500ms). While one tooltip is open its
 *   neighbours open instantly. Pass `delay={0}` for instant tooltips. A
 *   tooltip's own `delay` wins over the provider's.
 *
 * Root props (`open`, `defaultOpen`, `onOpenChange`, `disabled`) pass through
 * to Base UI. The tooltip surface uses `bg-rixl-primary` / `text-rixl-primary-fg`
 * for the classic dark chip pattern.
 */
const TOOLTIP_DEFAULT_DELAY_MS = 500;

function TooltipProvider({delay = TOOLTIP_DEFAULT_DELAY_MS, ...props}: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider delay={delay} {...props} />;
}

function Tooltip({content, children, render, className, delay, closeDelay, side = "top", align = "center", ...props}: TooltipProps) {
  return (
    <TooltipPrimitive.Root {...props}>
      <TooltipPrimitive.Trigger data-slot="tooltip-trigger" render={render} className={className} delay={delay} closeDelay={closeDelay}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner align={align} side={side} sideOffset={8} className="isolate z-50">
          <TooltipPrimitive.Popup
            data-slot="tooltip-content"
            className={cn(
              "bg-rixl-primary text-rixl-primary-fg z-50 w-fit max-w-[calc(100dvw-2rem)] origin-(--transform-origin) rounded-md px-3 py-1.5 text-xs text-balance shadow-sm",
              "transition-[scale,opacity] duration-(--rixl-motion-fast) ease-out data-instant:duration-0 motion-reduce:transition-none",
              "data-starting-style:scale-[0.97] data-starting-style:opacity-0 data-ending-style:scale-[0.97] data-ending-style:opacity-0"
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="bg-rixl-primary fill-rixl-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] data-[side=bottom]:top-1 data-[side=left]:top-1/2! ltr:data-[side=left]:-end-1 rtl:data-[side=left]:-start-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! ltr:data-[side=right]:-start-1 rtl:data-[side=right]:-end-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-start-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-end-1 data-[side=inline-start]:-translate-y-1/2" />
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

export {Tooltip, TooltipProvider};
export type TooltipProps = Omit<TooltipPrimitive.Root.Props, "children"> &
  Pick<TooltipPrimitive.Trigger.Props, "render" | "className" | "delay" | "closeDelay"> &
  Pick<TooltipPrimitive.Positioner.Props, "side" | "align"> & {
    /** The popup's content. */
    content: ReactNode;
    /** Goes inside the trigger. */
    children?: ReactNode;
  };
export type TooltipProviderProps = TooltipPrimitive.Provider.Props;
