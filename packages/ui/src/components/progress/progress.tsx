import {Progress as ProgressPrimitive} from "@base-ui/react/progress";
import {cn} from "cn";

/**
 * Rixl Progress — a determinate horizontal progress bar.
 *
 * Ported verbatim from dashboard's shadcn Progress (Base UI Progress).
 * Value is a 0–100 number (or null for indeterminate). Class names
 * swapped to `--rixl-*` tokens per the hybrid policy.
 */
function Progress({className, value = 0, ...props}: Omit<ProgressPrimitive.Root.Props, "value"> & {value?: number | null}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn("bg-rixl-primary/20 relative h-2 w-full overflow-hidden rounded-full", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator data-slot="progress-indicator" className="bg-rixl-primary h-full transition-all" />
    </ProgressPrimitive.Root>
  );
}

export {Progress};
export type ProgressProps = Omit<ProgressPrimitive.Root.Props, "value"> & {value?: number | null};
