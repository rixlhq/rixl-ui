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
        "border-rixl-border text-rixl-primary focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger aspect-square size-4 shrink-0 rounded-full border shadow-rixl-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator data-slot="radio-group-indicator" className="relative flex items-center justify-center">
        <CircleIcon />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

function CircleIcon() {
  return (
    <svg
      className="fill-rixl-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export {RadioGroup, RadioGroupItem};
export type RadioGroupProps = RadioGroupPrimitive.Props;
export type RadioGroupItemProps = RadioPrimitive.Root.Props;
