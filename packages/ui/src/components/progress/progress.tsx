import {Progress as ProgressPrimitive} from "@base-ui/react/progress";
import {cn} from "../../lib/cn";

/**
 * Rixl Progress — a determinate horizontal progress bar.
 *
 * Ported verbatim from dashboard's shadcn Progress (Base UI Progress).
 * Value is a 0–100 number. `null` renders an indeterminate band that slides
 * across the track. Class names swapped to `--rixl-*` tokens per the hybrid
 * policy.
 */
function Progress({className, value = 0, ...props}: Omit<ProgressPrimitive.Root.Props, "value"> & {value?: number | null}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn("bg-rixl-primary/20 relative h-2 w-full overflow-hidden rounded-full", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "bg-rixl-primary h-full transition-[width,transform] duration-rixl-base ease-rixl-out motion-reduce:transition-none",
          // Base UI sets no width when the value is null; a narrower band that slides across tells it apart from 100%.
          // Reduced motion holds the band still in the middle so it doesn't read as a partial value.
          "data-indeterminate:w-1/3 rtl:[--rixl-progress-direction:-1]",
          "motion-safe:data-indeterminate:animate-rixl-progress-indeterminate motion-reduce:data-indeterminate:mx-auto"
        )}
      />
    </ProgressPrimitive.Root>
  );
}

export {Progress};
export type ProgressProps = Omit<ProgressPrimitive.Root.Props, "value"> & {value?: number | null};
