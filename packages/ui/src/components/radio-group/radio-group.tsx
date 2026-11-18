import {forwardRef} from "react";
import {Radio as RadioPrimitive} from "@base-ui/react/radio";
import {RadioGroup as RadioGroupPrimitive} from "@base-ui/react/radio-group";
import {Circle} from "lucide-react";
import {cn} from "../../lib/cn";
import {indicatorPop} from "../../lib/classes";
import {focusRing} from "../../lib/classes";

/**
 * Rixl RadioGroup — single-selection group of radio inputs.
 *
 * Ported from dashboard's shadcn RadioGroup (Base UI Radio +
 * RadioGroup). Class names swapped to `--rixl-*` tokens; `dark:*`
 * variants dropped.
 *
 * Composition:
 * - `<RadioGroup>` — the fieldset-like container.
 * - `<RadioGroupItem value="…" />` — an individual radio; wire a
 *   `<Label htmlFor="…" />` alongside for accessible labelling.
 */
const RadioGroup = forwardRef<HTMLDivElement, RadioGroupPrimitive.Props>(function RadioGroup({className, ...props}, ref) {
  return <RadioGroupPrimitive ref={ref} data-slot="radio-group" className={cn("grid gap-3", className)} {...props} />;
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = forwardRef<HTMLElement, RadioPrimitive.Root.Props>(function RadioGroupItem({className, ...props}, ref) {
  return (
    <RadioPrimitive.Root
      ref={ref}
      data-slot="radio-group-item"
      className={cn(
        "border-rixl-border text-rixl-primary flex items-center justify-center aspect-square size-4 shrink-0 rounded-full border shadow-rixl-xs outline-none touch-manipulation",
        "transition-[scale,box-shadow,border-color] duration-rixl-fast ease-rixl-out",
        "enabled:active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100",
        "data-unchecked:enabled:hover:border-rixl-border-strong data-checked:border-rixl-primary",
        focusRing,
        "aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator data-slot="radio-group-indicator" className={cn("flex items-center justify-center", indicatorPop)}>
        {/* A dot, not a ring: fill with no stroke, so it stays the size the dot was drawn at. */}
        <Circle strokeWidth={0} className="fill-rixl-primary size-2" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export {RadioGroup, RadioGroupItem};
export type RadioGroupProps = RadioGroupPrimitive.Props;
export type RadioGroupItemProps = RadioPrimitive.Root.Props;
