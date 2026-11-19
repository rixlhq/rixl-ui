import {forwardRef, type ReactNode} from "react";
import {Switch as SwitchPrimitive} from "@base-ui/react/switch";
import {cn} from "../../lib/cn";
import {toggleControl} from "../../lib/classes";
import {useWarnUnnamedControl} from "../../lib/warn-missing-name";
import {ControlField} from "../label/control-field";

/**
 * Rixl Switch — a two-state toggle.
 *
 * Ported from dashboard's shadcn Switch (Base UI Switch). Class names
 * swapped to `--rixl-*` tokens; `dark:*` variants dropped — rixl
 * re-evaluates every token under `[data-theme="dark"]`.
 *
 * With a `label` the control renders inside a Base UI `Field`, whose label
 * encloses it; without one it is the bare control, which the app names with
 * `aria-label` or `aria-labelledby`.
 */
const Switch = forwardRef<HTMLElement, SwitchProps>(function Switch(
  {className, label, labelTooltip, labelTooltipAriaLabel, controlFirst, required, disabled, ...props},
  ref
) {
  useWarnUnnamedControl({component: "Switch", label, ariaLabel: props["aria-label"], ariaLabelledBy: props["aria-labelledby"]});
  const control = (
    <SwitchPrimitive.Root
      ref={ref}
      required={required}
      disabled={disabled}
      data-slot="switch"
      className={cn(
        toggleControl,
        "peer inline-flex h-[1.15rem] w-8 rounded-full border-transparent",
        "data-checked:bg-rixl-primary data-unchecked:bg-rixl-border",
        "data-checked:not-data-disabled:hover:bg-rixl-primary-hover data-unchecked:not-data-disabled:hover:bg-rixl-border-strong",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-rixl-surface pointer-events-none block size-4 rounded-full ring-0 transition-transform duration-(--rixl-motion-fast) ease-out motion-reduce:transition-none data-checked:translate-x-[calc(100%-2px)] rtl:data-checked:-translate-x-[calc(100%-2px)] data-unchecked:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
  if (!label) return control;
  return (
    <ControlField
      component="Switch"
      label={label}
      required={required}
      labelTooltip={labelTooltip}
      labelTooltipAriaLabel={labelTooltipAriaLabel}
      controlFirst={controlFirst}
      disabled={disabled}
    >
      {control}
    </ControlField>
  );
});
Switch.displayName = "Switch";

export {Switch};
export type SwitchProps = SwitchPrimitive.Root.Props & {
  /** Visible label. Turns on the `Field` wrapper that names the control and makes the text clickable. */
  label?: ReactNode;
  /** Content of a tooltip opened from an info trigger after the label. */
  labelTooltip?: ReactNode;
  /** The accessible name of the tooltip trigger. The library invents none; without it `Switch` warns in development. */
  labelTooltipAriaLabel?: string;
  /** `true` (default) puts the control before the label text, `false` after it. */
  controlFirst?: boolean;
};
