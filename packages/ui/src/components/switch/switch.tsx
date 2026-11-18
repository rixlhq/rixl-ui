import {forwardRef} from "react";
import {Switch as SwitchPrimitive} from "@base-ui/react/switch";
import {cn} from "../../lib/cn";
import {focusRing} from "../../lib/classes";

/**
 * Rixl Switch — a two-state toggle.
 *
 * Ported from dashboard's shadcn Switch (Base UI Switch). Class names
 * swapped to `--rixl-*` tokens; `dark:*` variants dropped — rixl
 * re-evaluates every token under `[data-theme="dark"]`.
 */
const Switch = forwardRef<HTMLElement, SwitchPrimitive.Root.Props>(function Switch({className, ...props}, ref) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-rixl-xs outline-none touch-manipulation",
        "transition-[scale,background-color,border-color,box-shadow] duration-rixl-fast ease-rixl-out",
        "enabled:active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100",
        "data-checked:bg-rixl-primary data-unchecked:bg-rixl-border",
        "data-checked:enabled:hover:bg-rixl-primary-hover data-unchecked:enabled:hover:bg-rixl-border-strong",
        focusRing,
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-rixl-surface pointer-events-none block size-4 rounded-full ring-0 transition-transform duration-rixl-fast ease-rixl-out motion-reduce:transition-none data-checked:translate-x-[calc(100%-2px)] rtl:data-checked:-translate-x-[calc(100%-2px)] data-unchecked:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
});
Switch.displayName = "Switch";

export {Switch};
export type SwitchProps = SwitchPrimitive.Root.Props;
