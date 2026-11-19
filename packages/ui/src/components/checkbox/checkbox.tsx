import {forwardRef} from "react";
import {Checkbox as CheckboxPrimitive} from "@base-ui/react/checkbox";
import {Check, Minus} from "lucide-react";
import {cn} from "../../lib/cn";
import {indicatorPop} from "../../lib/classes";
import {focusRing} from "../../lib/classes";

/**
 * Rixl Checkbox — a boolean form control.
 *
 * Base UI Checkbox on `--rixl-*` tokens. Beyond the original port:
 * - hover strengthens the border (unchecked) / deepens the fill (checked);
 * - the check/dash pops in (`zoom-in`), reduced-motion safe;
 * - `indeterminate` is supported — the root's `data-indeterminate` swaps the
 *   check for a dash and fills the box like a checked one.
 */
const Checkbox = forwardRef<HTMLElement, CheckboxPrimitive.Root.Props>(function Checkbox({className, ...props}, ref) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        "peer border-rixl-border inline-flex size-4 shrink-0 items-center justify-center rounded-[4px] border shadow-xs outline-none touch-manipulation",
        "transition-[scale,box-shadow,border-color,background-color] duration-(--rixl-motion-fast) ease-out",
        "enabled:active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100",
        "data-unchecked:enabled:hover:border-rixl-border-strong",
        "data-checked:bg-rixl-primary data-checked:text-rixl-primary-fg data-checked:border-rixl-primary",
        "data-indeterminate:bg-rixl-primary data-indeterminate:text-rixl-primary-fg data-indeterminate:border-rixl-primary",
        "data-checked:enabled:hover:bg-rixl-primary-hover data-checked:enabled:hover:border-rixl-primary-hover",
        "data-indeterminate:enabled:hover:bg-rixl-primary-hover data-indeterminate:enabled:hover:border-rixl-primary-hover",
        focusRing,
        "aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={cn("text-rixl-primary-fg flex items-center justify-center", indicatorPop)}
      >
        <Check data-slot="checkbox-icon" strokeWidth={3} className="size-3.5 [[data-indeterminate]_&]:hidden" />
        <Minus data-slot="checkbox-icon" strokeWidth={3} className="hidden size-3.5 [[data-indeterminate]_&]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = "Checkbox";

export {Checkbox};
export type CheckboxProps = CheckboxPrimitive.Root.Props;
