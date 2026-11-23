import {forwardRef, useContext, type ReactNode} from "react";
import {Checkbox as CheckboxPrimitive} from "@base-ui/react/checkbox";
import {Check, Minus} from "lucide-react";
import {cn} from "../../lib/cn";
import {indicatorPop, invalidRing, toggleControl} from "../../lib/classes";
import {useWarnUnnamedControl} from "../../lib/warn-missing-name";
import {ControlField} from "../label/control-field";
import {InCheckboxGroup} from "./checkbox-group-context";

/** The check, or the dash for `indeterminate`; Base UI mounts it with the checked state and it pops in. */
function CheckboxIndicator() {
  return (
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className={cn("text-rixl-primary-fg flex items-center justify-center", indicatorPop)}
    >
      <Check data-slot="checkbox-icon" strokeWidth={3} className="size-3.5 [[data-indeterminate]_&]:hidden" />
      <Minus data-slot="checkbox-icon" strokeWidth={3} className="hidden size-3.5 [[data-indeterminate]_&]:block" />
    </CheckboxPrimitive.Indicator>
  );
}

/**
 * Rixl Checkbox — a boolean form control.
 *
 * Base UI Checkbox on `--rixl-*` tokens. Beyond the original port:
 * - hover strengthens the border (unchecked) / deepens the fill (checked);
 * - the check/dash pops in (`zoom-in`), reduced-motion safe;
 * - `indeterminate` is supported — the root's `data-indeterminate` swaps the
 *   check for a dash and fills the box like a checked one.
 *
 * With a `label` the control renders inside a Base UI `Field`, whose label
 * encloses it; without one it is the bare control, which the app names with
 * `aria-label` or `aria-labelledby`.
 */
const Checkbox = forwardRef<HTMLElement, CheckboxProps>(function Checkbox(
  {className, label, labelTooltip, labelTooltipAriaLabel, controlFirst, variant, required, disabled, ...props},
  ref
) {
  const inGroup = useContext(InCheckboxGroup);
  useWarnUnnamedControl({component: "Checkbox", label, ariaLabel: props["aria-label"], ariaLabelledBy: props["aria-labelledby"]});
  const control = (
    <CheckboxPrimitive.Root
      ref={ref}
      required={required}
      disabled={disabled}
      aria-invalid={variant === "error" ? true : undefined}
      data-slot="checkbox"
      className={cn(
        toggleControl,
        "peer inline-flex size-4 justify-center rounded-xs",
        "data-unchecked:not-data-disabled:hover:border-rixl-border-strong",
        "data-checked:bg-rixl-primary data-checked:text-rixl-primary-fg data-checked:border-rixl-primary",
        "data-indeterminate:bg-rixl-primary data-indeterminate:text-rixl-primary-fg data-indeterminate:border-rixl-primary",
        "data-checked:not-data-disabled:hover:bg-rixl-primary-hover data-checked:not-data-disabled:hover:border-rixl-primary-hover",
        "data-indeterminate:not-data-disabled:hover:bg-rixl-primary-hover data-indeterminate:not-data-disabled:hover:border-rixl-primary-hover",
        invalidRing,
        className
      )}
      {...props}
    >
      <CheckboxIndicator />
    </CheckboxPrimitive.Root>
  );
  if (!label) return control;
  return (
    <ControlField
      component="Checkbox"
      label={label}
      required={required}
      labelTooltip={labelTooltip}
      labelTooltipAriaLabel={labelTooltipAriaLabel}
      controlFirst={controlFirst}
      disabled={disabled}
      inGroup={inGroup}
    >
      {control}
    </ControlField>
  );
});
Checkbox.displayName = "Checkbox";

export {Checkbox};
export type CheckboxProps = CheckboxPrimitive.Root.Props & {
  /** Visible label. Turns on the `Field` wrapper that names the control and makes the text clickable. */
  label?: ReactNode;
  /** Content of a tooltip opened from an info trigger after the label. */
  labelTooltip?: ReactNode;
  /** The accessible name of the tooltip trigger. The library invents none; without it `Checkbox` warns in development. */
  labelTooltipAriaLabel?: string;
  /** `true` (default) puts the control before the label text, `false` after it. */
  controlFirst?: boolean;
  /** `error` marks the control `aria-invalid`, which draws the danger border. */
  variant?: "default" | "error";
};
