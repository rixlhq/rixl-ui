import {forwardRef} from "react";
import {Radio as RadioPrimitive} from "@base-ui/react/radio";
import {RadioGroup as RadioGroupPrimitive} from "@base-ui/react/radio-group";
import {Circle} from "lucide-react";
import {cn} from "../../lib/cn";
import {indicatorPop, invalidRing, toggleControl} from "../../lib/classes";

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
        toggleControl,
        "text-rixl-primary flex justify-center aspect-square size-4 rounded-full",
        "data-unchecked:not-data-disabled:hover:border-rixl-border-strong data-checked:border-rixl-primary",
        invalidRing,
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
