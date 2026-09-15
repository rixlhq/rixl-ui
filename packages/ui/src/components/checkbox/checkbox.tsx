import {Checkbox as CheckboxPrimitive} from "@base-ui/react/checkbox";
import {cn} from "cn";

/**
 * Rixl Checkbox — a boolean form control.
 *
 * Base UI Checkbox on `--rixl-*` tokens. Beyond the original port:
 * - hover strengthens the border (unchecked) / deepens the fill (checked);
 * - the check/dash pops in (`zoom-in`), reduced-motion safe;
 * - `indeterminate` is supported — the root's `data-indeterminate` swaps the
 *   check for a dash and fills the box like a checked one.
 *
 * Icons are inlined local SVGs to keep `@rixl/ui` icon-dep-free.
 */
function Checkbox({className, ...props}: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-rixl-border size-4 shrink-0 rounded-[4px] border shadow-rixl-xs outline-none",
        "transition-[color,box-shadow,border-color,background-color] duration-rixl-fast ease-rixl-out",
        "data-unchecked:enabled:hover:border-rixl-border-strong",
        "data-checked:bg-rixl-primary data-checked:text-rixl-primary-fg data-checked:border-rixl-primary",
        "data-indeterminate:bg-rixl-primary data-indeterminate:text-rixl-primary-fg data-indeterminate:border-rixl-primary",
        "data-checked:enabled:hover:bg-rixl-primary-hover data-checked:enabled:hover:border-rixl-primary-hover",
        "data-indeterminate:enabled:hover:bg-rixl-primary-hover data-indeterminate:enabled:hover:border-rixl-primary-hover",
        "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current animate-in zoom-in-50 fade-in-0 duration-rixl-fast motion-reduce:animate-none"
      >
        <CheckIcon className="size-3.5 [[data-indeterminate]_&]:hidden" />
        <MinusIcon className="hidden size-3.5 [[data-indeterminate]_&]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

function CheckIcon({className}: {className?: string}) {
  return (
    <svg
      data-slot="checkbox-icon"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MinusIcon({className}: {className?: string}) {
  return (
    <svg
      data-slot="checkbox-icon"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

export {Checkbox};
export type CheckboxProps = CheckboxPrimitive.Root.Props;
