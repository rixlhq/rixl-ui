import {Radio as RadioPrimitive} from "@base-ui/react/radio";
import {RadioGroup as RadioGroupPrimitive} from "@base-ui/react/radio-group";
import {cn} from "cn";

/**
 * Rixl RadioGroup — single-selection group of radio inputs.
 *
 * Ported from dashboard's shadcn RadioGroup (Base UI Radio +
 * RadioGroup). Lucide `<CircleIcon />` inlined as a local SVG so the
 * library stays icon-dep-free. Class names swapped to `--rixl-*`
 * tokens; `dark:*` variants dropped.
 *
 * Composition:
 * - `<RadioGroup>` — the fieldset-like container.
 * - `<RadioGroupItem value="…" />` — an individual radio; wire a
 *   `<Label htmlFor="…" />` alongside for accessible labelling.
 */
function RadioGroup({className, ...props}: RadioGroupPrimitive.Props) {
  return <RadioGroupPrimitive data-slot="radio-group" className={cn("grid gap-3", className)} {...props} />;
}

function RadioGroupItem({className, ...props}: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "border-rixl-border text-rixl-primary flex items-center justify-center aspect-square size-4 shrink-0 rounded-full border shadow-rixl-xs outline-none touch-manipulation",
        "transition-[scale,box-shadow,border-color] duration-rixl-fast ease-rixl-out",
        "enabled:active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100",
        "data-unchecked:enabled:hover:border-rixl-border-strong data-checked:border-rixl-primary",
        "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center transition-[scale,opacity] duration-rixl-fast ease-rixl-out motion-reduce:transition-none data-starting-style:scale-50 data-starting-style:opacity-0 data-ending-style:scale-50 data-ending-style:opacity-0"
      >
        <CircleIcon />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

function CircleIcon() {
  return (
    <svg className="fill-rixl-primary size-2" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export {RadioGroup, RadioGroupItem};
export type RadioGroupProps = RadioGroupPrimitive.Props;
export type RadioGroupItemProps = RadioPrimitive.Root.Props;
