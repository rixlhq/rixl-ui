import {Checkbox as CheckboxPrimitive} from "@base-ui/react/checkbox";
import {cn} from "cn";

/**
 * Rixl Checkbox — a boolean form control.
 *
 * Ported from dashboard's shadcn Checkbox (Base UI Checkbox). The
 * lucide `<CheckIcon />` used in dashboard is inlined here so the
 * library stays icon-dep-free. Class names swapped to `--rixl-*`
 * tokens; `dark:*` variants dropped.
 */
function Checkbox({className, ...props}: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-rixl-border data-checked:bg-rixl-primary data-checked:text-rixl-primary-fg data-checked:border-rixl-primary focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger size-4 shrink-0 rounded-[4px] border shadow-rixl-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current transition-none">
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

function CheckIcon() {
  return (
    <svg
      data-slot="checkbox-icon"
      className="size-3.5"
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

export {Checkbox};
export type CheckboxProps = CheckboxPrimitive.Root.Props;
