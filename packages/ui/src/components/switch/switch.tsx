import {Switch as SwitchPrimitive} from "@base-ui-components/react/switch";
import {cn} from "cnfast";

/**
 * Rixl Switch — a two-state toggle.
 *
 * Ported from dashboard's shadcn Switch (Base UI Switch). Class names
 * swapped to `--rixl-*` tokens; `dark:*` variants dropped — rixl
 * re-evaluates every token under `[data-theme="dark"]`.
 */
function Switch({className, ...props}: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-checked:bg-rixl-primary data-unchecked:bg-rixl-border focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-rixl-xs transition-all outline-none focus-visible:ring-[3px] data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-rixl-surface pointer-events-none block size-4 rounded-full ring-0 transition-transform data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export {Switch};
export type SwitchProps = SwitchPrimitive.Root.Props;
